const mongoose = require("mongoose");
const options = {
  poolSize: 100
};
mongoose.Promise = global.Promise;
//"mongodb://localhost:27017/HomeAway",
// "mongodb://sojanmathew:sojanm28@ds133920.mlab.com:33920/homeaway",
mongoose
  .connect(
    "mongodb://linkedin:linkedinteam1@ds159263.mlab.com:59263/linkedin",options
  )
  .then(console.log("mlabs connected"));

module.exports = mongoose;
