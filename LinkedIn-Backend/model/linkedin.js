const mongoose = require("../mongoose");
const Schema = mongoose.Schema;

var UserSchema = new Schema({

 email: { type: String, trim: true, index: { unique: true } },
 password: { type: String, required: true },
 Fname: { type: String, trim: true, default: "" },
 Lname: { type: String, trim: true, default: "" },
 education: {type:Array},             //changed it from type:string to type array for editprofile
 phone: { type: String, trim: true, default: "" },
 aboutMe: { type: String, trim: true, default: "" },
 company: { type: String, trim: true, default: "" },
 city: { type: String, trim: true, default: "" },
 state: { type: String, trim: true, default: "" },
 zip: { type: String, trim: true, default: "" },
 gender: { type: String, trim: true, default: "" },
 experience: {type:Array},            //changed it from type:string to type array for editprofile
 skills: { type: String, trim: true, default: "" },
 profileimage: {type: String, default: ""},

 accountType: { type: Number, trim: true, default: "" } //1.Applicant2.Recruiter3.Both
});
var Job = new Schema({
 job_id: { type: Number, trim: true },
 title: { type: String, trim: true, default: "" },
 description: { type: String, trim: true, default: "" },
 industry: { type: String, trim: true, default: "" },

 emptype: { type: String, trim: true, default: "" },
 location: { type: String, trim: true, default: "" },
 companyid: { type: Number, trim: true },

 jobfunction: { type: String, trim: true, default: "" },
 posteddate: { type: String, trim: true, default: "" }
});
/*
var JobPostings = new Schema({
 job_id: { type: Number, trim: true },
 title: { type: String, trim: true, default: "" },
 description: { type: String, trim: true, default: "" },
 industry: { type: String, trim: true, default: "" },
 emptype: { type: String, trim: true, default: "" },
 location: { type: String, trim: true, default: "" },

 jobfunction: { type: String, trim: true, default: "" },
 posteddate: { type: String, trim: true, default: "" }
});
*/
var JobPostings = new Schema({
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
    companyLogo: { type: String, trim: true, default: "" }
});

var JobDetails = new Schema({
 job: { type: Job },
 views: [{ type: UserSchema }],
 applicants: [{ type: UserSchema }]
});

var LinkedInSchema = new Schema({
 user: { type: UserSchema },
 JobPostings: [{ type: JobPostings }],
 appliedJobs: Array,
 connections: Array,
 savedjobs: Array,
 profileviews: [{ type: UserSchema }],
 connectionRequests: Array
 //  jobDetails: [{ type: JobDetails }]
});

let LinkedIn = mongoose.model("LinkedIn", LinkedInSchema, "LinkedIn");
module.exports = LinkedIn;

