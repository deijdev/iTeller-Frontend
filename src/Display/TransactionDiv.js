import React, { Component } from 'react';

class Transaction extends Component {
    render() {
        let {vendor,amount,date,category} = this.props.transaction
        return (
            <div>
                {/* Display, vendor, amount, date, category  */}
                <h1>{vendor}</h1>
                <h2>{amount}</h2>
                <p>{new Date(date).toLocaleDateString()}</p>
                <p>{category}</p>
            </div>
        );
    }
}

export default Transaction;
