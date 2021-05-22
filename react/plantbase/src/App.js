import Nav from './components/Nav';
import Welcome from './components/Welcome';
import PlantApp from './components/plants/PlantApp';
import GardenApp from './components/gardens/GardenApp';
import MyGardenApp from './components/my-gardens/MyGardenApp';
import Register from './components/Register';
import PlantProfile from './components/plants/PlantProfile';
import PostApp from './components/post/PostApp';
import CurrentUser from './components/contexts/CurrentUser';
import {useContext, useState, useEffect} from 'react';
import jwt_decode from "jwt-decode";
import NotFound from './components/NotFound';
import Confirmation from './components/Confirmation';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AddPlant from './components/plants/AddPlant';
import { findPlanterById } from './services/planter-api';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  // const [planter, setPlanter] = useState(null);
  // let firstName;
  // let lastName;
  // let email;
  // let myGarden = {};

  // const findPlanter = async (id) => {
  //   await findUserById(id)
  //     .then((data) => setPlanter(data));

  //     console.log(planter);
  //   firstName = planter.firstName;
  //   lastName = planter.lastName;
  //   email = planter.email;
  //   myGarden = planter.myGarden;
  // }

  const login = async (token) => {
    debugger
    const { id, sub: username, authorities: rolesString } = await jwt_decode(token);
    
    // const roles = rolesString !== undefined ?  rolesString.split(",") : [];

    const roles = rolesString.split(",");
    // findPlanter(id);

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
      // firstName,
      // lastName,
      // email,
      // myGarden
    };


    setCurrentUser(currentUser);
    console.log(currentUser);
  };

  const authenticate = async (username, password) => {
    const response = await fetch("http://localhost:8080/authenticate", {
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
      login(jwt_token);
    } else if (response.status === 403) {
      throw new Error("Bad username or password");
    } else {
      throw new Error("There was a problem logging in...");
    }

    //add fetch for our user

  };

  const logout = () => {
    setCurrentUser(null);
  };

  const auth = {
    currentUser,
    authenticate,
    logout
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
          <GardenApp/>
        </Route>
        <Route path="/my-garden/:userId">
          <MyGardenApp/>
        </Route>
        <Route path="/post" exact>
          <PostApp />
        </Route>
        <Route path="/plant" exact>
          <PlantApp />
        </Route>
        <Route path="/plants/add">
          <AddPlant/>
        </Route>
        <Route path="/plantprofile/:plantId">
          <PlantProfile />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/logout">
            <Confirmation />
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
