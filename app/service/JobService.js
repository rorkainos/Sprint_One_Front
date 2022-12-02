const axios = require('axios');
axios.defaults.baseURL = process.env.API_URL;

module.exports.GET_JOB_ROLES =  '/hr/job-roles';
module.exports.GET_JOB_SPEC =  '/hr/job-specification/';
module.exports.GET_ROLE = '/hr/'
module.exports.GET_JOB_ROLE_INFO =  '/hr/job-role-info';
module.exports.GET_EDIT_ROLE = '/hr/edit-role/';
module.exports.PUT_EDIT_ROLE = '/hr/edit-role/';

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

//finds the job family name and band name associated with the IDs returned by get EditRole
module.exports.getBandAndFamily = function (jobBandsandFamilies,band_level_id,job_family_id) {
   //console.log(job_family_id);
 
    let family_name_index = jobBandsandFamilies.jobFamilyList.findIndex(x => x.job_family_id == job_family_id);
   let band_name_index = jobBandsandFamilies.bandList.findIndex(x => x.band_level_id == band_level_id);
   //console.log(family_name_index);
    //console.log(jobBandsandFamilies.jobFamilyList[family_name_index]); 
    let bandFamily = {
        family_name : jobBandsandFamilies.jobFamilyList[family_name_index].family_name,
        band_name : jobBandsandFamilies.bandList[band_name_index].band_name
    }
   return bandFamily;

}

module.exports.putEditRole = async function (data, job_role_id) {
    try {
        // post request to edit job role
        const target = this.PUT_EDIT_ROLE + job_role_id
        const response = await axios.put(target, data);
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