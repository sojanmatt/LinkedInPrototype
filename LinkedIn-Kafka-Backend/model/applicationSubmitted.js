const mongoose = require("../mongoose");
const Schema = mongoose.Schema;

var applicationSubmittedSchema = new Schema({
    jobId: String,
    jobTitle: String
});

let ApplicationSubmitted = mongoose.model("ApplicationSubmittedJobs", applicationSubmittedSchema, "ApplicationSubmittedJobs");
module.exports = ApplicationSubmitted;