const axios = require('axios');
axios.defaults.baseURL = process.env.API_URL;

module.exports.GET_JOB_ROLES =  '/hr/job-roles';
module.exports.GET_JOB_SPEC =  '/hr/job-specification/';
module.exports.GET_ROLE = '/hr/'
module.exports.GET_JOB_ROLE_INFO =  '/hr/job-role-info';
module.exports.GET_EDIT_ROLE = '/hr/get-edit-role/';

// get all of the job roles available
module.exports.getJobRoles = async function () {
    try{
        const response = await axios.get(this.GET_JOB_ROLES);
        return response.data;
    }catch{
        throw new Error('Could not get Job Roles');
    }
}

module.exports.getJobRoleInfo = async function () {
    //try{
        //const response = await axios.get(this.GET_JOB_ROLES);
        const response = await axios.get(this.GET_JOB_ROLE_INFO);
        //console.log(jobID);
        // let x = (response.data.id) - (1);
        // const singleresponse = response.data[x]
        // return singleresponse;
        return response.data;

   // }catch{
     //   throw new Error('could not get Job Role');
    //}
}

module.exports.getEditRole = async function (jobID) {
    try{
        const response = await axios.get(this.GET_EDIT_ROLE + jobID);
        return response.data;
    }
    catch{ 
        throw new Error('Could not get Job Role information');
     }    
}

module.exports.getBandAndFamily = function (y,band_level_id,job_family_id) {
   let family_name_index = y.jobFamilyList.findIndex(x => x.job_family_id === job_family_id);
   let band_name_index = y.bandList.findIndex(x => x.band_level_id === band_level_id);
    let bandFamily = {
        family_name : y.jobFamilyList[family_name_index].family_name,
        band_name : y.bandList[band_name_index].band_name
    }
   return bandFamily;

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