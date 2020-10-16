import React, { Component } from 'react';
import "../css/add-transaction.css"


class AddTransaction extends Component {

    constructor(){
        super()
        this.state={
            formObj : {
                account_id: '',
                amount : '',
                name : '',
                category : '',
                vendor : '',
                note : '',
                t_type: ''

            }
        }
    }

    componentDidMount(){
            this.setState({
                formObj : {...this.state.formObj, user_id : this.props.user.id}
            })
    }

    handleFormTextInput = (e) => {
        this.setState({
            formObj: {...this.state.formObj, [e.target.name] : e.target.value, account_id : this.props.selectedAccount.id},
        })
    }

    handleCategory = (e) => {
        let category = e.target.id
        
        const categoryDivs = Array.from(document.getElementById("transaction-categories").children)
        categoryDivs.forEach( cat => {
            if(cat.id === category){
                cat.style.backgroundColor = 'red'
                this.setState({
                    formObj: {...this.state.formObj, category : cat.id}
                })
            } else {
                cat.style.backgroundColor = '#f2f2f2'
            }
        }) 
    }

    handleType = (e) => {
        let type = e.target.id
        
        const transTypeDivs = Array.from(document.getElementById("transaction-type").children)
        transTypeDivs.forEach( t_type => {
            if(t_type.id === type){
                t_type.style.backgroundColor = 'red'
                this.setState({
                    formObj: {...this.state.formObj, t_type : t_type.id}
                })
            } else {
                t_type.style.backgroundColor = '#f2f2f2'
            }
        }) 
    }
    
    render() {
        let {handleAddTransaction, handleAccountBalance} = this.props


        return (
            <div id="add-transaction-container">
               <h1>Add Transaction</h1>
               <div id="form-error">    
               {this.props.errorMessage ? 
                <h3>{this.props.errorMessage}</h3>
                :
                null
               }
               </div>
               <form onSubmit={(e) => {
                   handleAddTransaction(e, this.state.formObj)
                   handleAccountBalance(e, this.props.selectedAccount, this.state.formObj.amount, this.state.formObj.t_type)
                }}>
                    <div>
                        <label htmlFor="amount">Amount</label>
                        <br/>
                        <input type="text" value={this.state.formObj.amount} name="amount" onChange={(e)=>this.handleFormTextInput(e)}/>
                    </div>
                        <br/>
                    <div>
                        <label htmlFor="name">Name</label>
                        <br/>
                        <input type="text" value={this.state.formObj.name} name="name" onChange={(e)=>this.handleFormTextInput(e)}/>
                    </div>
                    
                    <br/>
                 
                    <label htmlFor="category">Category</label>
                    <br/>

                    <div id="transaction-categories">
                        <div id="groceries" onClick={this.handleCategory}>Groceries</div>
                        <div id="education" onClick={this.handleCategory}>Education</div>
                        <div id="entertainment" onClick={this.handleCategory}>Entertainment</div>
                        <div id="gas" onClick={this.handleCategory}>Gas & Fuel</div>
                        <div id="shopping"onClick={this.handleCategory}>Shopping</div>
                        <div id="bills" onClick={this.handleCategory}>Bills</div>
                        <div id="health"onClick={this.handleCategory}>Health</div>
                        <div id="restaurants" onClick={this.handleCategory}>Restaurants</div>
                        <div id="Income" onClick={this.handleCategory}>Income</div>
                    </div>
                    
                    <br/>

                    <label htmlFor="type">Type</label>
                    <div id="transaction-type">
                        <div id="income" onClick={this.handleType}>Income</div>
                        <div id="expense" onClick={this.handleType}>Expense</div>
                    </div>

                    <div id="transaction-vendor"> 
                        <label htmlFor="vendor">Vendor</label>
                        <br/>
                        <input type="text" value={this.state.formObj.vendor} name="vendor" onChange={(e)=>this.handleFormTextInput(e)}/>
                    </div>

                    <div id="transaction-note"> 
                        <label htmlFor="note">Note</label>
                        <br/>
                        <textarea value={this.state.formObj.note} name="note" onChange={(e)=>this.handleFormTextInput(e)}/>
                    </div>
                    
                    <input type="submit" value="Add"/>

               </form>
            </div>
        );
    }
}

export default AddTransaction;