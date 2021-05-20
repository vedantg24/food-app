import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updateUser, loadUser } from "../../actions/userActions";
import { useHistory } from "react-router-dom";
import M from "materialize-css/dist/js/materialize.min.js";

const UpdateUser = ({ current, updateUser, loadUser }) => {
  let history = useHistory();
  useEffect(() => {
    if (localStorage.token) {
      loadUser();
    }

    if (current !== null) {
      setUser(current);
    } else {
      history.push("/");
    }
    // eslint-disable-next-line
  }, []);

  const [user, setUser] = useState({
    name: "",
    email: "",
    mob_no: "",
    address: "",
  });

  const { name, email, mob_no, address } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "") {
      M.toast({ html: "Please enter a name and email" });
    } else {
      updateUser({
        id: current._id,
        name,
        email,
        mob_no,
        address,
      });

      M.toast({ html: "User updated" });

      history.push("/");
    }
  };

  return (
    <div className="container">
      <h1 className="teal-text  lighten-2 center-align">
        Update User Information
      </h1>
      <form onSubmit={onSubmit}>
        <div>
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
        <div>
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
        <div>
          <label htmlFor="mob_no">Mobile Number</label>
          <input
            id="mob_no"
            type="text"
            name="mob_no"
            value={mob_no}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            name="address"
            value={address}
            onChange={onChange}
          />
        </div>
        <input
          type="submit"
          value="Update"
          className="btn waves-effect waves-light"
        />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  current: state.user.current,
  user: state.user.user,
});

export default connect(mapStateToProps, { updateUser, loadUser })(UpdateUser);
