const express = require('express')
const JobRoleValidator = require('./validator/JobRoleValidator')
const UserValidator = require('./validator/UserValidator')
const UserService = require('./service/UserService')
const router = express.Router()
router.use(express.static('resources'));

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
            await js.insertJobRole(req.body)
            // redirect to job roles page
            let data = await JobService.getJobRoles()
            res.render('jobroles', {inserted:true, jobroles: data})
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
    console.log(user)
    user.role = JSON.parse(user.role)

    // VALIDATE USER
    let error = await UserValidator.validateUser(req.body)

    // IF VALID INSERT TO DB
    if (Object.keys(error).length == 0) {

        try {
            req.body.role = user.role.roleID
            // parse user role id
            console.log(req.body)
            // register new user
            await UserService.register(req.body)
            // redirect to job roles page
            res.redirect('index')
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
