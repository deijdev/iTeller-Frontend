import React, {Component} from 'react';
import Dashboard from './Components/Dashboard.js'
import AddTransaction from './Components/AddTransaction.js'
import Home from './Components/Home'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, 
  Redirect
} from "react-router-dom";



class App extends Component {
  
  constructor(){
    super()
    this.state = {
      users : [],
      currentUser : null
    }
  }


  componentDidMount(){

    fetch('http://localhost:3000/users')
    .then(resp => resp.json())
    .then(usersArray => {
  
      this.setState({
        users : usersArray
      })
    })

////////

    if(localStorage.getItem("token") != null ){
      fetch('http://localhost:3000/decode_token', {
        headers : {"Authenticate": localStorage.token, 
        'Content-Type':'application/json'}
      })
      .then(resp => resp.json())
      .then(userData => {
        this.setState({currentUser : userData})
      })
    }

  }

  ///////Methods///////

  //add a transaction//
  handleAddTransaction = (e, formObj) => {
    e.preventDefault()
    console.log("hit handle transaction", formObj)
      fetch('http://localhost:3000/transactions',{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(formObj)
      })
      .then( response => response.json())
      // .then(transactionData => {  
      // })
  }

  //login/logout//

  login=(e, creds)=>{
    e.preventDefault()
  
    fetch('http://localhost:3000/login', {
      method : 'POST',
      headers : {'Content-Type':'application/json',
      "Authenticate": localStorage.token},
      body : JSON.stringify(creds)
    })
    .then(resp => resp.json())
    .then(data => {
      if (data.error){
        this.setState({errorMessage: data.error})
      }else{
      localStorage.setItem("token", data.token)
      this.setState({currentUser : data.user_data.user})
      }
    })
  }

  ////////////////

  render(){
    const {currentUser} = this.state
    return ( 
      <Router>
        <Switch> 
          <Route exact path="/" render={ () => {
            return currentUser? <Redirect to="/dashboard" /> : <Home login={this.login}/>
            } 
          }/>
          <Route exact path="/dashboard" render={ () => {
            return currentUser? <Dashboard user={currentUser}/> : <Redirect to='/'/>
          } }/>
          <Route exact path="/add-transaction" render={ () => <AddTransaction user={this.state.currentUser} handleAddTransaction={this.handleAddTransaction}/>} />

        </Switch>
        </Router>
      )
  }

}

export default App;
