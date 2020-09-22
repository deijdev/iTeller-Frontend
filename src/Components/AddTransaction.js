import React, { Component } from 'react';
import "../css/add-transaction.css"

class AddTransaction extends Component {
    render() {
        return (
            <div id="add-transaction-container">
               <h1>Add Transaction</h1>
               <form>
                    <div>
                        <label htmlFor="Amount">Amount</label>
                        <input type="text" value='' name="amount"/>
                    </div>

                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" value='' name="name"/>
                    </div>
                    
                    <br/>
                        
                    
                    <label htmlFor="category">Category</label>
                    <br/>

                    <div id="transaction-categories">
                        <div id="groceries">Groceries</div>
                        <div id="education">Education</div>
                        <div id="entertainment">Entertainment</div>
                        <div id="gas">Gas & Fuel</div>
                        <div id="shopping">Shopping</div>
                        <div id="bills">Bills</div>
                        <div id="health">Health</div>
                        <div id="restaurants">Restaurants</div>
                        <div id="Income">Income</div>
                    </div>
                    

                    <br/>

                    <label htmlFor="Type">Type</label>
                    <div>
                        <div id="income">Income</div>
                        <div id="expense">Expense</div>
                    </div>

                    <div>
                        <label htmlFor="Vendor">Vendor</label>
                        <input type="text" value='' name="vendor"/>
                    </div>
                    
                    <input type="submit" value="Add"/>
               </form>
            </div>
        );
    }
}

export default AddTransaction;