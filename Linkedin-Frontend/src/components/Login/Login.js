import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { login } from "../../actions/LoginAction";
import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router";
import PropTypes from "prop-types";

class Login extends Component {
  // constructor(props){
  //     super(props);
  //     console.log(props);
  // }
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

  //submit Login handler to send a request to the node backend
  submitLogin(values) {
    var headers = new Headers();
    console.log(values);
    this.props.login(values, () => {
      //   this.props.history.push("/");
    });
  }

  // componentDidMount(){
  //     this.props.login();
  // }
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
        error = <div class="alert alert-danger">Invalid login</div>;
      }

      if (this.props.loginStateStore.result) {
        if (this.props.loginStateStore.result.responseFlag == "true") {
          redirectVar = <Redirect to="/home" />;
        }
        if (this.props.loginStateStore.result.responseFlag == "") {
          console.log("error");
          error = <div class="alert alert-danger">Invalid login</div>;
        }
      }
      const { handleSubmit } = this.props;
      return (
        <div class="">
          {redirectVar}
          <div class="login-form one">
            <form>
              <div className="main-div">
                <div className="panel">
                  <h2>Welcome Back</h2>
                  <p>
                    Don't miss your next opportunity. Sign in to stay updated on
                    your professional world.
                  </p>
                </div>
                {error}
                <div className="form-group">
                  <Field
                    label=""
                    className="form-control"
                    name="username"
                    type="username"
                    component={this.renderField}
                    placeholder="username"
                  />
                  {/* <input type="text" class="form-control" name="email" placeholder="Email"/> */}
                </div>
                <div className="form-group">
                  <Field
                    label=""
                    className="form-control"
                    name="password"
                    type="password"
                    component={this.renderField}
                    placeholder="Password"
                  />
                  {/* <input type="password" class="form-control" name="password" placeholder="Password"/> */}
                </div>
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={handleSubmit(this.submitLogin.bind(this))}
                >
                  Signin
                </button>
                <br />
                <br />
                <p>New to LinkedIn? Join now</p>
                <Link to="/signup">Join</Link>
              </div>
            </form>
          </div>
        </div>
      );
    }
    const { handleSubmit } = this.props;
    return (
      <div className="">
        {redirectVar}
        <div className="login-form">
          <div className="">
            <form className="pad-10-pc-top">
              <div className="main-div">
                <div className="panel pt-3">
                  <h2 className="">Welcome Back</h2>
                  <p>
                    Don't miss your next opportunity. Sign in to stay updated on
                    your professional world.
                  </p>
                </div>
                {error}
                <div className="pl-5 pr-5">
                  <div className="form-group">
                    <Field
                      label=""
                      className="form-control"
                      name="username"
                      type="username"
                      component={this.renderField}
                      placeholder="username"
                    />
                    {/* <input type="text" class="form-control" name="email" placeholder="Email"/> */}
                  </div>
                  <div className="form-group">
                    <Field
                      label=""
                      className="form-control"
                      name="password"
                      type="password"
                      component={this.renderField}
                      placeholder="Password"
                    />
                    {/* <input type="password" class="form-control" name="password" placeholder="Password"/> */}
                  </div>
                  <div className="form-group">
                    <button
                      className="btn btn-primary form-control "
                      type="submit"
                      onClick={handleSubmit(this.submitLogin.bind(this))}
                    >
                      <b>Signin</b>
                    </button>
                  </div>
                  <br />
                  <br />
                  <p>New to LinkedIn? Join now</p>
                  <Link to="/signup">Signup</Link>/
                  <Link to="/recruiter-signup">Signup as a recruiter</Link>
                </div>
              </div>
            </form>
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

  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

//Access to redux store
const mapStateToProps = state => ({
  loginStateStore: state.Login
});

//export default Login;
export default reduxForm({ validate, form: "NewBookForm" })(
  connect(
    mapStateToProps,
    { login }
  )(Login)
);
// export default connect(mapStateToProps, {login})(Login);
