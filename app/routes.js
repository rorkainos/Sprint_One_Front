const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line
const JobService = require('./service/JobService');
const JobRoleValidator = require('./validator/JobRoleValidator')

// render the jobroles.html page and pass in a list of job roles
router.get('/jobroles', async (req, res) => {
    let data = [];

    try {
       data = await JobService.getJobRoles();
    //    console.log(data);
    } catch (e) {
        res.locals.errormessage = "An error occured when retrieving the list of Job Roles"
    }
    
    res.render('jobroles', { jobroles: data } ) 
});

router.get('/editjobroles/:id' , async (req, res) => {
    let id = req.params.id
    let response = await JobService.getEditRole(id);
    let y = await JobService.getJobRoleInfo();
    let x = await JobService.getBandAndFamily(y,response.band_level_id,response.job_family_id);
    console.log(x);
    response = Object.assign(response,x);
    console.log(response);
    res.render('editjobroles', {data:response, formData: y})
});


router.post('/editjobroles', async (req, res) => {

    let error = new JobRoleValidator.validateJobRole(req.body);
    console.log(req.body)
    if (error) {
        res.render('editjobroles', { error: error, data: req.body})
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
