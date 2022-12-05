const express = require('express')
const router = express.Router()
const app = express()


// Add your routes here - above the module.exports line
const JobService = require('./service/JobService');
const JobRoleValidator = require('./validator/JobRoleValidator')

// render the jobroles.html page and pass in a list of job roles
router.get('/jobroles', async (req, res) => {
    let data = [];
    try {
       data = await JobService.getJobRoles();
    } catch (e) {
        res.locals.errormessage = "An error occured when retrieving the list of Job Roles"
    }
    res.render('jobroles', { jobroles: data } ) 
});

// render the editjobroles.html page based on the role selected. Retrieve the role information, find the correct band level and 
// job family based on the IDs returned and populate the form with the role's current information
router.get('/editjobroles/:id' , async (req, res) => {
    app.set('job_role_id', req.params.id)
    let job_role_id_object = {job_role_id:app.get('job_role_id')}
    let response = await JobService.getEditRole(app.get('job_role_id'));
    let BandsandJobFamiliesList = await JobService.getJobRoleInfo();
    let BandLevelJobFamily = await JobService.getBandAndFamily(BandsandJobFamiliesList,response.band_level_id,response.job_family_id);
    response = Object.assign(response,BandLevelJobFamily,job_role_id_object);
    res.render('editjobroles', {data:response, formData: BandsandJobFamiliesList})
});

// validate entered infomrmation before being passed to the API. If validation fails, return to editjobroles.html with
// an error message calling out the field that failed validation
router.post('/editjobroles/:id', async (req, res) => {
    let error = new JobRoleValidator.validateJobRole(req.body);    
    if (Object.keys(error).length !== 0) {
        let BandsandJobFamiliesList = await JobService.getJobRoleInfo();
        let BandLevelJobFamily = await JobService.getBandAndFamily(BandsandJobFamiliesList,req.body.band_level_id,req.body.job_family_id);
        req.body = Object.assign(req.body,BandLevelJobFamily);
        res.render('editjobroles', {error: error, data:req.body, formData: BandsandJobFamiliesList})
    }else{
    JobService.putEditRole(req.body, app.get('job_role_id'));
    res.redirect('/jobroles')
    }
});

// render the jobSpec Page with id and name passed in the request
router.get('/jobspec', async (req, res) => {
    let id = req.query.id;
    let name = req.query.name;
    try {
        jobSpecification = await JobService.getJobSpecification(id);

        let jobSpec = {
            jobSpecification: jobSpecification.job_spec,
            jobRoleName:name 
        }

        res.render('jobSpec', { jobSpecification: jobSpec } )
        
    }catch (err) {
        if (name) {
            res.locals.errormessage = "An error occured when retrieving the job specification for " + name;
        }else{
            res.locals.errormessage = "An error occured when retrieving the job specification";
        }   
        
        res.render('jobSpec') 
    }
});

module.exports = router
