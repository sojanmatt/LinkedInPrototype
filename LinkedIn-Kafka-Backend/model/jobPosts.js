const mongoose = require("../mongoose");
const Schema = mongoose.Schema;
id = mongoose.Types.ObjectId();

var JobPosts = new Schema({
  jobId: {type: "String", trim:true, default: ""},
  user:{ type: String, trim: true },
  companyName: { type: String, trim: true },
  jobTitle: { type: String, trim: true, default: "" },
  industry: { type: String, trim: true, default: "" },
  employmentType: { type: String, trim: true, default: "" },
  easyApply: { type: String, trim: true, default: "" },
  location: { type: String, trim: true, default: "" },
  seniorityLevel: { type: String, trim: true, default: "" },
  jobDescription: { type: String, trim: true, default: "" },
  postedDate: { type: Date, trim: true, default: "" },
  companyLogo: { type: String, trim: true, default: "" },
  applicantData: Array
   //   jobfunction: { type: String, trim: true, default: "" },
//   companyid: { type: Number, trim: true },
// emptype: { type: String, trim: true, default: "" },
});


let JobPost = mongoose.model("jobPosts", JobPosts, "jobPosts");
module.exports = JobPost;

