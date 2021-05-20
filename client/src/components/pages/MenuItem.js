import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import M from "materialize-css/dist/js/materialize.min.js";
import { addCart } from "../../actions/cartActions";
import { deleteMenuitem } from "../../actions/restaurantActions";

const MenuItem = ({ item, isAuthenticated, user, addCart, deleteMenuitem }) => {
  const { _id, name, description, cost, image } = item;

  const [quantity, setQuantity] = useState("");

  const onclick = () => {
    if (!isAuthenticated) {
      M.toast({ html: "Please login to add items in the cart" });
    } else if (!quantity) {
      M.toast({ html: "Please add quantity" });
    } else {
      addCart({ _id, name, description, cost, image, quantity });

      M.toast({ html: `${name} added in the cart` });
    }
  };
  const onChange = (e) => {
    setQuantity(e.target.value);
  };

  const onDelete = () => {
    deleteMenuitem(_id);
    M.toast({ html: "Item Deleted" });
  };

  return (
    <div>
      <div className="column" float="left" width="50%"></div>
      <div className="col s6 m6">
        <div className="card">
          <div className="card-image">
            <img src={image} />
            <a
              className="btn-floating halfway-fab waves-effect waves-light red"
              onClick={onclick}
            >
              <i className="material-icons">add_shopping_cart</i>
            </a>
          </div>

          <div className="card-content">
            <span className="card-title">{name}</span>
            <br />
            <p>{description}</p>
            <br />
            <p>
              <i className="material-icons"></i>Cost:&nbsp;{cost}
              {user && user.role === "admin" && (
                <a href="#!" className="secondary-content" onClick={onDelete}>
                  <i className="material-icons">delete</i>
                </a>
              )}
            </p>
            <div className="input-field">
              <label htmlFor="quantity">Quantity</label>
              <input
                id="quantity"
                type="text"
                name="quantity"
                value={quantity}
                onChange={onChange}
                required
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

MenuItem.propTypes = {
  addCart: PropTypes.func.isRequired,
  deleteMenuitem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  user: state.user.user,
});

export default connect(mapStateToProps, { addCart, deleteMenuitem })(MenuItem);
