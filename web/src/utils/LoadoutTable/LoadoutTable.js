import React from "react";
import ReactTable from "react-table";
import moment from "moment";
import PropTypes from "prop-types";
import {getSort} from "../js";
import {toast} from "react-toastify";
import Humanize from "humanize-plus";
import _ from "lodash";
import RSButton from "../widgets/RSButton/RSButton";
import Menu from "../../components/Loadout/Menu";
import QuantityPopup from "../../components/Loadout/QuantityPopup";
import RSPopup from "../widgets/RSPopup/RSPopup";
import LoadoutFilters from "./LoadoutFilters";

class LoadoutTable extends React.Component {

    static DEFAULT_COLS = [{
        Header: "Title",
        accessor: "title",
        width: 250,
    },
        {
            Header: "Author",
            accessor: "author.username",
        },
        {
            Header: "Created",
            id: "created",
            width: 90,
            accessor: d => moment(d.created).format('MMM D YYYY'),
        },
        {
            Header: "Updated",
            id: "updated",
            width: 90,
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
            width: 50,
        }
    ]

    constructor(props) {
        super(props);
        this.searchTimeout = null;
        this.tableRef = React.createRef();
        this.state = {
            data: [],
            pages: null,
            loading: false,
            filters: {
                favorited: undefined,
                viewed: undefined,
            },
            searchValue: "",
            showFilters: false,
            defaultSorted: [{id: "updated", desc: true}]
        };

        if (this.props.history.location.state != null) {
            this.state = this.props.history.location.state
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (_.isEqual(this.state, this.props.history.location.state)) {
            return false
        }

        return true
    }

    fetchData = (state, instance) => {
        if (this.props.fetchFunc == null) {
            return
        }

        const filters = {
            ...this.state.filters,
            search: this.state.searchValue
        }

        this.props.fetchFunc(state.page, state.pageSize, getSort(state.sorted), filters).then(r => {
            this.setState({
                data: r.data.loadouts || [],
                pages: Math.ceil(r.data.total / r.data.limit),
                defaultSorted: state.sorted,
            })
        }).catch(reason => {
            console.log("failed to get loadouts", reason, reason.response);
            toast.error("Failed to get loadouts: " + reason.toString());
        }).finally(() => {
        })
    };

    forceFetch = () => {
        this.fetchData(this.tableRef.current.state, this.tableRef.current)
        this.searchTimeout = null
    }

    onSearchValue = (event) => {
        if (this.searchTimeout != null) {
            clearTimeout(this.searchTimeout)
        }
        const val = event.target.value
        this.setState({searchValue: val})

        if (this.tableRef.current != null) {
            this.searchTimeout = setTimeout(this.forceFetch, 500)
        }
    }

    onFiltersChanged = (filters) => {
        this.setState({showFilters: false, filters: filters}, this.forceFetch)
    }

    showFilters = (e) => {
        this.setState({showFilters: true})
    }

    render() {
        const {data, pages, loading, defaultSorted} = this.state;
        const cols = this.props.cols || LoadoutTable.DEFAULT_COLS

        return (
            <div style={{color: "black"}}>
                <h1>{this.props.title}</h1>

                <div style={{
                    display: "flex",
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                }}>

                    <div className="Loadout-search-container">
                        <span>search:&nbsp;</span>
                        <input className="Loadout-search" type={"text"} placeholder={"*"} value={this.state.searchValue}
                               onChange={this.onSearchValue}/>
                    </div>

                    <div>
                        <RSButton width={72} onClick={this.showFilters}>Add Filter</RSButton>
                        {
                            this.state.showFilters &&
                            <LoadoutFilters onChange={this.onFiltersChanged} filters={this.state.filters}/>
                        }
                    </div>
                </div>
                <br/>
                <ReactTable
                    ref={this.tableRef}
                    columns={cols}
                    minRows={10}
                    manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                    filterAll={false}
                    data={data}
                    defaultSorted={defaultSorted}
                    showPageJump={false}
                    pages={pages} // Display the total number of pages
                    loading={loading} // Display the loading overlay when we need it
                    onFetchData={this.fetchData} // Request new data when things change
                    defaultPageSize={30}
                    pageSizeOptions={[15, 30, 60]}
                    noDataText="No loadouts found"
                    className="-striped -highlight"
                    getTdProps={(state, rowInfo, column, instance) => {
                        return {
                            style: {
                                cursor: rowInfo == null || rowInfo.original == null ? "default" : "pointer",
                            },
                            onClick: (e, handleOriginal) => {
                                if (rowInfo == null || rowInfo.original == null) {
                                    if (handleOriginal) {
                                        handleOriginal()
                                    }
                                    return
                                }

                                this.props.history.location.state = this.state;
                                this.props.history.replace(this.props.history.location)
                                this.props.history.push({
                                    pathname: `/l/${rowInfo.original.id}`,
                                    loadout: rowInfo.original,
                                });
                            }
                        }
                    }}
                />
            </div>
        );
    }
}

LoadoutTable.propTypes = {
    title: PropTypes.string.isRequired,
    fetchFunc: PropTypes.func,
    history: PropTypes.object.isRequired,
    cols: PropTypes.arrayOf(PropTypes.object),
};

export default LoadoutTable