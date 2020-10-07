import React, {Component} from 'react';
import Dashboard from './Components/Dashboard.js'
import AddTransaction from './Components/AddTransaction.js'
import Home from './Components/Home'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";



class App extends Component {
  
  constructor(){
    super()
    this.state = {
      currentUser : null,
      accounts : [],
      selectedAccount: null,
      transactions: [],
      errorMessage : null
    }
  }

  componentDidMount(){

////////

    if(localStorage.getItem("token") != null ){
      fetch('http://localhost:3000/decode_token', {
        headers : {"Authenticate": localStorage.token, 
        'Content-Type':'application/json'}
      })
      .then(resp => resp.json())
      .then(userData => {
        this.setState({currentUser : userData})
        // fetch user accounts
        this.fetchAccountsFromUser(userData.id)
      })
    }
   
  }

  ///////Methods///////
  fetchAccountsFromUser = (id) => {
    // fetch the user accounts 
    fetch(`http://localhost:3000/users/${id}`)
    .then(resp => resp.json())
    .then(user => {
        // set initial state for accounts and selectedAccount
        this.setState({
            accounts : user.accounts,
            selectedAccount : user.accounts[0]
            
        })
        this.fetchAccountTransactions(user.accounts[0].id)
    })
  }

  //select account to display//
  handleSelectAccount = (e) => {

    let account = this.state.accounts.find(account => account.id == e.target.value)
    this.setState({
        selectedAccount : account
    })

    // fetch the transactions for the selected account
    this.fetchAccountTransactions(account.id)
    // set the selected account in app.js

 }


  //fetch account transactions//

  fetchAccountTransactions = (id) => {
    fetch(`http://localhost:3000/accounts/${id}`)
    .then(resp => resp.json())
    .then(account => {
        this.setState({
            transactions : account.transactions
        })
    })
}


  //add a transaction//
  handleAddTransaction = (e, formObj) => {
    e.preventDefault()
    console.log(formObj)
      fetch('http://localhost:3000/transactions',{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(formObj)
      })
      .then( response => response.json())
      .then(transactionData => { 
        if (transactionData.error) {
            this.setState({
              errorMessage : transactionData.error
            })
        }else{
          this.setState({
            transactions : this.state.transactions.push(transactionData)
          })
          // redirect to dashboard after everything is successful
          window.location.assign("/dashboard");
          return false;
        }
      })
    
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
    const {errorMessage, currentUser, accounts, transactions, selectedAccount} = this.state
    return ( 
      <Router>
        <Switch> 
          <Route exact path="/" render={ () => {
            return currentUser? <Redirect to="/dashboard" /> : <Home login={this.login}/>
          }}/>
          <Route exact path="/dashboard" render={ () => {
            return currentUser? <Dashboard user={currentUser} accounts={accounts}  handleSelectAccount={this.handleSelectAccount} transactions={transactions} selectedAccount={selectedAccount}/> : <Redirect to='/'/>
          }}/>
          <Route exact path="/add-transaction" render={ () => {
            return currentUser? <AddTransaction errorMessage={errorMessage} user={currentUser} handleAddTransaction={this.handleAddTransaction} selectedAccount={selectedAccount} /> : null
          }}/>

        </Switch>
        </Router>
      )
  }

}

export default App;
