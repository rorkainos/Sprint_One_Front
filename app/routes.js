const express = require('express')
const JobRoleValidator = require('./validator/JobRoleValidator')
const UserValidator = require('./validator/UserValidator')
const UserService = require('./service/UserService')
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

    // get data for populating job family and band level dropdowns
    let data = await JobService.getJobRoleInfo();
    // render form page
    res.render('addjobrole', { formData: data });

});

// render the addjobroles.html page 
router.post('/addjobrole', async (req, res) => {


    // validate job role
    let error = new JobRoleValidator.validateJobRole(req.body);

    if (Object.keys(error).length !== 0) {
        // get data for populating job family and band level dropdowns
        let data = await JobService.getJobRoleInfo();

        // parse job family and band level data passed from form into JSON
        if (req.body.jobFamily != '') {
            req.body.jobFamily = JSON.parse(req.body.jobFamily)
        }
        if (req.body.bandLevel != '') {
            req.body.bandLevel = JSON.parse(req.body.bandLevel)
        }

        // render page again with errors and previous form data
        res.render('addjobrole', { error: error, data: req.body, formData: data })
    } else {

        // retain form data in case insert fails
        let insertData = req.body;

        // remove names from job family and band level fields in response data
        req.body.jobFamily = JSON.parse(req.body.jobFamily).jobFamilyID;
        req.body.bandLevel = JSON.parse(req.body.bandLevel).bandLevelID;

        try {
            // insert new job
            await JobService.insertJobRole(req.body)
            // redirect to job roles page
            let data = await JobService.getJobRoles()
            res.render('jobroles', { inserted: true, jobroles: data })
        } catch (e) {
            // render form again with insertion error displayed
            let error = { "insertError": "Could not insert new job role, please try again." }
            res.render('addjobrole', { error: error, data: req.body, formData: insertData })
        }
    }
});

// render the jobSpec Page with id and name passed in the request
router.get('/jobspec/:id', async (req, res) => {
    let id = req.params.id;

    try {
        jobSpecification = await JobService.getJobSpecification(id);
    } catch (err) {
        res.locals.errormessage = "An error occured when retrieving the job specification";
    }

    res.render('jobSpec', { jobSpecification: jobSpecification })
});

// render user registration page
router.get('/registration', async (req, res) => {

    res.render('registration')
});

// render user registration page
router.post('/registration', async (req, res) => {
    // retain user without hashed password for registration error 
    let user = {
        ...req.body
    }
    user.role = JSON.parse(user.role)

    // VALIDATE USER
    let error = await UserValidator.validateUser(req.body)

    // IF VALID INSERT TO DB
    if (Object.keys(error).length == 0) {

        try {
            // register new user
            await UserService.register(req.body)
            // redirect to job roles page
            res.render('jobroles', { registered: true, jobroles: await JobService.getJobRoles() })
        } catch {
            // render form again with insertion error displayed
            let error = { "registrationError": "Could not register new user, please try again." }
            res.render('registration', { error: error, formData: user })
        }
        // IF NOT RENDER FORM AGAIN
    } else {
        // render form again with errors and populated fields
        res.render('registration', { error: error, formData: user })
    }
});

module.exports = router
