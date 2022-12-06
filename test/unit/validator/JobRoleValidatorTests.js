var chai = require('chai');
const expect = chai.expect;
const JobRoleValidator = require('../../../app/validator/JobRoleValidator');

describe('JobRoleValidator', function () {
    describe('validateJobRole', function () {

        it('should return error when job name is empty', () => {
            let jobRole = {
                jobRoleName: "",
                jobSpec: "New job in Kainos",
                jobSpecURL: "https://www.samanthaming.com/tidbits/94-how-to-check-if-object-is-empty/",
                jobFamily: 1,
                bandLevel: 2
            }

            expect(JobRoleValidator.validateJobRole(jobRole).nameError).to.equal("Job Role name cannot be empty.")
        })

        it('should return error when job name is longer than 100 characters', () => {
            let jobRole = {
                jobRoleName: "a".repeat(120),
                jobSpec: "New job in Kainos",
                jobSpecURL: "https://www.samanthaming.com/tidbits/94-how-to-check-if-object-is-empty/",
                jobFamily: 1,
                bandLevel: 2
            }

            expect(JobRoleValidator.validateJobRole(jobRole).nameError).to.equal("Job Role name is too long. Must not exceed 100 characters.")
        })

        it('should return error when job spec is empty', () => {
            let jobRole = {
                jobRoleName: "Software Engineer",
                jobSpec: "",
                jobSpecURL: "https://www.samanthaming.com/tidbits/94-how-to-check-if-object-is-empty/",
                jobFamily: 1,
                bandLevel: 2
            }

            expect(JobRoleValidator.validateJobRole(jobRole).specError).to.equal("Job Spec cannot be empty.")
        })

        it('should return error when job spec is longer than 1000 characters', () => {
            let jobRole = {
                jobRoleName: "Software Engineer",
                jobSpec: "a".repeat(1200),
                jobSpecURL: "https://www.samanthaming.com/tidbits/94-how-to-check-if-object-is-empty/",
                jobFamily: 1,
                bandLevel: 2
            }

            expect(JobRoleValidator.validateJobRole(jobRole).specError).to.equal("Job Spec is too long. Must not exceed 1000 characters.")
        })

        it('should return error when job spec url is empty', () => {
            let jobRole = {
                jobRoleName: "Software Engineer",
                jobSpec: "This is a new Kaios job.",
                jobSpecURL: "",
                jobFamily: 1,
                bandLevel: 2
            }

            expect(JobRoleValidator.validateJobRole(jobRole).specURLError).to.equal("Job Spec URL cannot be empty.")
        })

        it('should return error when job spec url is invalid', () => {
            let jobRole = {
                jobRoleName: "Software Engineer",
                jobSpec: "This is a new Kaios job.",
                jobSpecURL: "htww.samanthaming.com/tidbits/94-how-to-check-if-object-is-empty/",
                jobFamily: 1,
                bandLevel: 2
            }

            expect(JobRoleValidator.validateJobRole(jobRole).specURLError).to.equal("Not a valid URL.")
        })

        it('should return error when band level is not selected', () => {
            let jobRole = {
                jobRoleName: "Software Engineer",
                jobSpec: "This is a new Kaios job.",
                jobSpecURL: "https://www.samanthaming.com/tidbits/94-how-to-check-if-object-is-empty/",
                jobFamily: 1,
                bandLevel: ''
            }

            expect(JobRoleValidator.validateJobRole(jobRole).bandLevelError).to.equal("Band level must be selected.")
        })

        it('should return error when job family is not selected', () => {
            let jobRole = {
                jobRoleName: "Software Engineer",
                jobSpec: "This is a new Kaios job.",
                jobSpecURL: "https://www.samanthaming.com/tidbits/94-how-to-check-if-object-is-empty/",
                jobFamily: '',
                bandLevel: 1
            }

            expect(JobRoleValidator.validateJobRole(jobRole).jobFamilyError).to.equal("Job family must be selected.")
        })

    })
})