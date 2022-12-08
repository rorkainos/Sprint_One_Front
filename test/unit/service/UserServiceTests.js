var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
var chai = require('chai');
const expect = chai.expect;
const UserService = require('../../../app/service/UserService');

describe('UserService', function () {

    describe('registerUser', function () {

        it('should return error Could not register user', async () => {

            var user = {
                "email": "james@gmail.com",
                "password": "Password12!",
                "role": JSON.stringify({ "roleID": 1, "roleName": "Engineer" })
            }

            // mocking an error 500 response from backend
            var mock = new MockAdapter(axios);
            mock.onGet(UserService.REGISTRATION).reply(500);
            try {
                await UserService.register(user);
            } catch (error) {
                expect(error.message).to.equal('Could not register user.');
            }

        })

        it('should return error Could not register user', async () => {

            var user = {
                "email": "james@gmail.com",
                "password": "Password12!",
                "role": JSON.stringify({ "roleID": 1, "roleName": "Engineer" })
            }

            // mocking an error 500 response from backend
            var mock = new MockAdapter(axios);
            mock.onGet(UserService.REGISTRATION).reply(400);
            try {
                await UserService.register(user);
            } catch (error) {
                expect(error.message).to.equal('Could not register user.');
            }

        })

        it('should receive 201 when user inserted', async () => {

            var mock = new MockAdapter(axios);

            var user = {
                "email": "james@gmail.com",
                "password": "Password12!",
                "role": JSON.stringify({ "roleID": 1, "roleName": "Engineer" })
            }

            mock.onPost(UserService.REGISTRATION, user).reply(201);
            var results = await UserService.register(user);
            expect(results.status).to.equal(201)
        })

    })

})