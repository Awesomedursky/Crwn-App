import React from 'react';
import './App.css';
import { connect } from 'react-redux';

import Homepage from './pages/home/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SigninSignup from './pages/signinsignup/signinsignup.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';

import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { auth } from './firebase/firebase.util';

import { setCurrentUser } from './redux/user/user.actions';

import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selector';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth =
      auth.onAuthStateChanged(async (user) => {
        setCurrentUser(user);
      });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />

        <Switch>
          <Route
            exact
            path='/'
            component={Homepage}
          />
          <Route
            path='/shop'
            component={ShopPage}
          />
          <Route
            exact
            path='/signup'
            render={() =>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SigninSignup />
              )
            }
          />
          <Route
            path='/checkout'
            exact
            component={CheckoutPage}
          />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) =>
    dispatch(setCurrentUser(user)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

