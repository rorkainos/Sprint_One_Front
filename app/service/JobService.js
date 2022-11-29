const axios = require('axios');
axios.defaults.baseURL = process.env.API_URL;

module.exports.GET_JOB_ROLES =  '/hr/job-roles';
module.exports.ADD_JOB_ROLE =  '/hr/add-job-role';
module.exports.GET_JOB_ROLE_INFO =  '/hr/job-role-info';



// get all of the job roles available
module.exports.getJobRoles = async function () {
    try{
        const response = await axios.get(this.GET_JOB_ROLES);
        return response.data;
    }catch{
        throw new Error('Could not get Job Roles.')
    }
}

// insert new job role
module.exports.insertJobRole = async function (data) {
    try{
        const response = await axios.post(this.ADD_JOB_ROLE, data);
        return response.data;
    }catch{
        throw new Error('Could not create new Job Roles.')
    }
}

module.exports.getJobRoleInfo = async function () {
    try{
        const response = await axios.get(this.GET_JOB_ROLE_INFO);
        return response.data;
    } catch {
        throw new Error('Could not get Job Role info.')
    }
}