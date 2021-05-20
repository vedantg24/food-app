import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import RestaurantPage from './components/pages/RestaurantPage';
import AddBtn from './components/layout/AddBtn';
import CartDisplay from './components/pages/CartDisplay';
import CartHistory from './components/pages/CartHistory';
import AddRestaurant from './components/pages/AddRestaurant';
import AddMenuItem from './components/pages/AddMenuItem';
import UpdateUser from './components/pages/UpdateUser';

//import Chart from './components/pages/Chart';
//import Question from './components/pages/Question';

import { Provider } from 'react-redux';
import store from './store'; 

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import setAuthToken from './utils/setAuthToken';
//import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    // Initializes Materialize JS
    M.AutoInit();
  });

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
            <div className="container">
              <Switch>
                <Route exact path='/' component={Home} /> 
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/restaurant-page' component={RestaurantPage} />
                <Route exact path='/cart-display' component={CartDisplay} />
                <Route exact path='/cart-history' component={CartHistory} />
                <Route exact path='/add-restaurant' component={AddRestaurant} />
                <Route exact path='/add-menuitem' component={AddMenuItem} />
                <Route exact path='/update-user' component={UpdateUser} />
                {/* <Route exact path='/chart' component={Chart} /> */}
                {/* <Route exact path='/question' component={Question} /> */}
              </Switch>
              <AddBtn />
            </div>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
