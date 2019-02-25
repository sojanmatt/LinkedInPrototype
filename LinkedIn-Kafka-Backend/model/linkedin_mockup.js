const mongoose = require("../mongoose");
const Schema = mongoose.Schema;

var linkedin_mockup = new Schema({
  adminid: { type: Number, trim: true, default: "" },
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
  accountType: { type: Number, trim: true, default: "" }
});

let LinkedIn = mongoose.model("LinkedIn_mockdata", linkedin_mockup, "LinkedIn_mockdata");
module.exports = LinkedIn;