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
import { useHistory } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import NotFound from './components/NotFound';
import Confirmation from './components/Confirmation';
import UserApp from './components/user/UserApp';
import DeleteUser from './components/user/DeleteUser'


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AddPlant from './components/plants/AddPlant';
import { findPlanterByUsername } from './services/planter-api';
import EditPlant from './components/plants/EditPlant';
import EditConfirmation from './components/EditConfirmation';
import EditUser from './components/user/EditUser';


function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState(null);

  const login = async (token) => {
    const { id, sub: username, authorities: rolesString } = await jwt_decode(token);
    
    // const roles = rolesString !== undefined ?  rolesString.split(",") : [];

    const roles = rolesString.split(",");
    const planter = await findPlanterByUsername(username);
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
      myGarden
    };
    
    setCurrentUser(currentUser);
    console.log(currentUser);
  };

  const authenticate = async (username, password) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/authenticate`, {
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
      return jwt_token
    } else if (response.status === 403) {
      throw new Error("Bad username or password");
    } else {
      throw new Error("There was a problem logging in...");
    }
  }

  const logout = () => {
    setCurrentUser(null);
  };

  const auth = {
    currentUser,
    authenticate,
    authenticateRegistration,
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
        {currentUser && currentUser.isValid() ? (
          <GardenApp/>
        ) : (
          <Redirect to="/" />
        )}
        </Route>
        <Route path="/my-garden/:username">
        {currentUser && currentUser.isValid() ? (
          <MyGardenApp/>
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
        {/* <Route path="/plants/add">
          <AddPlant/>
        </Route> */}
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
        <Route path="/editUser/:username">
        {currentUser && currentUser.isValid() ? (
          <UserApp />
        ) : (
          <Redirect to="/" />
        )}
        </Route>
        <Route path="/deleteUser/:username">
        {currentUser && currentUser.isValid() ? (
          <DeleteUser />
        ) : (
          <Redirect to="/" />
        )}
        </Route>
        <Route path="/logout">
        {currentUser && currentUser.isValid() ? (
          <Confirmation />
        ) : (
          <Redirect to="/" />
        )}
        </Route>
        <Route path='/edit-confirmation'>
        {currentUser && currentUser.isValid() ? (
          <EditConfirmation/>
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
