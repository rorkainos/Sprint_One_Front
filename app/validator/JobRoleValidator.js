// provides UI validation for a job role
module.exports.validateJobRole = function (jobRole) {

    let error = {};

    // job role name validation
    if (jobRole.jobRoleName.trim().length === 0) {
        return {nameError: "Job Role name cannot be empty."};
    }

    if (jobRole.jobRoleName.trim().length >= 100) {
        return {nameError: "Job Role name is too long. Must not exceed 100 characters."};
    }

    // job role spec validation
    if (jobRole.jobSpec.trim().length === 0) {
        return {specError: "Job Spec cannot be empty."};
    }

    if (jobRole.jobSpec.trim().length >= 1000) {
        return {specError: "Job Spec is too long. Must not exceed 1000 characters."};
    }

    // job spec url validation
    if (jobRole.jobSpecURL.trim().length > 0) {
        try {
            // test if url is valid
            url = new URL(jobRole.jobSpecURL);
          } catch (_) {
            return {specURLError: "Not a valid URL."};
          }
    } else {
        return {specURLError: "Job Spec URL cannot be empty."};
    }

    // job family validation
    if (jobRole.jobFamily.trim().length === 0) {
        return {jobFamilyError: "Job family must be selected."};
    }

    // band level validation
    if (jobRole.bandLevel.trim().length === 0) {
        return {bandLevelError: "Band level must be selected."};
    }

    return error;
}