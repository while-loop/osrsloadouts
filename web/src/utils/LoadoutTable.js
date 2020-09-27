import React from "react";
import ReactTable from "react-table";
import moment from "moment";
import PropTypes from "prop-types";
import {getSort, normalizeNumber} from "./js";
import {toast} from "react-toastify";
import Humanize from "humanize-plus";

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
            id: "favs",
            accessor: d => Humanize.compactInteger(d.favorites, 1),
            width: 50,
        }
    ]

    state = {
        data: [],
        pages: null,
        loading: false

    };

    constructor(props) {
        super(props);
    }

    fetchData = (state, instance) => {
        this.setState({loading: false});
        if (this.props.fetchFunc == null) {
            return
        }

        console.log(state.pageSize, state.page, state.sorted, state.filtered, this.state.fetchFunc);
        this.props.fetchFunc(state.page, state.pageSize, getSort(state.sorted), state.filtered).then(r => {
            this.setState({
                data: r.data.loadouts || [],
                pages: Math.ceil(r.data.total / r.data.limit),
            })
        }).catch(reason => {
            console.log("failed to get loadouts", reason, reason.response);
            toast.error("Failed to get loadouts: " + reason.toString());
        }).finally(() => {
                this.setState({loading: false});
            }
        )
    };

    render() {
        const {data, pages, loading} = this.state;
        const cols = this.props.cols || LoadoutTable.DEFAULT_COLS

        return (
            <div style={{fontSize: ".5em", color: "black"}}>
                <h1>{this.props.title}</h1>
                <ReactTable
                    ref={this.tableRef}
                    columns={cols}
                    minRows={10}
                    manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                    filterAll={false}
                    data={data}
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

                                console.log('It was in this row:', rowInfo.original);
                                this.props.history.push(`/l/${rowInfo.original.id}`);
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