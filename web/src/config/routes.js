import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import App from "../components/App/App";
import Home from "../components/Home/Home";
import Loadouts from "../components/Loadouts/Loadouts";
import Loadout from "../components/Loadout/Loadout";
import Browse from "../components/Browse/Browse";
import PrivateRoute from "../utils/PrivateRoute";
import app, {refreshToken} from "../utils/base"
import Login from "../components/Login/Login";
import Account from "../components/Account/Account";
import Profile from "../components/Account/Profile";
import Contact from "../components/Contact/Contact";

class AppRouter extends React.Component {
    state = {
        loading: true,
        authenticated: false,
        user: null
    };

    componentWillMount() {
        app.auth().onAuthStateChanged(user => {
            if (user) {
                refreshToken();
                this.setState({
                    authenticated: true,
                    currentUser: user,
                    loading: false
                });
            } else {
                this.setState({
                    authenticated: false,
                    currentUser: null,
                    loading: false
                });
            }
        });
    }

    render() {
        const {authenticated, loading} = this.state;

        if (loading) {
            return <p>Loading..</p>;
        }

        return (
            <Router>
                <App authenticated={authenticated}>
                    <div>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/contact" component={Contact}/>

                        <Route exact path="/login" component={Login}/>
                        <PrivateRoute exact path="/account" component={Account} authenticated={authenticated}/>

                        <Route exact path="/u/:username" component={Profile}/>

                        <PrivateRoute exact path="/loadouts" component={Loadouts} authenticated={authenticated}/>
                        <Route exact path="/l/:id" component={Loadout}/>
                        <Route exact path="/loadouts/new" component={Loadout}/>

                        <Route exact path="/changes" component={Home}/>

                        <Route exact path="/browse" component={Browse}/>
                    </div>
                </App>
            </Router>
        )
    }
}

export default AppRouter;
