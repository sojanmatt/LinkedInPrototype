const mongoose = require("../mongoose");
const Schema = mongoose.Schema;

var HalfFilledJobsSchema = new Schema({
    jobId: String,
    jobTitle: String
});

let HalfFilledJobs = mongoose.model("HalfFilledJobs", HalfFilledJobsSchema, "HalfFilledJobs");
module.exports = HalfFilledJobs;