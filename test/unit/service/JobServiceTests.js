var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
var chai = require('chai');  
const expect = chai.expect;
const JobService = require('../../../app/service/JobService');

describe('JobService', function () {
    describe('getJobRoles', function () {

      it('should return list of job roles when getJobRoles called', async () => {

        let data = [
            {name:"name1", capability: "c1"},
            {name:"name2", capability: "c2"},
            {name:"name3", capability: "c3"}
        ];
        
        // mocking a good response from the endpoint
        var mock = new MockAdapter(axios);
        mock.onGet(JobService.GET_JOB_ROLES).reply(() => {return [200, data]});
       
        var response = await JobService.getJobRoles()
        expect(response[0].name).to.equal('name1')
        expect(response[1].name).to.equal('name2')
        expect(response[2].name).to.equal('name3')

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
       
        try{
          await JobService.getJobRoles()
        }catch(error){
          expect(error.message).to.equal('Could not get Job Roles')
        }
      })
    })

    describe('getJobSpecification', function () {
    
      it('should return the job specification', async () => {

        
        let id = '1';
        let dataValue = "spec1";

        let data = {job_spec: dataValue};
        
        // mocking a good response from the endpoint
        var mock = new MockAdapter(axios);
        mock.onGet(JobService.GET_JOB_SPEC + id).reply(200, data);
       
        var response = await JobService.getJobSpecification(id);
        expect(response.job_spec).to.equal(dataValue);
      })

      it('should return error Could not get Job Specification', async () => {        
        // mocking an error 500 response from backend

        let id = '1';
        var mock = new MockAdapter(axios);
        mock.onGet(JobService.GET_JOB_SPEC + id).reply(500);
        
        try{
          await JobService.getJobSpecification(id);
        }catch(error){
          expect(error.message).to.equal('Could not get Job Specification')
        }
      })
    })
  })