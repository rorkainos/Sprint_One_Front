const emailValidator = require('deep-email-validator');

// provides UI validation for a new user
module.exports.validateUser = function (user) {

    let error = {};

    // email validation
    if (user.email.trim().length === 0) {
        return { emailError: "Email cannot be empty." };
    }

    if (!emailValidator.validate(user.email.trim())) {
        return { emailError: "Not a valid email address." };
    }

    // password validation
    if (user.password.trim().length < 8) {
        return { passwordError: "Password has to be at least 8 characters." };
    }

    if (user.role != '') {
        user.role = JSON.parse(user.role)
    }

    // role validation
    if (user.role.roleID != "1" && user.role.roleID != "2") {
        return { roleError: "Role must be selected." };
    }

    return error;
}