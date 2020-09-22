import React from 'react';
import Dashboard from './Components/Dashboard.js'
import AddTransaction from './Components/AddTransaction.js'
import Home from './Components/Home'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  return ( 
    <Router>
      <Switch> 
        <Route exact path="/" component={Home} />
        <Route exact path="/dashboard" component={Dashboard}/>
        <Route exact path="/add-transaction" component={AddTransaction}/>
     
      </Switch>
    </Router>
  )

}

export default App;
