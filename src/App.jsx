import React from 'react';
import './styles/main.scss'
import Content from './components/Content';
import Login from './components/Login';
import { Switch, Route } from 'react-router-dom';
import SnackbarBottom from './components/SnackbarBottom';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/content" component={Content}/>
      </Switch>
      <SnackbarBottom/>
    </div>
  );
}

export default App;
