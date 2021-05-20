import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login, clearErrors } from "../../actions/userActions";
import { useHistory } from "react-router-dom";
import M from "materialize-css/dist/js/materialize.min.js";

const Login = ({ login, clearErrors, isAuthenticated, error }) => {
  let history = useHistory();
  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }

    if (error === "Invalid Credentials") {
      M.toast({ html: "Invalid Credentials" });
      clearErrors();
    }

    // eslint-disable-next-line
  }, [isAuthenticated, error]);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(error);
    // if(error === 'Invalid Credentials') {
    //   M.toast({ html: 'Invalid Credentials' });
    //   clearErrors();
    // } else {
    login({
      email,
      password,
    });
    //}
  };

  return (
    <div className="container">
      <h1 className="teal-text  lighten-2 center-align">Account Login</h1>
      <form onSubmit={onSubmit}>
        <div className="input-field">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            minLength="6"
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="btn waves-effect waves-light"
        />
      </form>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  error: state.user.error,
});

export default connect(mapStateToProps, { login, clearErrors })(Login);
