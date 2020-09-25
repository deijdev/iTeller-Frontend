import React, { Component } from 'react';
import {Link} from "react-router-dom"


class Dashboard extends Component {
    render() {

        if(this.props.user){
  
                return (
                    
                    <div>
                        <h1>Welcome {this.props.user.name}</h1>
                        <Link to="/add-transaction">
                            <button > Add Transaction</button>
                        </Link>
                    </div>
                
                );
        } else {
            return null
        }
    }
}
export default Dashboard