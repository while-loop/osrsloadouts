import React from 'react';
import UserStore from "../../store/UserStore";
import {toast} from "react-toastify";
import ReactTable from "react-table";
import moment from "moment";
import {dateString, getSort} from "../../utils/js";

class Profile extends React.Component {
    toastId = null;

    constructor(props) {
        super(props);
        this.state = {
            username: props.match.params.username,
            user: {
                username: 'User',
                rsn: '',
                id: '',
                created: null
            },
            data: [],
            pages: null,
            loading: false
        };
    }

    componentDidMount() {
        UserStore.getByUsername(this.state.username).then(r => {
            this.setState({user: r.data});
            this.fetchData(this.state)
        }).catch(reason => {
            console.log("failed to get user", reason);
            toast.error("Failed to get user: " + reason.toString());
        })
    }

    fetchData = (state, instance) => {
        // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
        // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
        this.setState({loading: false});
        if (this.state.user.id == null || this.state.user.id === '') {
            return;
        }


        UserStore.getLoadoutsByUid(this.state.user.id, state.page, state.pageSize, getSort(state.sorted)).then(r => {
            this.setState({
                data: r.data.loadouts || [],
                pages: Math.ceil(r.data.total / r.data.limit),
            })
        }).catch(reason => {
            console.log("failed to get user loadouts", reason, reason.response);
            toast.error("Failed to get user loadouts: " + reason.toString());
        }).finally(() => {
                this.setState({loading: false});
            }
        )
    };

    render() {
        const {data, pages, loading} = this.state;

        return (
            <div>
                <h3>{this.state.user.username}</h3>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "start",
                    fontSize: ".8em",
                }}>
                    <label>
                        Rsn: <span>{this.state.user.rsn}</span>
                    </label>
                    <label>
                        Joined: <span>{dateString(this.state.user.created)}</span>
                    </label>
                </div>

                <br/>

                <h4>Loadouts</h4>
                <ReactTable
                    style={{fontSize: ".5em", color: "black"}}
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

                                this.props.history.push(`/l/${rowInfo.original.id}`);
                            }
                        }
                    }}
                />
            </div>
        );
    }

}

export default Profile;
