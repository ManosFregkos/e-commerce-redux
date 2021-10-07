import { Route, Switch } from "react-router-dom";
import { auth } from "../src/Firebase/utils";

//layouts
import MainLayout from "./Layouts/MainLayout";
import HomepageLayout from "./Layouts/HomepageLayout";

//pages
import Homepage from "./pages/Homepage";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import "./index.scss";
import React from "react";

const initialState = {
  currentUser: null,
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
  }

  authListener = null;

  componentDidMount() {
    this.authListener = auth.onAuthStateChanged((userAuth) => {
      if (!userAuth) return;

      this.setState({ currentUser: userAuth });
    });
  }

  componentWillUnmount() {
    this.authListener();
  }

  render() {
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
            render={() => (
              <MainLayout>
                <Registration />
              </MainLayout>
            )}
          />
          <Route
            path="/login"
            render={() => (
              <MainLayout>
                <Login />
              </MainLayout>
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
