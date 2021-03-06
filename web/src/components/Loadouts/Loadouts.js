import React from 'react';
import {Link} from "react-router-dom";
import {currentUser} from "../../utils/base";
import LoadoutTable from "../../utils/LoadoutTable/LoadoutTable";
import LoadoutStore from "../../store/LoadoutStore";
import moment from "moment";
import Humanize from "humanize-plus";
import RSButton from "../../utils/widgets/RSButton/RSButton";

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
            id: "favorites",
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
                    <RSButton width={"auto"} height={40}>
                        New Loadout
                    </RSButton>
                </Link>
                <div style={{paddingBottom: 30}}/>
                <LoadoutTable title={"My Loadouts"} fetchFunc={this.fetchFunc} history={this.props.history}
                              cols={Loadouts.COLS}/>
            </div>
        );
    }
}

export default Loadouts;


