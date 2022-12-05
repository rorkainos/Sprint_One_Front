const axios = require('axios');
axios.defaults.baseURL = process.env.API_URL;

module.exports.GET_JOB_ROLES =  '/hr/job-roles';
module.exports.GET_JOB_SPEC =  '/hr/job-specification/';
module.exports.GET_ROLE = '/hr/'
module.exports.GET_JOB_ROLE_INFO =  '/hr/job-role-info';
module.exports.GET_EDIT_ROLE = '/hr/job-role-request/';
module.exports.PUT_EDIT_ROLE = '/hr/job-roles/';

// get all of the job roles available
module.exports.getJobRoles = async function () {
    try{
        const response = await axios.get(this.GET_JOB_ROLES);
        return response.data;
    }catch{
        throw new Error('Could not get Job Roles');
    }
}

//returns the Job families and Bands to populate the dropdown boxes in edit role
module.exports.getJobRoleInfo = async function () {
    try{
        const response = await axios.get(this.GET_JOB_ROLE_INFO);
        return response.data;
    }catch{
       throw new Error('could not get Job Role');
    }
}

//returns the information for the edit role fields
module.exports.getEditRole = async function (jobID) {
    try{
        const response = await axios.get(this.GET_EDIT_ROLE + jobID);
        return response.data;
    }
    catch{ 
        throw new Error('Could not get Job Role information');
     }    
}

//finds the job family name and band name associated with the IDs returned by getEditRole
module.exports.getBandAndFamily = function (jobBandsandFamilies,band_level_id,job_family_id) { 
    let family_name_index = jobBandsandFamilies.jobFamilyList.findIndex(x => x.job_family_id == job_family_id);
   let band_name_index = jobBandsandFamilies.bandList.findIndex(x => x.band_level_id == band_level_id);
    let BandLevelJobFamily = {
        family_name : jobBandsandFamilies.jobFamilyList[family_name_index].family_name,
        band_name : jobBandsandFamilies.bandList[band_name_index].band_name
    }
   return BandLevelJobFamily;
}

// put request to edit job role, passes in job_role_id to get the correct 
module.exports.putEditRole = async function (data, job_role_id) {
    try {
        const targetURL = this.PUT_EDIT_ROLE + job_role_id
        const response = await axios.put(targetURL, data);
        return response;
    } catch (e){
        // throw exception if call fails
        console.log(e)
        throw new Error('Could not create new Job Roles.')
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

exports.edit