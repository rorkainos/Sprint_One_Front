var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
var chai = require('chai');
const expect = chai.expect;
const UserService = require('../../../app/service/UserService');

describe('UserService', function () {


    describe('registerUser', function () {

        it('should return error Could not get Job Roles', async () => {

            let user = {
                "Email": "james@email.com",
                "Password": "password",
                "Role": 1
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
    })

    it('should receive 201 when job role inserted', async () => {

        var mock = new MockAdapter(axios);

        let user = {
            "Email": "james@email.com",
            "Password": "password",
            "Role": 1
        }

        mock.onPost(UserService.REGISTRATION, user).reply(201);
        var results = await UserService.register(user);
        expect(results.status).to.equal(201)
    })

})
