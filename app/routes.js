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
    let id = req.id;
    let name = req.name;

    //TODO find a way to pull the id and name from the request

    try {
        jobSpecification = await JobService.getJobSpecification(id);
    } catch (e) {
        if (name){
            res.locals.errormessage = "An error occured when retrieving the job specification for " + name;
        }else{
            res.locals.errormessage = "An error occured when retrieving the job specification";
        }       
    }
    
    res.render('jobSpec', { jobSpecification: jobSpecification } ) 
});

module.exports = router
