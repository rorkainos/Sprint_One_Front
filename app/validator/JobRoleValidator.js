module.exports.validateJobRole = function (jobRole) {

    let error = {};

    if (jobRole.name.length === 0) {
        return {nameError: "Job Role must be entered"};
    }

    if (jobRole.name.length >= 10) {
        return {nameError: "Job Role name cannot exceed 100 characters."};
    }

    if (jobRole.jobSpec.length === 0) {
        return {specError: "Job Spec must be entered"};
    }

    if (jobRole.jobSpec.length >= 500) {
        return {specError: "Job Spec cannot exceed 100 characters."};
    }

    if (jobRole.jobFamily.length === 0) {
        return {jobFamilyError: "Job family must be selected."};
    }

    if (jobRole.bandLevel.length === 0) {
        return {bandLevelError: "Band level must be selected."};
    }

    return error;
}