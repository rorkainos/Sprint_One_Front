const axios = require('axios');
axios.defaults.baseURL = process.env.API_URL;

module.exports.GET_JOB_SPEC =  '/hr/job-specification/';
module.exports.GET_ROLE = '/hr/'
module.exports.GET_JOB_ROLE_INFO =  '/hr/job-role-info';
module.exports.JOB_ROLE_ENDPOINT = '/hr/job-roles/';

// get all of the job roles available
module.exports.getJobRoles = async function () {
    try {
        const response = await axios.get(this.JOB_ROLE_ENDPOINT);
        return response.data;
    } catch {
        throw new Error('Could not get Job Roles.')
    }
}

// insert new job role
module.exports.insertJobRole = async function (data) {
    try {
        // post request to add new job role
        const response = await axios.post(this.JOB_ROLE_ENDPOINT, data);
        return response;
    } catch {
        // throw exception if call fails
        throw new Error('Could not create new Job Roles.')
    }
}


module.exports.getJobRoleInfo = async function () {
    try {
        // get request to get job family and band level data
        const response = await axios.get(this.GET_JOB_ROLE_INFO);
        return response.data;

    } catch {
        // throw exception if call fails
        throw new Error('Could not get Job Role info.')
    }
}

module.exports.getJobSpecification = async function (jobID) {
    try{
        const response = await axios.get(this.GET_JOB_SPEC + jobID);
        return response.data;
    }catch{ 
        throw new Error('Could not get Job Specification');

    }
}


//returns the information for the edit role fields
module.exports.getEditRole = async function (jobID) {
    try{
        const response = await axios.get(this.JOB_ROLE_ENDPOINT + jobID);
        return response.data;
    }
    catch{ 
        throw new Error('Could not get Job Role information');
     }    
}


// put request to edit job role, passes in job_role_id to get the correct 
module.exports.putEditRole = async function (data, job_role_id) {
    try {
        const targetURL = this.JOB_ROLE_ENDPOINT + job_role_id
        const response = await axios.put(targetURL, data);
        return response;
    } catch (e){
        // throw exception if call fails
        console.log(e);
        throw new Error('Could not create new Job Roles.')
    }
}

module.exports.deleteJobRole = async function (jobID) {
    try{
        await axios.delete(this.JOB_ROLE_ENDPOINT + "/" + jobID);
    }catch{ 
        throw new Error('Could not delete Job Role');
    }
}
