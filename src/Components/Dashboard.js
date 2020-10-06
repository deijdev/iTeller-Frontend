import React, { Component } from 'react';
import {Link} from "react-router-dom"
import Transaction from '../Display/TransactionDiv'


class Dashboard extends Component {
   
    render() {
        let {user, handleSelectAccount, selectedAccount, accounts, transactions} = this.props
        
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
                            <h3>Account Balance: {selectedAccount.balance}</h3>
                            <br></br>
                            <h3>Transactions</h3>
                                {transactions? 
                                    transactions.map(transaction => {

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