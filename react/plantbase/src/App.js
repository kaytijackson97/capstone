import Nav from "./components/Nav";
import Welcome from "./components/Welcome";
import GardenApp from "./components/gardens/GardenApp";
import MyGardenApp from "./components/my-gardens/MyGardenApp";
import Register from "./components/Register";
import PlantProfile from "./components/plants/PlantProfile";
import PostApp from "./components/post/PostApp";
import CurrentUser from "./components/contexts/CurrentUser";
import { useContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import NotFound from "./components/NotFound";
import Confirmation from "./components/Confirmation";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { findPlanterByUsername } from "./services/planter-api";
import EditPlant from "./components/plants/EditPlant";
import EditConfirmation from "./components/EditConfirmation";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const login = async (token) => {
    const {
      id,
      sub: username,
      authorities: rolesString,
    } = await jwt_decode(token);

    const roles = rolesString.split(",");
    const planter = await findPlanterByUsername(username);
    if (planter === null) {
      return null;
    }
    const firstName = planter.firstName;
    const lastName = planter.lastName;
    const email = planter.email;
    const myGarden = planter.myGarden;

    const currentUser = {
      id,
      username,
      roles,
      token,
      hasRole(role) {
        return this.roles.includes(role);
      },
      isValid() {
        return true;
      },
      firstName,
      lastName,
      email,
      myGarden,
    };

    setCurrentUser(currentUser);
    return currentUser;
  };

  const authenticate = async (username, password) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/authenticate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      }
    );

    if (response.status === 200) {
      const { jwt_token } = await response.json();
      const validUser = await login(jwt_token);
      if (validUser === null) {
        return null;
      }
    } else if (response.status === 403) {
      throw new Error("Bad username or password");
    } else {
      throw new Error("There was a problem logging in...");
    }
  };

  const authenticateRegistration = async (username, password) => {
    const response = await fetch(`http://localhost:8080/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (response.status === 200) {
      const { jwt_token } = await response.json();
      return jwt_token;
    } else if (response.status === 403) {
      throw new Error("Bad username or password");
    } else {
      throw new Error("There was a problem logging in...");
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const auth = {
    currentUser,
    authenticate,
    authenticateRegistration,
    logout,
  };

  return (
    <div className="App">
      <CurrentUser.Provider value={auth}>
        <Router>
          <Nav />
          <Switch>
            <Route path="/" exact>
              <Welcome />
            </Route>
            <Route path="/garden" exact>
              {currentUser && currentUser.isValid() ? (
                <GardenApp />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <Route path="/my-garden/:username">
              {currentUser && currentUser.isValid() ? (
                <MyGardenApp />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <Route path="/post" exact>
              {currentUser && currentUser.isValid() ? (
                <PostApp />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <Route path="/plantprofile/:plantId">
              {currentUser && currentUser.isValid() ? (
                <PlantProfile />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <Route path="/plant/edit/:plantId">
              {currentUser && currentUser.isValid() ? (
                <EditPlant />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/logout">
              {currentUser && currentUser.isValid() ? (
                <Confirmation />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <Route path="/edit-confirmation">
              {currentUser && currentUser.isValid() ? (
                <EditConfirmation />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </CurrentUser.Provider>
    </div>
  );
}

export default App;
