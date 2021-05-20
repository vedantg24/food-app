import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { logout, setCurrent } from "../../actions/userActions";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const Navbar = ({ user: { user, isAuthenticated }, logout, setCurrent }) => {
  let history = useHistory();
  const onLogout = () => {
    logout();
    history.push("/");
  };

  // const authlinks = (
  //     <Fragment>
  //         <li>
  //             {user && user.role === 'admin' && <Link to ='/add-restaurant'><i className='material-icons'>add_business</i></Link>}
  //         </li>
  //         <li className="white-text" >Hello {user && user.name}</li>
  //         <li>
  //             {user && <Link to ='/update-user' ><i className='material-icons'>account_circle</i></Link>}
  //         </li>
  //         <li>
  //             <a onClick={onLogout} href="#!">
  //                 <i className="material-icons right">login</i>Logout
  //             </a>
  //         </li>
  //     </Fragment>
  // );

  // const guestlinks = (
  //     <Fragment>
  //         <li>
  //             <Link to='/register'>Register</Link>
  //         </li>
  //         <li>
  //             <Link to='/login'>Login</Link>
  //         </li>
  //     </Fragment>
  // )

  return (
    <nav className="teal">
      <div className="container">
        <div className="nav-wrapper">
          <a href="/" className="brand-logo">
            <i className="material-icons">restaurant</i> Food App
          </a>
          <ul className="right">
            {isAuthenticated ? (
              <Fragment>
                <li>
                  {user && user.role === "admin" && (
                    <Link to="/add-restaurant">
                      <i className="material-icons">add_business</i>
                    </Link>
                  )}
                </li>
                <li className="white-text">Hello, {user && user.name}</li>
                <li>
                  {user && (
                    <Link to="/update-user">
                      <i className="material-icons">account_circle</i>
                    </Link>
                  )}
                </li>
                <li>
                  <a onClick={onLogout} href="#!">
                    <i className="material-icons right">login</i>Logout
                  </a>
                </li>
              </Fragment>
            ) : (
              <Fragment>
                <li>
                  <Link to="/register">Register</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </Fragment>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  //title: PropTypes.string.isRequired,
  //icon: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { logout, setCurrent })(Navbar);
