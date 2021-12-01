import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
// voy a importar todos los componentes para poner en mis rutas

// <React.Fragment /> ó <> ??

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
      
      <Route exact path='/' component= {LandingPage} />
      <Route path='/home' component= {Home} />
      
      </Switch>

      
    </div>
    </BrowserRouter>
  );
}

export default App;
