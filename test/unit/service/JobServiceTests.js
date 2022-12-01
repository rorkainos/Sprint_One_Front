var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
var chai = require('chai');
const expect = chai.expect;
const JobService = require('../../../app/service/JobService');

describe('JobService', function () {


  describe('getJobRoles', function () {

    it('should return list of job roles when getJobRoles called', async () => {

      let data = [
        { Name: "name1" },
        { Name: "name2" },
        { Name: "name3" }
      ];

      // mocking a good response from the endpoint
      var mock = new MockAdapter(axios);
      mock.onGet(JobService.GET_JOB_ROLES).reply(() => { return [200, data] });

      var response = await JobService.getJobRoles()
      expect(response[0].Name).to.equal('name1')
      expect(response[1].Name).to.equal('name2')
      expect(response[2].Name).to.equal('name3')
    })

    it('should return empty list of job roles when getJobRoles called', async () => {

      let data = [];

      // mocking a good response from the endpoint with an empty list returned
      var mock = new MockAdapter(axios);
      mock.onGet(JobService.GET_JOB_ROLES).reply(() => { return [200, data] });

      var response = await JobService.getJobRoles()
      expect(response).is.empty
    })

    it('should return error Could not get Job Roles', async () => {
      // mocking an error 500 response from backend
      var mock = new MockAdapter(axios);
      mock.onGet(JobService.GET_JOB_ROLES).reply(500);
      try {
        await JobService.getJobRoles();
      } catch (error) {
        expect(error.message).to.equal('Could not get Job Roles.');
      }

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

  describe('insertJobRole', function () {

    it('should receive 201 when job role inserted', async () => {
  
      var mock = new MockAdapter(axios);

      let body = {
        jobRoleName: "Software Engineer",
        jobSpec: "This is a new job",
        jobSpecURL: "https://trello.com/c/VjAxt81I/12-us012-add-new-role-to-existing-job-family-and-band-8",
        jobFamily: 1,
        bandLevel: 1
      }
      mock.onPost(JobService.POST_JOB_ROLE, body).reply(201,1);
      var results = await JobService.insertJobRole(body);
      expect(results.status).to.equal(201)
    })

    it('should return error could not create new Job Roles.', async () => {

      var mock = new MockAdapter(axios);

      let body = {
        jobRoleName: "Software Engineer",
        jobSpec: "This is a new job",
        jobSpecURL: "https://trello.com/c/VjAxt81I/12-us012-add-new-role-to-existing-job-family-and-band-8",
        jobFamily: 1,
        bandLevel: 1
      }

      mock.onPost(JobService.POST_JOB_ROLE, body).reply(500);
      try {
        await JobService.insertJobRole(body);
      } catch (error) {
        expect(error.message).to.equal('Could not create new Job Roles.');
      }

    })

  })
})

})
