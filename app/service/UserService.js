const axios = require('axios');
const bcrypt = require('bcrypt')
axios.defaults.baseURL = process.env.API_URL;

module.exports.REGISTRATION = '/hr/registration';

// get all of the job roles available
module.exports.register = async function (user) {

    // HASH PASSWORD HERE
    user.password = await bcrypt.hash(user.password, await bcrypt.genSalt())

    try {
        const response = await axios.post(this.REGISTRATION, user);
        return response;
    } catch {
        throw new Error('Could not register user.')
    }
}


