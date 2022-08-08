import { Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home.jsx';
import Inicio from './components/Inicio.jsx';
import Detail_Recipe from './components/Detail_Recipe.jsx';
import Form_Recipe from './components/Form_Recipe.jsx';

function App() {
  return <div className="App">
      <Route exact path='/'>
        <Inicio />
      </Route>
      <Route path="/Home">
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
