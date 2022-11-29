const axios = require('axios');
axios.defaults.baseURL = process.env.API_URL;

module.exports.GET_JOB_ROLES =  '/hr/job-roles';
module.exports.GET_JOB_SPEC =  '/hr/job-specification/';
module.exports.GET_ROLE = '/hr/'
module.exports.GET_JOB_ROLE_INFO =  '/hr/job-role-info';

// get all of the job roles available
module.exports.getJobRoles = async function () {
    try{
        const response = await axios.get(this.GET_JOB_ROLES);
        return response.data;
    }catch{
        throw new Error('Could not get Job Roles');
    }
}

module.exports.getJobRoleInfo = async function (jobID) {
    //try{
        //const response = await axios.get(this.GET_JOB_ROLES);
        const response = await axios.get(this.GET_JOB_ROLE_INFO);
        console.log(jobID);
        // let x = (response.data.id) - (1);
        // const singleresponse = response.data[x]
        // return singleresponse;
        return response.data;

   // }catch{
     //   throw new Error('could not get Job Role');
    //}
}

module.exports.getJobSpecification = async function (jobID) {
    try{
        const response = await axios.get(this.GET_JOB_SPEC + jobID);
        return response.data;
    }catch{ 
        throw new Error('Could not get Job Specification');
    }
}

exports.edit