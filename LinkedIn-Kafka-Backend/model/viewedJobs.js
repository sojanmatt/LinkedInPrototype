const mongoose = require("../mongoose");
const Schema = mongoose.Schema;

var ViewedJobsSchema = new Schema({
    jobId: String,
    jobTitle: String
});

let ViewedJobs = mongoose.model("ViewedJobs", ViewedJobsSchema, "ViewedJobs");
module.exports = ViewedJobs;