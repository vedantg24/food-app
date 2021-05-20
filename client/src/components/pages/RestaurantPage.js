import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getRestaurant } from "../../actions/restaurantActions";
import MenuItem from "./MenuItem";
import Preloader from "../layout/Preloader";
import { loadUser } from "../../actions/userActions";
import AddBtn from "../layout/AddBtn";
import { Link } from "react-router-dom";

const RestaurantPage = ({
  menuitems,
  restaurant,
  isAuthenticated,
  user,
  getRestaurant,
  loadUser,
}) => {
  useEffect(() => {
    if (localStorage.token) {
      loadUser();
    }
    getRestaurant();
  }, []);

  return (
    <div>
      {!restaurant && !menuitems ? (
        <Preloader />
      ) : (
        <div className="container">
          {isAuthenticated && <AddBtn />}
          <div className="row">
            <div className="col s12 m12">
              <div className="card">
                <div className="card-image">
                  <img width="70%" height="350vw" src={restaurant.image} />
                  <span className="card-title">{restaurant.name}</span>
                </div>
                <div className="card-content">
                  <p>{restaurant.description}</p>
                  <br />
                  <span>
                    <i className="material-icons left">place</i>Address:&nbsp;
                    {restaurant.address}
                  </span>
                  <br />
                  <br />
                  <span>
                    <i className="material-icons left">email</i>Email:&nbsp;
                    {restaurant.email}
                  </span>
                  <br />
                  <br />
                  <span>
                    <i className="material-icons left">call</i>Contact:&nbsp;
                    {restaurant.contact}
                  </span>
                  <br />
                  <br />
                  <span>
                    <i className="material-icons left">access_time</i>
                    Timings:&nbsp;
                    <span>
                      {restaurant.timings.start} - {restaurant.timings.end}
                    </span>
                  </span>
                  &nbsp; &nbsp; &nbsp; &nbsp;
                  <span>
                    <i className="material-icons">star_rate</i>
                    &nbsp;Rating:&nbsp;{restaurant.rating}
                  </span>
                  <br />
                  <br />
                  <p>Type: {restaurant.type}</p>
                  <br />
                  <span>
                    Availability:&nbsp;&nbsp;
                    {!restaurant.isAvailable ? (
                      <i className="material-icons">check_box_outline_blank</i>
                    ) : (
                      <i className="material-icons">check_box</i>
                    )}
                  </span>
                </div>
              </div>
              {user && user.role === "admin" && (
                <Link
                  to="/add-menuitem"
                  className="btn waves-effect waves-light"
                >
                  <i className="material-icons left">fastfood</i>Add Menu Item
                </Link>
              )}
            </div>
          </div>
          <div className="row">
            {menuitems.map((item) => (
              <MenuItem item={item} key={item._id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

RestaurantPage.propTypes = {
  restaurant: PropTypes.object.isRequired,
  menuitems: PropTypes.array.isRequired,
  getRestaurant: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  menuitems: state.restaurant.menuitems,
  restaurant: state.restaurant.restaurant,
  isAuthenticated: state.user.isAuthenticated,
  user: state.user.user,
});

export default connect(mapStateToProps, { getRestaurant, loadUser })(
  RestaurantPage
);
