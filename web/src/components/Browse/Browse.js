import React from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import moment from "moment";
import LoadoutStore from "../../store/LoadoutStore";
import {toast} from "react-toastify";
import {getSort} from "../../utils/js";

class Browse extends React.Component {

    state = {
        data: [],
        pages: null,
        loading: false
    };

    fetchData = (state, instance) => {
        // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
        // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
        this.setState({loading: false});
        // Request the data however you want. Here, we'll use our mocked service we created earlier

        console.log(state.pageSize, state.page, state.sorted, state.filtered);
        LoadoutStore.browseLoadouts(state.page, state.pageSize, getSort(state.sorted)).then(r => {
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

        return (
            <div style={{fontSize: ".5em", color: "black"}}>
                <h1>Community Loadouts</h1>

                <ReactTable
                    columns={[
                        {
                            Header: "Title",
                            accessor: "title",
                            width: 150,
                        },
                        {
                            Header: "Author",
                            accessor: "author.username",
                        },
                        {
                            Header: "Created",
                            id: "created",
                            accessor: d => moment(d.created).format('MMM Do YYYY'),
                        },
                        {
                            Header: "Updated",
                            id: "updated",
                            accessor: d => moment(d.updated).format('MMM Do YYYY'),
                        },
                        // {
                        //     Header: "Views",
                        //     accessor: "views",
                        //     width: 50,
                        // },
                        // {
                        //     Header: "Favs",
                        //     accessor: "favorites",
                        //     width: 50.
                        // }
                    ]}
                    manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                    filterAll={true}
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

export default Browse;


