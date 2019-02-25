const mongoose = require("../mongoose");
const Schema = mongoose.Schema;

var SavedJobsSchema = new Schema({
    jobId: String,
    jobTitle: String,
    recruiterEmail: String
});

let SavedJobs = mongoose.model("SavedJobs", SavedJobsSchema, "SavedJobs");
module.exports = SavedJobs;