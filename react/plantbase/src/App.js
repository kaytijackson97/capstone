import Nav from './components/Nav';
import Welcome from './components/Welcome';
import Post from './components/post/Post';
import PlantApp from './components/plants/PlantApp';
import GardenApp from './components/gardens/GardenApp';
import MyGardenApp from './components/my-gardens/MyGardenApp';
import Register from './components/Register';
import PlantProfile from './components/plants/PlantProfile';
import PostApp from './components/post/PostApp';
import Reply from './components/reply/Reply';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
    <Router>
      <Nav />
      <Switch>
        <Route path="/" exact>
          <Welcome />
        </Route>
        <Route path="/garden" exact>
          <GardenApp/>
        </Route>
        <Route path="/my-garden" exact>
          <MyGardenApp/>
        </Route>
        <Route path="/post" exact>
          <PostApp />
        </Route>
        <Route path="/reply" exact>
          <Reply />
        </Route>
        <Route path="/plant" exact>
          <PlantApp />
        </Route>
        <Route path="/plantprofile/:plantId">
          <PlantProfile />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
