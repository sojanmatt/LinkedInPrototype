var ClickedJobs = require("../model/clickedjobs");

/**************Track Job Clicks *********************/
function handle_request(msg, callback) {
 var res = {};
 console.log("Inside job click", msg);
 
 var myobj = new ClickedJobs({
   jobData: msg.job
 });


  myobj.save().then(
    doc => {
      console.log("Result fromkakfka", doc);
      callback(null, doc);
    },
    err => {
      callback(err, null);
    }
  );
}
exports.handle_request = handle_request;
