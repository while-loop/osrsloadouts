import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import App from "../components/App/App";
import Home from "../components/Home/Home";
import Loadouts from "../components/Loadouts/Loadouts";
import Loadout from "../components/Loadout/Loadout";

function AppRouter() {
    return (
        <Router>
            <App>
                <div>
                    <Route exact path="/" component={Home}/>

                    <Route path="/account" component={Home}/>

                    <Route path="/u/:id" component={Home}/>

                    <Route exact path="/loadouts" component={Loadouts}/>
                    <Route path="/l/:id" component={Loadout}/>

                    <Route path="/changes" component={Home}/>

                    <Route path="/browse" component={Home}/>
                </div>
            </App>
        </Router>
    )
}

export default AppRouter;
