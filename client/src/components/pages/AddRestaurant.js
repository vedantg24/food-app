import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addRestaurant } from "../../actions/restaurantActions";
import { loadUser } from "../../actions/userActions";
import { useHistory } from "react-router-dom";

const AddRestaurant = ({ user, isAuthenticated, addRestaurant, loadUser }) => {
  useEffect(() => {
    if (localStorage.token) {
      loadUser();
    }
    // eslint-disable-next-line
  }, []);
  let history = useHistory();

  const [restaurant, setRestaurant] = useState({
    name: "",
    email: "",
    description: "",
    address: "",
    contact: "",
    image: "",
    type: "",
  });

  const {
    name,
    email,
    description,
    address,
    contact,
    image,
    type,
  } = restaurant;

  const onChange = (e) =>
    setRestaurant({ ...restaurant, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addRestaurant({
      name,
      email,
      description,
      address,
      contact,
      image,
      type,
    });
    history.push("/");
  };

  return (
    <div className="container">
      <h1 className="teal-text  lighten-2 center-align">Register Restaurant</h1>
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
          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            name="description"
            value={description}
            onChange={onChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            name="address"
            value={address}
            onChange={onChange}
            required
          />
        </div>
        <div className="input-field">
          <label htmlFor="contact">Contact</label>
          <input
            id="contact"
            type="text"
            name="contact"
            value={contact}
            onChange={onChange}
          />
        </div>
        {/* <div className='input-field'>
                    <span>Timings:</span>
                    <label htmlFor='contact'>Start</label>
                    <input
                      id='contact'
                      type='text'
                      name='contact'
                      value={contact}
                      onChange={onChange}
                    />
                </div> */}
        <div className="input-field">
          <label htmlFor="image">Image Link</label>
          <input
            id="image"
            type="text"
            name="image"
            value={image}
            onChange={onChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="type">Type</label>
          <input
            id="type"
            type="text"
            name="type"
            value={type}
            onChange={onChange}
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn waves-effect waves-light "
        />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps, { addRestaurant, loadUser })(
  AddRestaurant
);
