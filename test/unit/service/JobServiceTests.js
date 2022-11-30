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
    })
  })

  describe('insertJobRole', function () {

    var mock = new MockAdapter(axios);

    it('should receive 201 when job role inserted', async () => {

      let body = {
        jobRoleName: "Software Engineer",
        jobSpec: "This is a new job",
        jobSpecURL: "https://trello.com/c/VjAxt81I/12-us012-add-new-role-to-existing-job-family-and-band-8",
        jobFamily: 1,
        bandLevel: 1
      }

      mock.onPost(JobService.POST_JOB_ROLE, body).reply(201);
      // console.log(mock.handlers.post)
      var results = await JobService.insertJobRole(body)
      try {
        await JobService.insertJobRole(body);
      } catch (error) {
        
      }
      expect(results).to.equal(201)
    })

    it('should return error could not create new Job Roles.', async () => {

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

