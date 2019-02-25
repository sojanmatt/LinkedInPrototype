const mongoose = require("../mongoose");
const Schema = mongoose.Schema;

var ViewedJobsSchema = new Schema({
  jobData: JSON
});

let ViewedJobs = mongoose.model("ViewedJobs", ViewedJobsSchema, "ViewedJobs");
module.exports = ViewedJobs;