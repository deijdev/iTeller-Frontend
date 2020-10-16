import React, { Component } from 'react';
import {Link} from "react-router-dom"
import Transaction from '../Display/TransactionDiv'


class Dashboard extends Component {
   
    render() {
        let {user, handleSelectAccount, balance, selectedAccount, accounts, transactions, date, expensesSum} = this.props
        
        if(user){
                return (
                    <div>
                        <div>
                            <h1>Welcome {user.name}</h1>
                            <Link to="/add-transaction">
                                <button > Add Transaction</button>
                            </Link>  
                        </div>
                        <select onChange={(e)=> handleSelectAccount(e)}>
                            {accounts.map(account => <option key={account.id} value={account.id}>{`${account.name} - ${account.id}`}</option>)}
                        </select>
                    
                        <div>
                            {selectedAccount?
                            <>
                            <h3>Account Balance: {balance}</h3>
                            <h3>{date.month} Expenses: -{expensesSum}</h3>
                            <br></br>
                            <h3>{date.month}'s Transactions</h3>
                            
                                {transactions.length > 0? 
                                
                                    transactions.map(transaction => {

                                        return <Transaction key={transaction.id} handleDeleteTransaction={this.props.handleDeleteTransaction} transaction={transaction}/> 

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