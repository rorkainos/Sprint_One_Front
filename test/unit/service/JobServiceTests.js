var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
var chai = require('chai');  
const expect = chai.expect;
const JobService = require('../../../app/service/JobService');

describe('JobService', function () {
    describe('getJobRoles', function () {
    
      it('should return list of job roles when getJobRoles called', async () => {

        let data = [
            {Name:"name1"},
            {Name:"name2"},
            {Name:"name3"}
        ];
        
        // mocking a good response from the endpoint
        var mock = new MockAdapter(axios);
        mock.onGet(JobService.GET_JOB_ROLES).reply(() => {return [200, data]});
       
        var response = await JobService.getJobRoles()
        expect(response[0].Name).to.equal('name1')
        expect(response[1].Name).to.equal('name2')
        expect(response[2].Name).to.equal('name3')
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
       
        try{
          await JobService.getJobRoles()
        }catch(error){
          expect(error.message).to.equal('Could not get Job Roles')
        }
      })
    })

    describe('getJobSpecification', function () {
    
      it('should return the job specification', async () => {

        let data = {job_spec:"spec1"};
        
        // mocking a good response from the endpoint
        var mock = new MockAdapter(axios);
        mock.onGet(JobService.GET_JOB_SPEC + '1').reply(() => {return [200, data]});
       
        var response = await JobService.getJobSpecification('1');
        expect(response.job_spec).to.equal('spec1');
      })

      it('should return error Could not get Job Specification', async () => {        
        // mocking an error 500 response from backend
        var mock = new MockAdapter(axios);
        mock.onGet(JobService.GET_JOB_SPEC + '1').reply(500);
        
        try{
          await JobService.getJobSpecification('1');
        }catch(error){
          expect(error.message).to.equal('Could not get Job Specification')
        }
      })
    })
  })