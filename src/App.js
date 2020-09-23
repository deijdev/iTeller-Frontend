import React, {Component} from 'react';
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



class App extends Component {
  
  constructor(){
    super()
    this.state = {
      currentUser : {id: 1, name: 'Sandra Levy', email: "sl@demo.com", password: "demo"}
    }
  }

  handleAddTransaction = (e, formObj) => {
    e.preventDefault()
    console.log("hit handle transaction", formObj)
      // fetch('http://localhost:3000/transactions',{
      //   method: 'POST',
      //   headers: {'Content-Type':'application-json'},
      //   body: JSON.stringify(formObj)
      // })
      // .then( response => response.json())
      // .then(transactionData => {  
      // })
  }


  render(){
    return ( 
      <Router>
        <Switch> 
          <Route exact path="/" render={ () => <Home/> } />
          <Route exact path="/dashboard" render={ () => <Dashboard/> } />
          <Route exact path="/add-transaction" render={ () => <AddTransaction user={this.currentUser} handleAddTransaction={this.handleAddTransaction}/>} />
        </Switch>
        </Router>
      )
  }

}

export default App;
