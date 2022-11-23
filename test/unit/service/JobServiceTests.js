var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
var chai = require('chai');  
const expect = chai.expect;
const JobService = require('../../../app/service/JobService');

describe('JobService', function () {
    describe('getJobRoles', function () {
      it('should return Could not get job roles error if no job roles', async () => {
        
        // mocking axios with the speicifc URL stated in the JobService
        var mock = new MockAdapter(axios);
        mock.onGet(JobService.URL).reply(500);
       
        var error = await JobService.getJobRoles()
        expect(error.message).to.equal('Could not get job roles')
      })

      it('should return list of job roles when getJobRoles called', async () => {

        let data = [
            {Name:"name1"},
            {Name:"name2"},
            {Name:"name3"}
        ];
        
        // mocking a good response from the endpoint
        var mock = new MockAdapter(axios);
        mock.onGet(JobService.URL).reply(() => {return [200, data]});
       
        var response = await JobService.getJobRoles()
        expect(response[0].Name).to.equal('name1')
        expect(response[1].Name).to.equal('name2')
        expect(response[2].Name).to.equal('name3')
      })

      it('should return empty list of job roles when getJobRoles called', async () => {

        let data = [];
        
        // mocking a good response from the endpoint
        var mock = new MockAdapter(axios);
        mock.onGet(JobService.URL).reply(() => {return [200, data]});
       
        var response = await JobService.getJobRoles()
        expect(response).is.empty
      })
    })
  })