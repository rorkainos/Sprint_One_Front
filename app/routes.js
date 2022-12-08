const express = require('express')
const JobRoleValidator = require('./validator/JobRoleValidator')
const js = require('./service/JobService')
const router = express.Router()
const app = express()

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
        
        if(req.session.editFailure) {
            res.locals.editFailureMessage = "Editing A Job Role Failed";
            req.session.editFailure = null;
        }

        if(req.session.editsuccess) {
            res.locals.editsuccessMessage = "Editing A Job Role Succedded!";
            req.session.editsuccess = null;
        }

        if(req.session.insertSuccess) {
            res.locals.insertSuccessMessage = "Inserting A Job Role Succedded!";
            req.session.insertSuccess = null;
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


// render the editjobroles.html page based on the role selected. Retrieve the role information, find the correct band level and 
// job family based on the IDs returned and populate the form with the role's current information
router.get('/editjobroles/:id' , async (req, res) => {
    //app.set('job_role_id', req.params.id)
    let job_role_id = req.params.id
    //let job_role_id_object = {job_role_id:app.get('job_role_id')}
    let response = await JobService.getEditRole(job_role_id);
    let BandsandJobFamiliesList = await JobService.getJobRoleInfo();
    response.job_role_id = job_role_id;
    res.render('editjobroles', {data:response, formData: BandsandJobFamiliesList, job_role_id:job_role_id})
});

// validate entered information before being passed to the API. If validation fails, return to editjobroles.html with
// an error message calling out the field that failed validation
router.post('/editjobroles/', async (req, res) => {
    let error = new JobRoleValidator.validateJobRole(req.body);    
    if (Object.keys(error).length !== 0) {
        let job_role_id_object = {job_role_id:app.get('job_role_id')}
        let BandsandJobFamiliesList = await JobService.getJobRoleInfo();

        //let BandLevelJobFamily = await JobService.getBandAndFamily(BandsandJobFamiliesList,req.body.jobFamily,req.body.bandLevel);
        // req.body = Object.assign(req.body,BandLevelJobFamily, job_role_id_object);
        
        res.render('editjobroles' , {error:error , formData: BandsandJobFamiliesList} )
     }else{

        try{
            await JobService.putEditRole(req.body, req.body.job_role_id);
            data = await JobService.getJobRoles();
            req.session.editsuccess = true;
        }catch(e){
            req.session.editFailure = true;
        }

        res.redirect('/jobroles')
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
            await js.insertJobRole(req.body)
            // redirect to job roles page
            req.session.insertSuccess = true;
            res.redirect('/jobroles') 
        } catch (e) {
            // render form again with insertion error displayed
            let error = { "insertError": "Could not insert new job role, please try again." }
            res.render('addjobrole', { error: error, data: req.body, formData: insertData })
        }
    }
});

module.exports = router
