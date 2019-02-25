const mongoose = require("../mongoose");
const Schema = mongoose.Schema;

var ProfileViewsSchema = new Schema({
    profileEmail : String,
    viewTime : Date
});

let ProfileViews = mongoose.model("ProfileViews", ProfileViewsSchema, "ProfileViews");
module.exports = ProfileViews;