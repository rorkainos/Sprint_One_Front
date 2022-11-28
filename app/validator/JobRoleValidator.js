module.exports.validateJobRole = function (jobRole) {

    let error = {};

    if (jobRole.jobRoleName.length === 0) {
        return {nameError: "Job Role name cannot be empty"};
    }

    if (jobRole.jobRoleName.length >= 10) {
        return {nameError: "Job Role name is too long. Must not exceed 100 characters."};
    }

    if (jobRole.jobSpec.length === 0) {
        return {specError: "Job Spec cannot be empty"};
    }

    if (jobRole.jobSpec.length >= 500) {
        return {specError: "Job Spec is too long. Must not exceed 100 characters."};
    }

    if (jobRole.jobSpecURL.length > 0) {
        try {
            url = new URL(jobRole.jobSpecURL);
          } catch (_) {
            return {specURLError: "Not a valid URL."};
          }
    } else {
        return {specURLError: "Job Spec URL cannot be empty."};
    }

    if (jobRole.jobFamily.length === 0) {
        return {jobFamilyError: "Job family must be selected."};
    }

    if (jobRole.bandLevel.length === 0) {
        return {bandLevelError: "Band level must be selected."};
    }

    return error;
}