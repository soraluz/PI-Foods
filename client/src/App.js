import { Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home.jsx';
import Inicio from './components/Inicio.jsx';
import Detail_Recipe from './components/Detail_Recipe.jsx';
import Form_Recipe from './components/Form_Recipe.jsx';
import Nav from './components/Nav.jsx';
import Error from './components/Error';

function App() {
  return <div className="App">
      <Route exact path='/'>
        <Inicio />
      </Route>
      <Route path="/home">
        <Nav />
        <Home />
      </Route>
      <Route path="/recipes/create" component={Form_Recipe} />
      
      <Route path="/recipe/:id" component={Detail_Recipe} />
      
      <Route path="/error">
        <Error />
      </Route>
 </div>
}

export default App;
