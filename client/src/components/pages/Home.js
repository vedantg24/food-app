import React, { useEffect } from "react";
import { connect } from "react-redux";
import RestaurantItem from "./RestaurantItem";
import PropTypes from "prop-types";
import { getRestaurants } from "../../actions/restaurantActions";
import Preloader from "../layout/Preloader";
import { loadUser } from "../../actions/userActions";
//import AddBtn from '../layout/AddBtn';

const Home = ({ loadUser, isAuthenticated, getRestaurants, restaurant }) => {
  useEffect(() => {
    if (localStorage.token) {
      loadUser();
    }
    getRestaurants();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {!restaurant ? (
        <Preloader />
      ) : (
        restaurant.map((restaurant) => (
          <RestaurantItem restaurant={restaurant} key={restaurant._id} />
        ))
      )}
      {/* <AddBtn /> */}
    </div>
  );
};

Home.propTypes = {
  getRestaurants: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
};

const mapSateToProps = (state) => ({
  restaurant: state.restaurant.restaurants,
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapSateToProps, { getRestaurants, loadUser })(Home);
