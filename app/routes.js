const express = require('express')
const JobRoleValidator = require('./validator/JobRoleValidator')
const js = require('./service/JobService')
const router = express.Router()
const app = express()


// Add your routes here - above the module.exports line
const JobService = require('./service/JobService');

// render the jobroles.html page and pass in a list of job roles
router.get('/jobroles', async (req, res) => {
    let data = [];
    try {
        data = await JobService.getJobRoles();
        console.log(data)
    } catch (e) {
        res.locals.errormessage = "An error occured when retrieving the list of Job Roles"
    }

    res.render('jobroles', { jobroles: data })
});


// render the jobSpec Page with id and name passed in the request
router.get('/jobspec/:id', async (req, res) => {
    let id = req.params.id;

    try {
        jobSpecification = await JobService.getJobSpecification(id);    
    }catch (err) {
        res.locals.errormessage = "An error occured when retrieving the job specification";
    }

    res.render('jobSpec', { jobSpecification: jobSpecification } )
});


// render the editjobroles.html page based on the role selected. Retrieve the role information, find the correct band level and 
// job family based on the IDs returned and populate the form with the role's current information
router.get('/editjobroles/:id' , async (req, res) => {
    app.set('job_role_id', req.params.id)
    let job_role_id_object = {job_role_id:app.get('job_role_id')}
    let response = await JobService.getEditRole(app.get('job_role_id'));
    let BandsandJobFamiliesList = await JobService.getJobRoleInfo();
    let BandLevelJobFamily = await JobService.getBandAndFamily(BandsandJobFamiliesList,response.bandLevel,response.jobFamily);
    response = Object.assign(response,BandLevelJobFamily,job_role_id_object);
    res.render('editjobroles', {data:response, formData: BandsandJobFamiliesList})
});

// validate entered infomrmation before being passed to the API. If validation fails, return to editjobroles.html with
// an error message calling out the field that failed validation
router.post('/editjobroles/:id', async (req, res) => {
    console.log(req.body)
    let error = new JobRoleValidator.validateJobRole(req.body);    
    if (Object.keys(error).length !== 0) {
        let job_role_id_object = {job_role_id:app.get('job_role_id')}
        let BandsandJobFamiliesList = await JobService.getJobRoleInfo();
        let BandLevelJobFamily = await JobService.getBandAndFamily(BandsandJobFamiliesList,req.body.jobFamily,req.body.bandLevel);
        req.body = Object.assign(req.body,BandLevelJobFamily, job_role_id_object);
        res.render('editjobroles', {error: error, data:req.body, formData: BandsandJobFamiliesList})
     }else{
    JobService.putEditRole(req.body, app.get('job_role_id'));
    res.redirect('/jobroles')
    }
});

module.exports = router
