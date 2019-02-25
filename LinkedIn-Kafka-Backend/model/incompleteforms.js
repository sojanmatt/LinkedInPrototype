const mongoose = require("../mongoose");
const Schema = mongoose.Schema;

var HalfFilledJobsSchema = new Schema({
  jobData: JSON
});

let HalfFilledJobs = mongoose.model(
  "HalfFilledJobs",
  HalfFilledJobsSchema,
  "HalfFilledJobs"
);
module.exports = HalfFilledJobs;