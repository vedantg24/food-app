import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadUser } from "../../actions/userActions";

const CartHistory = ({ user, isAuthenticated, loadUser }) => {
  useEffect(() => {
    if (localStorage.token) {
      loadUser();
    }
    // eslint-disable-next-line
  }, []);

  // const { cartHistory, name } = user;
  return (
    <div className="container">
      {isAuthenticated === false ? (
        <h4>Please login to view your cart history</h4>
      ) : (
        <div>
          <h2 className="center-align">{`${user.name}'s Cart History`}</h2>
          <table className="highlight">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Item Price</th>
                <th></th>
              </tr>
            </thead>
            {user.cartHistory.map((citem) => (
              <tbody>
                <tr>
                  <td>{citem.name}</td>
                  <td>{citem.quantity}</td>
                  <td>{citem.cost}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

CartHistory.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  user: state.user.user,
});

export default connect(mapStateToProps, { loadUser })(CartHistory);
