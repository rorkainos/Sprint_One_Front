const axios = require('axios');
axios.defaults.baseURL = process.env.API_URL;

module.exports.URL = 'http://localhost:8080/hr/job-roles'; // the base path will need changed probably when docker is used

// get the all of the job roles available
module.exports.getJobRoles = async function () {
    try {
        // will get a list of job roles from backend db
        const response = await axios.get(this.URL)
        return response.data;
    }catch (e) {
        return new Error('Could not get job roles')
    }
}