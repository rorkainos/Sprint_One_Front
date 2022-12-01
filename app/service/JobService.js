const axios = require('axios');
axios.defaults.baseURL = process.env.API_URL;

module.exports.GET_JOB_ROLES = '/hr/job-roles';
module.exports.POST_JOB_ROLE = '/hr/job-roles';
module.exports.GET_JOB_ROLE_INFO = '/hr/job-role-info';
module.exports.axios = axios;


// get all of the job roles available
module.exports.getJobRoles = async function () {
    try {
        const response = await axios.get(this.GET_JOB_ROLES);
        return response.data;
    } catch {
        throw new Error('Could not get Job Roles.')
    }
}

// insert new job role
module.exports.insertJobRole = async function (data) {
    try {
        // post request to add new job role
        const response = await axios.post(this.POST_JOB_ROLE, data);
        return response;
    } catch (e){
        // throw exception if call fails
        console.log(e)
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