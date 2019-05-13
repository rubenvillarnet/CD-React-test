import React from 'react';
import './App.css';
import Content from './components/Content';
import Login from './components/Login';
import { Switch, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/content" component={Content}/>
      </Switch>
    </div>
  );
}

export default App;
