import React from 'react';
import "react-table/react-table.css";
import LoadoutTable from "../../utils/LoadoutTable/LoadoutTable";
import LoadoutStore from "../../store/LoadoutStore";

class Browse extends React.Component {

    render() {
        return (
            <LoadoutTable title={"Community Loadouts"} fetchFunc={LoadoutStore.browseLoadouts} history={this.props.history}/>
        );
    }
}

export default Browse;
