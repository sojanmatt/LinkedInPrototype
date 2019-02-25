import React, { Component } from "react";
import LoginHeader from "../Header/LoginHeader";
import { Field, reduxForm } from "redux-form";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { userActions } from "../../actions/applicantSignupAction";
class Signup extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  renderField(field) {
    const {
      meta: { touched, error }
    } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;
    const fieldType = field.type;
    const filedPlaceHolder = field.placeholder;
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type={fieldType}
          placeholder={filedPlaceHolder}
          {...field.input}
        />
        <div className="text-help">{touched ? error : ""}</div>
      </div>
    );
  }

  submitSignUp(values) {
    // var headers = new Headers();
    console.log(values);
    this.props.signup(values);
    // , () => {
    //   //   this.props.history.push("/");
    // });
  }
  render() {
    console.log("issigned", this.props.isSignedup);
    //  console.log(this.props.loginStateStore);
    var redirectVar = null;
    var error = null;

    if (this.props.isSignedup) {
      console.log("issigned", this.props.isSignedup);
      redirectVar = <Redirect to="/login" />;
    }
    if (this.props.loginStateStore.result) {
      if (this.props.loginStateStore.result.responseFlag == "true") {
        redirectVar = <Redirect to="/home" />;
      }
    }
    if (this.props.isinvalid) {
      console.log("this.props.isinvalid", this.props.isinvalid);
      error = <div className="alert alert-danger">Invalid Signup</div>;
    }

    const { handleSubmit } = this.props;
    return (
      <div>
        {redirectVar}

        <div className="login-form">
          <div className="main-div">
            <div className="panel">
              <h2>Be great at what you do</h2>
              <p>Get started - it's free.</p>
              {error}
            </div>
            <div className="container">
              <form>
                <div className="form-group">
                  <Field
                    //  type="text"
                    className="form-control"
                    name="Fname"
                    type="Fname"
                    placeholder="First Name"
                    component={this.renderField}
                    // onChange={this.handleChange}
                  />
                </div>
                <br />
                <div className="form-group">
                  <Field
                    // type="text"
                    className="form-control"
                    name="Lname"
                    type="Lname"
                    placeholder="Last Name"
                    component={this.renderField}
                  />
                </div>
                <br />
                <div className="form-group">
                  <Field
                    //   type="text"
                    className="form-control"
                    name="Email"
                    type="Email"
                    placeholder="Email"
                    component={this.renderField}
                  />
                </div>
                <br />
                <div className="form-group">
                  <Field
                    // type="password"
                    className="form-control"
                    name="Password"
                    type="Password"
                    placeholder="Password"
                    component={this.renderField}
                  />
                </div>
                <br />
                <div>
                  <button
                    onClick={handleSubmit(this.submitSignUp.bind(this))}
                    className="btn btn-success"
                    type="submit"
                  >
                    Join Now
                  </button>
                </div>
                <br />
                <div>
                  <Link to="/login">Login</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function validate(values) {
  const errors = {};
  console.log("values", values);
  // Validate the inputs from 'values'
  if (!values.Email) {
    errors.Email = "Enter Email";
  }
  if (!values.Password) {
    errors.Password = "Enter password";
  }
  if (!values.Fname) {
    errors.Fname = "Enter First Name";
  }
  if (!values.Lname) {
    errors.Lname = "Enter Last Name";
  }

  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

const mapStateToProps = state => {
  return {
    isSignedup: state.signup.isApplicantSignedUp,
    isinvalid: state.signup.isinvalid,
    loginStateStore: state.Login
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signup: data => dispatch(userActions.applicantsignup(data))
  };
};

export default reduxForm({ validate, form: "NewBookForm" })(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Signup)
);
