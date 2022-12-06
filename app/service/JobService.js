const axios = require('axios');
axios.defaults.baseURL = process.env.API_URL;

module.exports.JOB_ROLES =  '/hr/job-roles';
module.exports.GET_JOB_SPEC =  '/hr/job-specification/';

// get all of the job roles available
module.exports.getJobRoles = async function () {
    try{
        const response = await axios.get(this.JOB_ROLES);
        return response.data;
    }catch{
        throw new Error('Could not get Job Roles');
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
        await axios.delete(this.JOB_ROLES + "/"+ jobID);
    }catch{ 
        throw new Error('Could not delete Job Role');
    }
}