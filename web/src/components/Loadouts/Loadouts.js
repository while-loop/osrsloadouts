import React from 'react';
import {Link} from "react-router-dom";
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {currentUser} from "../../utils/base";
import LoadoutTable from "../../utils/LoadoutTable";
import LoadoutStore from "../../store/LoadoutStore";
import moment from "moment";
import {normalizeNumber} from "../../utils/js";
import Humanize from "humanize-plus";

class Loadouts extends React.Component {
    static COLS = [
        {
            Header: "Title",
            accessor: "title",
            width: 360,
        },
        {
            Header: "Created",
            id: "created",
            width: 100,
            accessor: d => moment(d.created).format('MMM D YYYY'),
        },
        {
            Header: "Updated",
            id: "updated",
            width: 100,
            accessor: d => moment(d.updated).format('MMM D YYYY'),
        },
        {
            Header: "Views",
            id: "views",
            accessor: d => Humanize.compactInteger(d.views, 1),
            width: 50,
        },
        {
            Header: "Favs",
            id: "favs",
            accessor: d => Humanize.compactInteger(d.favorites, 1),
            width: 50.
        }
    ]

    constructor(props) {
        super(props);
        this.fetchFunc = (page, size, sort, filter) => {
            return LoadoutStore.getLoadoutsByUid(currentUser().uid, page, size, sort, filter)
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
                <LoadoutTable title={"My Loadouts"} fetchFunc={this.fetchFunc} history={this.props.history} cols={Loadouts.COLS}/>
            </div>
        );
    }
}

export default Loadouts;


