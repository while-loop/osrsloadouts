import React from 'react';
import './App.css';
import {Link} from "react-router-dom";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <div className="Login-box">
                    <div style={{float: 'left'}}>
                        <Link to="/">Home</Link>
                        &nbsp;-&nbsp;
                        <Link to="/loadouts">Loadouts</Link>
                        &nbsp;-&nbsp;
                        <Link to="/browse">Browse</Link>
                    </div>
                    <div style={{float: 'right'}}>
                        <Link to="/account">My Account</Link>
                    </div>
                </div>

                <div className="Content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}


export default App;
