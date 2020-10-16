import React, { Component } from 'react';

class Transaction extends Component {
    render() {
        let {vendor,amount,date,category, t_type, id} = this.props.transaction
        let {handleDeleteTransaction, transaction} = this.props
        return (
            <div>
                <br></br>
                {/* Display, vendor, amount, date, category  */}
                <p>Vendor: {vendor}</p>
                {t_type == 'expense'?
                    <p>Amount: -{amount}</p>
                :
                    <p>Amount: +{amount}</p>
                }
                
                <p>Date: {new Date(date).toLocaleDateString()}</p>
                <p>Category: {category}</p>

                <br></br>
                <button onClick={(e)=>{handleDeleteTransaction(e, transaction)}}> Delete </button>
            </div>
        );
    }
}

export default Transaction;
