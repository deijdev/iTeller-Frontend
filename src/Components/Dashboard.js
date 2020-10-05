import React, { Component } from 'react';
import {Link} from "react-router-dom"
import Transaction from '../Display/TransactionDiv'


class Dashboard extends Component {

    constructor(){
        super()
        this.state = {

            accounts : [],
            selected_account : null,
            transactions: []

        }
    }

    componentDidMount(){

        let id = this.props.user.id
        // fetch the user accounts 
        fetch(`http://localhost:3000/users/${id}`)
        .then(resp => resp.json())
        .then(user => {
            
            let accId = user.accounts[0].id

            this.setState({
                accounts : user.accounts,
                selected_account : user.accounts[0],
            })
            // fetch the selected_account transactions
            fetch(`http://localhost:3000/accounts/${accId}`)
                .then(resp => resp.json())
                .then(account => {
                    this.setState({
                        transactions : account.transactions
                    })
            })
        })
    }

    selectAccount = (e) => {
        

        let account = this.state.accounts.find(account => account.id === e.target.value)

        this.setState({
            selected_account : account
        })

    }

    render() {

        if(this.props.user){
  
                return (
                    <div>
                        <div>
                            <h1>Welcome {this.props.user.name}</h1>
                            <Link to="/add-transaction">
                                <button > Add Transaction</button>
                            </Link>

                        
                        </div>
                        <select onChange={(e)=>this.selectAccount(e)}>
                            {this.state.accounts.map(account => <option key={account.id} value={account.id}>{`${account.name} - ${account.id}`}</option>)}
                        </select>
                    
                        <div>
                            {this.state.selected_account?
                            <>
                            <h3>Account Balance: {this.state.selected_account.balance}</h3>
                            <h3>Transactions</h3>
                                {this.state.transactions? 
                                    this.state.transactions.map(transaction => {

                                        return <Transaction key={transaction.id} transaction={transaction}/> 

                                    })
                                :
                                    <div>No transactions to display</div>
                                }
                            </>
                            :
                            null
                            }

                            
                            
    
                        </div>
                    </div>

                );
        } else {
            return null
        }
    }
}
export default Dashboard