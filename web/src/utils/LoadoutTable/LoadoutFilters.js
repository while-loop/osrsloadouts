import React from "react";
import PropTypes from "prop-types";
import RSPopup from "../widgets/RSPopup/RSPopup";
import "./LoadoutTable.css"

class LoadoutFilters extends React.Component {

    constructor(props) {
        super(props);
        this.state = props.filters;
    }

    onClose = (e) => {
        this.props.onChange(this.state)
    }

    getBoolVal = (strVal) => {
        let val = undefined
        switch (strVal) {
            case "true":
                val = true
                break
            case "false":
                val = false
                break
        }

        return val
    }

    setFaved = (e) => {
        this.setState({favorited: this.getBoolVal(e.target.value)})
    }

    setViewed = (e) => {
        this.setState({viewed: this.getBoolVal(e.target.value)})
    }

    setCopied = (e) => {
        this.setState({copied: this.getBoolVal(e.target.value)})
    }

    render() {
        return (
            <RSPopup
                title={"Loadout Filters"}
                onClose={this.onClose}
                padding={"0 0 0 0"}
                header={{padding: "13px 0 0 0"}}
                closeable>
                <div className="Filters-container">

                    <div className="Filters-filter">
                        <span>
                            Favorited
                        </span>
                        <select value={this.state.favorited} onChange={this.setFaved}>
                            <option value={undefined}>Any</option>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                    </div>

                    <div className="Filters-filter">
                        <span>
                            Viewed
                        </span>
                        <select value={this.state.viewed} onChange={this.setViewed}>
                            <option value={undefined}>Any</option>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                    </div>

                    <div className="Filters-filter">
                        <span>
                            Copied
                        </span>
                        <select value={this.state.copied} onChange={this.setCopied}>
                            <option value={undefined}>Any</option>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                    </div>

                </div>
            </RSPopup>
        );
    }
}

LoadoutFilters.propTypes = {
    onChange: PropTypes.func.isRequired,
    filters: PropTypes.object.isRequired,
};

export default LoadoutFilters;