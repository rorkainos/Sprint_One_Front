const axios = require('axios');
axios.defaults.baseURL = process.env.API_URL;

module.exports.GET_JOB_ROLES =  '/hr/job-roles';

// get all of the job roles available
module.exports.getJobRoles = async function () {
    try{
        const response = await axios.get(this.GET_JOB_ROLES);
        return response.data;
    }catch{
        return new Error('Could not get Job Roles')
    }
}

exports.edit