import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/userActions";
import { useHistory } from "react-router-dom";
import M from "materialize-css/dist/js/materialize.min.js";

const Register = ({ isAuthenticated, register }) => {
  let history = useHistory();
  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }

    // eslint-disable-next-line
  }, [isAuthenticated]);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    mob_no: "",
  });

  const { name, email, password, mob_no } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      M.toast({ html: "Please enter a name and email" });
    } else {
      register({
        name,
        email,
        password,
        mob_no,
      });
    }
  };

  return (
    <div className="container">
      <h1 className="teal-text  lighten-2 center-align">Account Register</h1>
      <form onSubmit={onSubmit}>
        <div className="input-field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
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
            minLength="6"
          />
        </div>
        <div className="input-field">
          <label htmlFor="mob_no">Mobile Number</label>
          <input
            id="mob_no"
            type="text"
            name="mob_no"
            value={mob_no}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <input
            type="submit"
            value="Register"
            className="btn waves-effect waves-light"
          />
        </div>
      </form>
    </div>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps, { register })(Register);
