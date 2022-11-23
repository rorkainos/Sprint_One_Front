const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line
const JobService = require('./service/JobService');

// render the jobs.html page and pass in a list of job roles
router.get('/jobroles', async (req, res) => {
    let data = [];

    try {
       data = await JobService.getJobRoles();
    } catch (e) {
        console.error(e);
    }
    
    res.render('jobroles', { jobroles: data } ) 
});

module.exports = router
