import { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { checkUserSession } from "./redux/User/user.actions";
import { useDispatch } from "react-redux";

//hoc
import WithAuth from "./hoc/withAuth";

//layouts
import MainLayout from "./Layouts/MainLayout";
import HomepageLayout from "./Layouts/HomepageLayout";

//pages
import Homepage from "./pages/Homepage";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import ResetPassword from "./../src/pages/ResetPassword";
import Dashboard from "./pages/Dashboard.js";

import "./index.scss";

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

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
        <Route
          path="/reset-password"
          render={() => (
            <MainLayout>
              <ResetPassword />
            </MainLayout>
          )}
        />
        <Route
          path="/dashboard"
          render={() => (
            <WithAuth>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </WithAuth>
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
