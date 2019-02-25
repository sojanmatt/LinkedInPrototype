const mongoose = require("../mongoose");
const Schema = mongoose.Schema;

var SavedJobsSchema = new Schema({
  jobData: JSON
});

let SavedJobs = mongoose.model("SavedJobs", SavedJobsSchema, "SavedJobs");
module.exports = SavedJobs;

