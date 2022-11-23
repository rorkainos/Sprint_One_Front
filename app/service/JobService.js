const axios = require('axios');
axios.defaults.baseURL = process.env.API_URL;

module.exports.URL =  process.env.API_URL + '/hr/job-roles';

// get the all of the job roles available
module.exports.getJobRoles = async function () {
    // will get a list of job roles from backend db
    const response = await axios.get(this.URL);
    return response.data;
}