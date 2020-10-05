import React, { Component } from 'react';
// import {Link} from 'react-router-dom'
import "../css/log-in-sign-up.css"

class Home extends Component {
    constructor(){
        super()
        this.state={
            test: '',
            loginObj : {
                email : '',
                password : ''   
            }
        }
    }

    handleLoginCreds = (e) => {
        this.setState({
            loginObj: {...this.state.loginObj, [e.target.name] : e.target.value}
        })
    }
    

    render() {
        let {email, password} = this.state.loginObj
        return (
            <div id="login-sign-up-container">
                <h1>Login</h1>
                <form id="login" onSubmit={(e)=>this.props.login(e, this.state.loginObj)}>
                    <input type="text" placeholder="E-mail" name="email" value={email} onChange={(e)=>this.handleLoginCreds(e)}/>
                    <input type="password" placeholder="Password" name="password" value={password} onChange={(e) => this.handleLoginCreds(e)}/>
                    <input type="submit" value="Sign In"/>
                </form>
            </div>
        );
    }
}

export default Home;


