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
