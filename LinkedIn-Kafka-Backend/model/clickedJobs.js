const mongoose = require("../mongoose");
const Schema = mongoose.Schema;

var ClickedJobsSchema = new Schema({
//  job_id: { type: Number, trim: true },
//  title: { type: String, trim: true, default: "" },
//  description: { type: String, trim: true, default: "" },
//  industry: { type: String, trim: true, default: "" },

//  emptype: { type: String, trim: true, default: "" },
//  location: { type: String, trim: true, default: "" },
//  companyid: { type: Number, trim: true },

//  jobfunction: { type: String, trim: true, default: "" },
//  posteddate: { type: String, trim: true, default: "" }
   jobData: JSON
});

let ClickedJobs = mongoose.model(
 "ClickedJobs",
 ClickedJobsSchema,
 "ClickedJobs"
);
module.exports = ClickedJobs;