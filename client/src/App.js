import { Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home.jsx';
import Inicio from './components/Inicio.jsx';
import Detail_Recipe from './components/Detail_Recipe.jsx';
import Form_Recipe from './components/Form_Recipe.jsx';
import Nav from './components/Nav';

function App() {
  return <div className="App">
      <Route exact path='/'>
        <Inicio />
      </Route>
      <Route path='/:x'>
      <Nav />
      </Route>
      
      <Route path="/home">
        <Home />
      </Route>
      <Route path="/recipes/:id">
        <Detail_Recipe />
      </Route>
      <Route path="/recipes/create">
        <Form_Recipe />
      </Route>
    </div>
}

export default App;
