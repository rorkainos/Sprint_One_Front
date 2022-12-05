var chai = require('chai');
const expect = chai.expect;
const UserValidator = require('../../../app/validator/UserValidator');

describe('UserValidator', function () {

    describe('validateUser', function () {

        it('should pass when user is valid', () => {
            var user = {
                "email": "james@gmail.com",
                "password": "Password12!",
                "role": JSON.stringify({"roleID" : 1, "roleName" :"Engineer"})
            }

            expect(UserValidator.validateUser(user).emailError).to.equal(undefined)

            var user = {
                "email": "james@gmail.com",
                "password": "Password12!",
                "role": JSON.stringify({"roleID" : 1, "roleName" :"Engineer"})
            }
            expect(UserValidator.validateUser(user).passwordError).to.equal(undefined)

            var user = {
                "email": "james@gmail.com",
                "password": "Password12!",
                "role": JSON.stringify({"roleID" : 1, "roleName" :"Engineer"})
            }
            expect(UserValidator.validateUser(user).roleError).to.equal(undefined)

        })

        it('should return error when email is empty', () => {
            let user = {
                "email": "",
                "password": "password",
                "role": 1
            }

            expect(UserValidator.validateUser(user).emailError).to.equal("Email cannot be empty.")
        })

        it('should return error when email is empty', () => {
            let user = {
                "email": "",
                "password": "password",
                "role": 1
            }

            expect(UserValidator.validateUser(user).emailError).to.equal("Email cannot be empty.")
        })

        it('should return error when email is missing @', () => {
            let user = {
                "email": "jamesasa.com",
                "password": "password",
                "role": 1
            }

            expect(UserValidator.validateUser(user).emailError).to.equal("Not a valid email address.")
        })

        it('should return error when email is missing domain', () => {
            let user = {
                "email": "james@asa",
                "password": "password",
                "role": 1
            }

            expect(UserValidator.validateUser(user).emailError).to.equal("Not a valid email address.")
        })

        it('should return error when password is empty', () => {
            let user = {
                "email": "james@gmail.com",
                "password": "",
                "role": 1
            }

            expect(UserValidator.validateUser(user).passwordError).to.equal("Password has to be at least 8 characters, have one upper case, one lower case and one special character.")
        })

        it('should return error when password is doesnt include a capital letter', () => {
            let user = {
                "email": "james@gmail.com",
                "password": "password12!",
                "role": 1
            }

            expect(UserValidator.validateUser(user).passwordError).to.equal("Password has to be at least 8 characters, have one upper case, one lower case and one special character.")
        })

        it('should return error when password doesnt include a special character', () => {
            let user = {
                "email": "james@gmail.com",
                "password": "Password12",
                "role": 1
            }

            expect(UserValidator.validateUser(user).passwordError).to.equal("Password has to be at least 8 characters, have one upper case, one lower case and one special character.")
        })

        it('should return error when role is not selected', () => {
            let user = {
                "email": "james@gmail.com",
                "password": "Password12!",
                "role": 0
            }

            expect(UserValidator.validateUser(user).roleError).to.equal("Role must be selected.")
        })

    })
    
})