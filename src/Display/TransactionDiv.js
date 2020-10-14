import React, { Component } from 'react';

class Transaction extends Component {
    render() {
        let {vendor,amount,date,category, t_type} = this.props.transaction
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
            </div>
        );
    }
}

export default Transaction;
