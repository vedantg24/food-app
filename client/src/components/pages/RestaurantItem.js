import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setCurrent } from "../../actions/restaurantActions";
import M from "materialize-css/dist/js/materialize.min.js";
import { deleteRestaurant } from "../../actions/restaurantActions";

const RestaurantItem = ({ restaurant, user, setCurrent, deleteRestaurant }) => {
  const { _id, name, email, contact, image } = restaurant;

  const onDelete = () => {
    deleteRestaurant(_id);
    M.toast({ html: "Restaurant Deleted" });
  };

  return (
    <div className="col s12 m12">
      <div className="card horizontal teal lighten-4">
        <div className="card-image">
          <img width="70%" height="200vw" src={image} />
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <h4 className="red-text">{name}</h4>
            <i className="material-icons left">email</i> Email: {email}
            <br />
            <br />
            <i className="material-icons left">call</i> Contact: {contact}
          </div>
          <div className="card-action">
            <Link
              to="/restaurant-page"
              className="red-text"
              onClick={() => setCurrent(_id)}
            >
              Go To Restaurant{" "}
            </Link>
            {user && user.role === "admin" && (
              <a href="#!" className="secondary-content" onClick={onDelete}>
                <i className="material-icons">delete</i>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});

export default connect(mapStateToProps, { setCurrent, deleteRestaurant })(
  RestaurantItem
);
