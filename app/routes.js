const express = require('express')
const JobRoleValidator = require('./validator/JobRoleValidator')
const js = require('./service/JobService')
const router = express.Router()

// Add your routes here - above the module.exports line
const JobService = require('./service/JobService');
router.use(express.static('resources'));


// render the jobroles.html page and pass in a list of job roles
router.get('/jobroles', async (req, res) => {
    let data = [];

    try {
       data = await JobService.getJobRoles();

       if(req.session.deleteSuccessful) {
            res.locals.deleteSuccess = "Successfully Deleted Job Role";
            req.session.deleteSuccessful = null;
        }

        if(req.session.deleteFailure) {
            res.locals.deleteErrorMessage = "An error occured when retrieving the job specification";
            req.session.deleteFailure = null;
        }   
    
    } catch (e) {
        res.locals.errormessage = "An error occured when retrieving the list of Job Roles";
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

    try {
         await JobService.deleteJobRole(id);
         req.session.deleteSuccessful = true;
    }catch (err) {
        req.session.deleteFailure = true;
    }

    // redirect to load jobrole page
    res.redirect('/jobroles') 
});

module.exports = router
