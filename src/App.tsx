import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Search from "./components/search";
import "./App.css";
import Product from "./components/product";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Search />
          </Route>
          <Route path="/:id">
            <Product />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
