import Nav from './components/Nav';
import Welcome from './components/Welcome';
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
      </Switch>
    </Router>
    </div>
  );
}

export default App;
