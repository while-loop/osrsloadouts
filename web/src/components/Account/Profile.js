import React from 'react';
import UserStore from "../../store/UserStore";
import {toast} from "react-toastify";
import {dateString} from "../../utils/js";
import LoadoutTable from "../../utils/LoadoutTable";
import LoadoutStore from "../../store/LoadoutStore";
import Loadouts from "../Loadouts/Loadouts";

class Profile extends React.Component {
    toastId = null;

    constructor(props) {
        super(props);
        this.state = {
            username: props.match.params.username,
            user: {
                username: 'Loading...',
                rsn: '',
                id: '',
                created: null
            }
        };
        this.fetchFunc = (page, size, sort, filter) => {
            return LoadoutStore.getLoadoutsByUid(this.state.user.id, page, size, sort, filter)
        }
    }

    componentDidMount() {
        UserStore.getByUsername(this.state.username).then(r => {
            this.setState({user: r.data});
        }).catch(reason => {
            console.log("failed to get user", reason);
            toast.error("Failed to get user: " + reason.toString());
        })
    }

    render() {
        const hasUser = (this.state.user.id != null && this.state.user.id !== '')
        return (
            <div>
                <h1>{this.state.user.username}</h1>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "start",
                }}>
                    <label>
                        Rsn: <span>{this.state.user.rsn}</span>
                    </label>
                    <label>
                        Joined: <span>{dateString(this.state.user.created)}</span>
                    </label>
                </div>

                {hasUser && <LoadoutTable title={this.state.title} fetchFunc={this.fetchFunc} history={this.props.history} cols={Loadouts.COLS}/>}
                {!hasUser && <LoadoutTable title={this.state.title} fetchFunc={null} history={this.props.history} cols={Loadouts.COLS}/>}
            </div>
        );
    }
}

export default Profile;
