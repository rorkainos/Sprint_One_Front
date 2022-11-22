const axios = require('axios');
axios.defaults.baseURL = process.env.API_URL;

module.exports.URL = '/hr/jobroles'; // path to be decided


module.exports.getJobRoles = async function () {
    try {
        // will get a list of job roles from backend db
        //const response = await axios.get(this.URL)
        // response.data

        // simulate response
        let data = [
            {name:"name1"},
            {name:"name2"},
            {name:"name3"}
        ];

        return data;
    }catch (e) {
        return new Error('Could not get job roles')
    }
}