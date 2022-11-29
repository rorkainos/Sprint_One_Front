const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line
const JobService = require('./service/JobService');

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
