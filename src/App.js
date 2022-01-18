import { Route, Switch } from 'react-router-dom';
import './styles/App.css';

import Nav from "./Components/Nav";
import Home from "./Components/Home";
import Items from "./Components/Items";
import About from "./Components/About";
import useBlurUp from './Hooks/useBlurUp';

import background01 from "./assets/background01.png";
import background0 from "./assets/background0.png";
import background1 from "./assets/background1.png";
import background3 from "./assets/background3.png";


function App() {

  const [ src ] = useBlurUp([background01, background0, background1, background3])

  return (
    <div className="App" style={{backgroundImage: `url(${src})`, backgroundSize: 'cover'}}>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/items" component={Items} />
        <Route path="/about" component={About} />
      </Switch>
    </div>
  );
}

export default App;
