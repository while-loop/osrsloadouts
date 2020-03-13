import React from 'react';
import UserStore from "../../store/UserStore";
import _ from "lodash";
import app, {currentUser, refreshToken} from "../../utils/base";
import {toast} from "react-toastify";
import {TOAST_DELAY} from "../../config/constants";
import queryString from 'query-string'

class Account extends React.Component {
    toastId = null;

    state = {
        user: {
            rsn: "",
            username: ""
        },
    };

    logOut(e) {
        app.auth().signOut();
    }

    updateUser = (e) => {
        this.toastId = toast("Updating account...", {autoClose: false});
        UserStore.update(currentUser().uid, this.state.user).then(r => {
            this.setState({user: r.data});
            this.close("Updated ✔");
            refreshToken(true);
        }).catch(reason => {
            console.log("failed to update user", reason);
            if (reason.response != null && reason.response.status === 409) {
                this.close("Username already taken", toast.TYPE.ERROR);
                return
            }

            this.close("Failed to update account: " + reason.toString(), toast.TYPE.ERROR);
        })
    };

    close = (msg, type = toast.TYPE.INFO) => {
        toast.update(this.toastId, {render: msg, type: type, autoClose: TOAST_DELAY});
    };

    componentDidMount() {
        UserStore.get(currentUser().uid).then(r => {
            this.setState({user: r.data});
            if (queryString.parse(this.props.location.search).success != null) {
                this.props.history.push(`/loadouts`);
            }
        }).catch(reason => {
            let resp = reason.response;
            console.log("couldn't get user info:", reason);

            if (resp != null && resp.status === 404) {
                this.toastId = toast("Creating account...", {autoClose: false});
                console.log("user not found, creating...");

                UserStore.create({
                    id: currentUser().uid,
                }).then(r => {
                    this.setState({user: r.data});
                    this.close("Account created ✔");
                    refreshToken(true);
                }).catch(reason => {
                    console.log("failed to create new user", reason);
                    this.close("Failed to create account: " + reason.toString(), toast.TYPE.ERROR);
                });

                return;
            }

            toast.error("Failed to get account info: " + reason.toString());
        })
    }

    setData = (field) => {
        let thiss = this;
        return function (e) {
            let user = _.cloneDeep(thiss.state.user);
            user[field] = e.target.value;
            thiss.setState({user});
        }
    };

    render() {
        return (
            <div>
                <h4>My Account</h4>
                <button onClick={this.logOut}>Log out</button>
                <br/>

                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "start"
                }}>
                    <label>
                        Username: <input value={this.state.user.username} onChange={this.setData("username")}/>
                    </label>
                    <label>
                        Rsn: <input value={this.state.user.rsn} onChange={this.setData("rsn")}/>
                    </label>
                </div>
                <button onClick={this.updateUser}>Update</button>
            </div>
        );
    }

}

export default Account;
