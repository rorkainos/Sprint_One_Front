const axios = require('axios');
axios.defaults.baseURL = process.env.API_URL;

module.exports.JOB_ROLE_ENDPOINT = '/hr/job-roles';
module.exports.GET_JOB_ROLE_INFO = '/hr/job-role-info';
module.exports.GET_JOB_SPEC =  '/hr/job-specification/';
module.exports.axios = axios;

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

module.exports.deleteJobRole = async function (jobID) {
    try{
        await axios.delete(this.JOB_ROLE_ENDPOINT + "/" + jobID);
    }catch{ 
        throw new Error('Could not delete Job Role');
    }
}
