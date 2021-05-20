import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addMenuitem } from "../../actions/restaurantActions";
import { loadUser } from "../../actions/userActions";
import { useHistory } from "react-router-dom";

const AddMenuItem = ({ addMenuitem, loadUser }) => {
  useEffect(() => {
    if (localStorage.token) {
      loadUser();
    }
    // eslint-disable-next-line
  }, []);

  let history = useHistory();

  const [menuitem, setMenuitem] = useState({
    name: "",
    description: "",
    cost: "",
    image: "",
  });

  const { name, description, cost, image } = menuitem;

  const onChange = (e) =>
    setMenuitem({ ...menuitem, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addMenuitem({
      name,
      description,
      cost,
      image,
      restaurant: localStorage.getItem("restaurantid"),
    });
    history.push("/");
  };

  return (
    <div className="container">
      <h1 className="teal-text  lighten-2 center-align">Add Menu Item</h1>
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
          <label htmlFor="cost">Cost</label>
          <input
            id="cost"
            type="text"
            name="cost"
            value={cost}
            onChange={onChange}
            required
          />
        </div>
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
        <input
          type="submit"
          value="ADD"
          className="btn waves-effect waves-light"
        />
      </form>
    </div>
  );
};

export default connect(null, { addMenuitem, loadUser })(AddMenuItem);
