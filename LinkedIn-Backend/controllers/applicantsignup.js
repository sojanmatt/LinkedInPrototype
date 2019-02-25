var kafka = require("../kafka/client");
const jwt = require("jsonwebtoken");
exports.applicantsignup = function(req, res) {
  console.log("Inside applicant signup Request Handler");
  console.log(req.body);
  kafka.make_request(
    "applicant_signup_topic",
    {
      email: req.body.Email,
      password: req.body.Password,
      Fname: req.body.Fname,
      Lname: req.body.Lname
    },
    function(err, result) {
      if (err) {
        throw err;
      } else {
        if (result.code === 400) res.status(400).send(result.msg);
        else {
          console.log("applicant inserted", result);
          const body = { _id: req.body.Email, type: "applicant" };
          const token = jwt.sign({ user: body }, "verified_linkedinUser");
          res.status(200).send(token);
        }
      }
    }
  );
};
