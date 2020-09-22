import React, { Component } from 'react';
import {Link} from "react-router-dom"


class Dashboard extends Component {
    render() {
        return (
            <div>
                <Link to="/add-transaction">
                    <button > Add Transaction</button>
                </Link>
            </div>
        );
    }
}

export default Dashboard;