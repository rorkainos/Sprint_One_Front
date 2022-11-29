const express = require('express')
const JobRoleValidator = require('./validator/JobRoleValidator')
const js = require('./service/JobService')
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

    data = await JobService.getJobRoleInfo();
    res.render('addjobrole', {formData:data});

});

// render the addjobroles.html page 
router.post('/addjobrole', async (req, res) => {

    let error = new JobRoleValidator.validateJobRole(req.body);
    let data = await JobService.getJobRoleInfo();

    if (Object.keys(error).length !== 0) {
        res.render('addjobrole', { error: error, data: req.body, formData:data})
    } else {
        js.insertJobRole(req.body)
        res.render('jobroles')
    }

});

module.exports = router
