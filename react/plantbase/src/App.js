import Nav from './components/Nav';
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
    </Router>
    </div>
  );
}

export default App;
