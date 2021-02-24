import { Route, Switch } from 'react-router-dom';
import './styles/App.css';

import Nav from "./Components/Nav";
import Home from "./Components/Home";
import Items from "./Components/Items";
import About from "./Components/About"


function App() {

  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/items" component={Items}/>
        <Route path="/about" component={About}/>
      </Switch>
    </div>
  );
}

export default App;
