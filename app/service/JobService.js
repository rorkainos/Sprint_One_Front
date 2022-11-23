const axios = require('axios');
axios.defaults.baseURL = process.env.API_URL;

module.exports.URL =  '/hr/job-roles';

// get all of the job roles available
module.exports.getJobRoles = async function () {
    const response = await axios.get(this.URL);
    return response.data;
}