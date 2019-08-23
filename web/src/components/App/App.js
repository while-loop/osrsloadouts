import React from 'react';
import './App.css';
import {Link} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {TOAST_DELAY} from "../../config/constants";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub} from '@fortawesome/free-brands-svg-icons'


class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Header authenticated={this.props.authenticated}/>

                <div className="Content">
                    {this.props.children}
                </div>

                <Footer/>
                <ToastContainer autoClose={TOAST_DELAY} style={{
                    fontSize: ".5em",
                }}/>
            </div>
        );
    }
}

class Header extends React.Component {
    render() {
        let loadouts = null;
        let account = (<Link to="/login">Log In</Link>);
        if (this.props.authenticated) {
            loadouts = (<span><Link to="/loadouts">Loadouts</Link>&nbsp;-&nbsp;</span>);
            account = (<Link to="/account">My Account</Link>);
        }

        return (
            <div className="Login-box">
                <div style={{float: 'left'}}>
                    <Link to="/">Home</Link>
                    &nbsp;-&nbsp;
                    {loadouts}
                    <Link to="/browse">Browse</Link>
                </div>
                <div style={{float: 'right'}}>
                    {account}
                </div>
            </div>
        )
    }
}

class Footer extends React.Component {
    render() {
        return (
            <div style={{fontSize: '.60em', color: "white"}}>
                <a href="https://github.com/while-loop" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon
                    icon={faGithub}/></a> | {process.env.REACT_APP_VERSION}
            </div>
        )
    }
}


export default App;
