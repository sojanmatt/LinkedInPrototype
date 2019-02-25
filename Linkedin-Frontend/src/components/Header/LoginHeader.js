import React, { Component } from "react";
import { Link } from "react-router-dom";
import linkedinlogo from "../../images/linkedin_signup_logo.png";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { login } from "../../actions/LoginAction";
import axios from "axios";
import { Redirect } from "react-router";
import PropTypes from "prop-types";

class LoginHeader extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  renderField(field) {
    const {
      meta: { touched, error }
    } = field;
    const className = `form-group loginAdjustment ${
      touched && error ? "has-danger" : ""
    }`;
    const fieldType = field.type;
    const filedPlaceHolder = field.placeholder;
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control loginAdjustment"
          type={fieldType}
          placeholder={filedPlaceHolder}
          {...field.input}
        />
        <div className="text-help">{touched ? error : ""}</div>
      </div>
    );
  }
  submitLogin(values) {
    var headers = new Headers();
    console.log(values);
    this.props.login(values, () => {
      //   this.props.history.push("/");
    });
  }

  render() {
    console.log(this.props.loginStateStore);
    var redirectVar = null;
    var error = null;

    if (this.props.loginStateStore.result) {
      if (this.props.loginStateStore.result.responseFlag == "true") {
        redirectVar = <Redirect to="/home" />;
      }
      if (this.props.loginStateStore.result.responseFlag == "") {
        console.log("error");
        error = <div className="alert alert-danger">Invalid login</div>;
      }
    }

    if (this.props.loginStateStore.result) {
      if (this.props.loginStateStore.result.responseFlag == "true") {
        redirectVar = <Redirect to="/home" />;
      }
      if (this.props.loginStateStore.result.responseFlag == "") {
        console.log("error");
        error = <div className="alert alert-danger">Invalid login</div>;
      }
    }
    const { handleSubmit } = this.props;
    return (
      <div className="header-container">
        {redirectVar}
        <div className="container">
          <div className="header-content-container">
            <img
              className="linkedIn-logo-login"
              // src="http://www.theredbrickroad.com/wp-content/uploads/2017/05/linkedin-logo-copy.png"
              src={linkedinlogo}
              alt="logo"
            />
            <span className="nav-links">
              {/* <input type="search" placeholder="Email" aria-label="Email" /> */}
              <Field
                label=""
                className="form-control loginForm"
                name="username"
                type="username"
                component={this.renderField}
                placeholder="username"
              />
              <Field
                label=""
                className="form-control loginForm"
                name="password"
                type="password"
                component={this.renderField}
                placeholder="Password"
              />
              <button
                className="btn btn-outline-success btn-login my-2 my-sm-0"
                type="submit"
                onClick={handleSubmit(this.submitLogin.bind(this))}
              >
                Sign in
              </button>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  // Validate the inputs from 'values'
  if (!values.username) {
    errors.username = "Enter username";
  }
  if (!values.password) {
    errors.password = "Enter password";
  }
  return errors;
}

const mapStateToProps = state => ({
  loginStateStore: state.Login
});

// export default LoginHeader;
export default reduxForm({ validate, form: "NewBookForm" })(
  connect(
    mapStateToProps,
    { login }
  )(LoginHeader)
);
