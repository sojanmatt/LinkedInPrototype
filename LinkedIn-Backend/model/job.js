const mongoose = require("../mongoose");
const Schema = mongoose.Schema;

var UserSchema = new Schema({
  // username: { type: String, trim: true, index: { unique: true } },
  email: { type: String, trim: true, index: { unique: true } },
  password: { type: String, required: true },
  Fname: { type: String, trim: true, default: "" },
  Lname: { type: String, trim: true, default: "" },
  education: { type: String, trim: true, default: "" },
  phone: { type: String, trim: true, default: "" },
  aboutMe: { type: String, trim: true, default: "" },
  company: { type: String, trim: true, default: "" },
  city: { type: String, trim: true, default: "" },
  state: { type: String, trim: true, default: "" },
  zip: { type: String, trim: true, default: "" },
  gender: { type: String, trim: true, default: "" },
  experience: { type: String, trim: true, default: "" },
  skills: { type: String, trim: true, default: "" },
  isRecruiter: { type: Boolean, trim: true, default: `0` },
  isApplicant: { type: Boolean, trim: true, default: `0` },
  adminid: { type: Number, trim: true, default: "" }
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

var JobSchema = new Schema({
  job: { type: Job },
  applicants: [{ type: UserSchema }],
  views: { type: Number, trim: true }
});

let Job = mongoose.model("job", JobSchema, "job");
module.exports = Job;
