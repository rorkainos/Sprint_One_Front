// provides UI validation for a new user
module.exports.validateUser = function (user) {

    let error = {};

    if (!user.email.trim().match(   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/  )) {
        return { emailError: "Not a valid email address." };
    }

    // password validation
    if (!user.password.trim().match("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")) {
        return { passwordError: "Password has to be at least 8 characters, have one upper case, one lower case and one special character." };
    }

    let userID;
    if (user.role != '') {
        userID = JSON.parse(user.role).roleID
    }

    // role validation
    if (userID != 1 && userID != 2) {
        return { roleError: "Role must be selected." };
    }

    return error;
}