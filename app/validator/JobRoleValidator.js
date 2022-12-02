module.exports.validateJobRole = function (jobRole) {

    let error = {};

    if (jobRole.name.length === 0) {
        return {nameError: "Job Role must be entered"};
    }

    if (jobRole.name.length >= 100) {
        return {nameError: "Job Role name cannot exceed 100 characters."};
    }

    if (jobRole.job_spec.length === 0) {
        return {specError: "Job Spec must be entered"};
    }

    if (jobRole.job_spec.length >= 500) {
        return {specError: "Job Spec cannot exceed 100 characters."};
    }

    if (jobRole.job_spec_url.length === 0) {
        return {specURLError: "Job Spec URL must be entered"};
    }

    if (jobRole.job_family_id.length === 0) {
        return {jobFamilyError: "Job family must be selected."};
    }

    if (jobRole.band_level_id.length === 0) {
        return {bandLevelError: "Band level must be selected."};
    }

    return error;
}