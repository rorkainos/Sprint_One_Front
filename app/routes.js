const express = require('express')
const JobRoleValidator = require('./validator/JobRoleValidator')
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

    res.render('jobroles', { jobroles: data })
});

// render the addjobroles.html page 
router.get('/addjobrole', async (req, res) => {


    var data = {
        jobRoleName: "Software Engineer",
        jobSpec: "This is a role for a graduate Software Engineer.",
        jobSpecURL: "https://design-system.service.gov.uk/components/textarea/",
        jobFamily: "Engineering",
        bandLevel: "Supervisor"
    }

    res.render('addjobrole', { data: data })
});

// render the addjobroles.html page 
router.post('/addjobrole', async (req, res) => {

    let error = new JobRoleValidator.validateJobRole(req.body);
    console.log(req.body)
    if (error) {
        res.render('addjobrole', { error: error, data: req.body})
    }

});

module.exports = router
