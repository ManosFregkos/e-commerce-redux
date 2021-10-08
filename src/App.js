import { Route, Switch, Redirect } from "react-router-dom";
import { auth, handleUserProfile } from "../src/Firebase/utils";
import { setCurrentUser } from "./redux/User/user.actions";
import { connect } from "react-redux";

//layouts
import MainLayout from "./Layouts/MainLayout";
import HomepageLayout from "./Layouts/HomepageLayout";

//pages
import Homepage from "./pages/Homepage";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import ResetPassword from "./../src/pages/ResetPassword";

import "./index.scss";
import React from "react";

class App extends React.Component {
  authListener = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      }
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.authListener();
  }

  render() {
    const { currentUser } = this.props;

    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <HomepageLayout>
                <Homepage />
              </HomepageLayout>
            )}
          />
          <Route
            path="/registration"
            render={() =>
              currentUser ? (
                <Redirect to="/" />
              ) : (
                <MainLayout>
                  <Registration />
                </MainLayout>
              )
            }
          />
          <Route
            path="/login"
            render={() =>
              currentUser ? (
                <Redirect to="/" />
              ) : (
                <MainLayout>
                  <Login />
                </MainLayout>
              )
            }
          />
          <Route
            path="/reset-password"
            render={() => (
              <MainLayout>
                <ResetPassword />
              </MainLayout>
            )}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
