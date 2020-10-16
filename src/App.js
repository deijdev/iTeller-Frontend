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
      errorMessage : null,
      date : {},
      monthsTransactions: [],
      expensesSum : null,
      balance : null
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
          this.setState({
          currentUser : userData,
          selectedAccount : userData.accounts[0],
          balance : userData.accounts[0].balance
          })
        // fetch user accounts
          this.fetchAccountsFromUser(userData.id)

        this.fetchAccountTransactions(userData.accounts[0].id)
          // //set date to variable
          let date = new Date()
          // Set current Date
          this.setState({
            date : {
              month: this.getMonthFromDate(date.getMonth()),
              day: date.getDate(),
              year: date.getFullYear(),
              dow: this.getDayOfWeek(date.getDay())
            }        
        })
      })
    }
  }

  ///////Methods///////

  //sort transactions for Dashboard component//
  sortedTransactions = (transactions) => {
        // find all the transactions from 'Transactions' where state.date.month is === to transaction.date.getMonth
        let monthsTransactions = transactions.filter(tran => this.getMonthFromDate(new Date(tran.date).getMonth()) === this.state.date.month)

        this.setState({
          monthsTransactions : monthsTransactions.sort((a,b)=> new Date(b.date) - new Date(a.date))
        })
   }

  getMonthFromDate = monthNum => {
    let months = ['January','February','March','April','May','June','July','August','September','October','November','December']
    return months[monthNum]
  }
  getDayOfWeek = dayNum => {
    let days = ['Monday','Tuesday','Wednesday','Thursday', 'Friday', 'Saturday','Sunday']
    return days[dayNum - 1]
  }

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
        selectedAccount : account,
        balance : account.balance
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
        this.sortedTransactions(account.transactions)
        this.sumExpenses()
    })  
  
}


  //add a transaction//
  handleAddTransaction = (e, formObj) => {
    e.preventDefault()
 
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
          // // redirect to dashboard after everything is successful
          // window.location.assign("/dashboard");
          // return false;
        }
      }) 
  }

  //handle account balance//**** */
  handleAccountBalance=(e, selectedAccount, amount, t_type)=>{
    e.preventDefault()
    let newBalance
    
    t_type === 'expense' ? newBalance = selectedAccount.balance - parseInt(amount) : newBalance = selectedAccount.balance + parseInt(amount)
    const accObj = {
      balance : newBalance
    }
    
    fetch(`http://localhost:3000/accounts/${selectedAccount.id}`,{
      method : 'PATCH',
      headers : {'Content-Type': 'application/json'},
      body : JSON.stringify(accObj)
    })
    .then(resp => resp.json())
    .then(accData => {
        this.setState({
          balance: accData.balance
        })
    })
        // redirect to dashboard after everything is successful
        window.location.assign("/dashboard");
        return false;
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

      //new date to be used below
      let date = new Date()

      this.setState({

          currentUser : data.user_data.user,
          // default account's balance
          balance : data.user_data.user.accounts[0].balance,
          //default account display
          selectedAccount : data.user_data.user.accounts[0],
          //display Month
          date : {
            month: this.getMonthFromDate(date.getMonth()),
            day: date.getDate(),
            year: date.getFullYear(),
            dow: this.getDayOfWeek(date.getDay())
          }        
        })
        this.fetchAccountsFromUser(data.user_data.user.id)
      }
    })
  }

sumExpenses=()=>{
  let expenses = this.state.monthsTransactions.filter(t => t.t_type == 'expense')
  
  var expensesSum = expenses.reduce((accumulator, expense)=>{
   return accumulator + expense.amount
  }, 0)
  
  this.setState({
    expensesSum : expensesSum
  })
}

///
handleDeleteTransaction = (e, transaction) => {

  fetch(`http://localhost:3000/transactions/${transaction.id}`, {
    method : 'DELETE',
    headers : {'Content-Type': 'application/json'}
  })

    let newTransactions = this.state.monthsTransactions.filter(trans =>  trans.id !== transaction.id)

 if(transaction.t_type == 'expense'){
      this.setState({
        monthsTransactions : newTransactions,
        balance : this.state.balance + transaction.amount
      })
  }else{
    this.setState({
      monthsTransactions : newTransactions,
      balance : this.state.balance - transaction.amount
    })
  }
}


  ////////////////

  render(){
    const {handleAccountBalance, handleDeleteTransaction} = this
    const {balance, date, errorMessage, currentUser, accounts, monthsTransactions, selectedAccount, expensesSum} = this.state
    return ( 
      <Router>
        <Switch> 
          <Route exact path="/" render={ () => {
            return currentUser? <Redirect to="/dashboard" /> : <Home login={this.login}/>
          }}/>
          <Route exact path="/dashboard" render={ () => {
            return currentUser? <Dashboard balance={balance} handleDeleteTransaction={handleDeleteTransaction} expensesSum={expensesSum}  date={date} user={currentUser} accounts={accounts}  handleSelectAccount={this.handleSelectAccount} transactions={monthsTransactions} selectedAccount={selectedAccount}/> : <Redirect to='/'/>
          }}/>
          <Route exact path="/add-transaction" render={ () => {
            return currentUser? <AddTransaction handleAccountBalance={handleAccountBalance} errorMessage={errorMessage} user={currentUser} handleAddTransaction={this.handleAddTransaction} selectedAccount={selectedAccount} /> : null
          }}/>

        </Switch>
        </Router>
      )
  }

}

export default App;
