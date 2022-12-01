var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
var chai = require('chai');  
const expect = chai.expect;
const JobService = require('../../../app/service/JobService');

describe('JobService', function () {
    describe('getJobRoles', function () {
        
      it('should return list of job roles when getJobRoles called', async () => {

        let data = [
            {name:"name1", bandlevel: 'b1', capability: "c1"},
            {name:"name2", bandlevel: 'b2', capability: "c2"},
            {name:"name3", bandlevel: 'b3', capability: "c3"}

        ]

        // mocking a good response from the endpoint
        var mock = new MockAdapter(axios);
        mock.onGet(JobService.GET_JOB_ROLES).reply(() => {return [200, data]});
       
        var response = await JobService.getJobRoles()
        expect(response[0].name).to.equal('name1')
        expect(response[1].name).to.equal('name2')
        expect(response[2].name).to.equal('name3')

        expect(response[0].bandlevel).to.equal('b1')
        expect(response[1].bandlevel).to.equal('b2')
        expect(response[2].bandlevel).to.equal('b3')

        expect(response[0].capability).to.equal('c1')
        expect(response[1].capability).to.equal('c2')
        expect(response[2].capability).to.equal('c3')
      })

      it('should return empty list of job roles when getJobRoles called', async () => {

        let data = [];
        
        // mocking a good response from the endpoint with an empty list returned
        var mock = new MockAdapter(axios);
        mock.onGet(JobService.GET_JOB_ROLES).reply(() => {return [200, data]});
       
        var response = await JobService.getJobRoles()
        expect(response).is.empty
      })

      it('should return error Could not get Job Roles', async () => {        
        // mocking an error 500 response from backend
        var mock = new MockAdapter(axios);
        mock.onGet(JobService.GET_JOB_ROLES).reply(500);
       
        var error = await JobService.getJobRoles()
        expect(error.message).to.equal('Could not get Job Roles')
      })
    })
  })