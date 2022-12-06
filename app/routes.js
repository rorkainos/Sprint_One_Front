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
router.get('/jobspec/:id', async (req, res) => {
    let id = req.params.id;

    try {
        jobSpecification = await JobService.getJobSpecification(id);    
    }catch (err) {
        res.locals.errormessage = "An error occured when retrieving the job specification";
    }

    res.render('jobSpec', { jobSpecification: jobSpecification } )
});

router.get('/deleteJobRole/:id', async (req, res) => {
    let id = req.params.id;
    let data = [];

    try {
         await JobService.deleteJobRole(id);
         data = await JobService.getJobRoles();    
    }catch (err) {
        res.locals.errormessage = "An error occured when deleting a JobRole";
    }

    res.render('jobroles', { jobroles: data } ) 
});

module.exports = router
