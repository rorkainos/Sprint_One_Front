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

router.get('/editjobroles' , async (req, res) => {

    console.log(req.query.id)
    res.render('editjobroles')
});


router.post('/editjobroles', async (req, res) => {

    let error = new JobRoleValidator.validateJobRole(req.body);
    console.log(req.body)
    if (error) {
        res.render('editjobroles', { error: error, data: req.body})
    }

});

module.exports = router
