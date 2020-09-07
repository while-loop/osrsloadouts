import React from 'react';
import {Link} from "react-router-dom";
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import UserStore from "../../store/UserStore";
import {currentUser} from "../../utils/base";
import LoadoutTable from "../../utils/LoadoutTable";

class Loadouts extends React.Component {

    constructor(props) {
        super(props);
        this.fetchFunc = (page, size, sort, filter) => {
            return UserStore.getLoadoutsByUid(currentUser().uid, page, size, sort, filter)
        }
    }

    render() {
        return (
            <div>
                <Link style={{float: "right"}} to="/loadouts/new">
                    <button type="button">
                        New Loadout <FontAwesomeIcon icon={faPlus}/>
                    </button>
                </Link>
                <br/>
                <LoadoutTable title={"My Loadouts"} fetchFunc={this.fetchFunc} history={this.props.history}/>
            </div>
        );
    }
}

export default Loadouts;


