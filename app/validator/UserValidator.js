// provides UI validation for a new user
module.exports.validateUser = function (user) {

    let error = {};

    // email validation
    if (user.email.trim().length === 0) {
        return { emailError: "Email cannot be empty." };
    }

    if (!user.email.trim().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        return { emailError: "Not a valid email address." };
    }

    // password validation
    if (!user.password.trim().match("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")) {
        return { passwordError: "Password has to be at least 8 characters, have one upper case, one lower case and one special character." };
    }

    if (user.role != '') {
        req.body.role = req.body.role.roleID
    }

    // role validation
    if (user.role != 1 && user.role != 2) {
        return { roleError: "Role must be selected." };
    }

    return error;
}