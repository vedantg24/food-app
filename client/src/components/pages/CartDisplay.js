import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import M from "materialize-css/dist/js/materialize.min.js";
import { getCart, buyCart } from "../../actions/cartActions";
import CartDisplayItem from "./CartDisplayItem";
import { loadUser } from "../../actions/userActions";

const CartDisplay = ({
  isAuthenticated,
  user,
  cart,
  getCart,
  buyCart,
  loadUser,
}) => {
  useEffect(() => {
    if (localStorage.token) {
      loadUser();
    }
    getCart();
    // eslint-disable-next-line
  }, []);

  const onClick = () => {
    // if(cart === []){
    //     M.toast({ html: `Please add items to your cart` })
    // } else{
    buyCart();
    M.toast({ html: `Successfully bought` });
    //}
  };

  return (
    <div className="container">
      {isAuthenticated === false ? (
        <h4>Please login to view items in the cart</h4>
      ) : (
        <div>
          {cart.length === 0 ? (
            <h4>Please add items to your cart</h4>
          ) : (
            <div>
              <h2 className="center-align">{user && `${user.name}'s Cart`}</h2>
              <table className="highlight">
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Item Price</th>
                    <th></th>
                  </tr>
                </thead>
                {cart.map((citem) => (
                  <CartDisplayItem citem={citem} key={citem._id} />
                ))}
              </table>
              <br />

              <input
                type="submit"
                value="Buy"
                className="btn waves-effect waves-light"
                onClick={onClick}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

CartDisplay.propTypes = {
  getCart: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  user: state.user.user,
  cart: state.cart.cart,
});

export default connect(mapStateToProps, { getCart, buyCart, loadUser })(
  CartDisplay
);
