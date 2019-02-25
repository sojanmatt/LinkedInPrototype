const mongoose = require("../mongoose");
const Schema = mongoose.Schema;

var ApplicationSubmittedJobsSchema = new Schema({
  jobData: JSON
});

let ApplicationSubmittedJobs = mongoose.model(
  "ApplicationSubmittedJobs",
  ApplicationSubmittedJobsSchema,
  "ApplicationSubmittedJobs"
);
module.exports = ApplicationSubmittedJobs;

