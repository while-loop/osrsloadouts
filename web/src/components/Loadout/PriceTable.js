import React from 'react';
import PropTypes from "prop-types";
import _ from "lodash";
import ItemStore from "../../store/ItemStore";
import GEStore from "../../store/GEStore";
import ReactTable from "react-table";
import {normalizeNumberStrict, unnormalizeNumber} from "../../utils/js";

class PriceTable extends React.Component {

    static COMPOSITES = {
        12926: 12924,
    }

    static normalizedSort = (a, b) => {
        if (a === b) {
            return 0;
        }
        return unnormalizeNumber(a) > unnormalizeNumber(b) ? 1 : -1;
    }

    static DEFAULT_COLS = [
        {
            Header: "Item",
            accessor: "name",
            width: 200
        },
        {
            Header: "Total",
            id: "total",
            accessor: d => normalizeNumberStrict(d.total).number,
            width: 70,
            sortMethod: PriceTable.normalizedSort
        },
        {
            Header: "Price",
            id: "price",
            width: 70,
            accessor: d => normalizeNumberStrict(d.price).number,
            sortMethod: PriceTable.normalizedSort
        },
        {
            Header: "Quantity",
            id: "quantity",
            width: 70,
            accessor: d => normalizeNumberStrict(d.quantity).number,
            sortMethod: PriceTable.normalizedSort
        },
    ]

    state = {
        items: [], // {"name", "id", "quantity", "price"}
        totalGp: 0,
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getItems()
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (_.isEqual(nextProps, this.props)) {
            return false
        }

        this.getItems()
        return true
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.getItems()
    }

    async getItems() {
        const promises = [];
        const quantities = {}

        const fetchItem = (item) => {
            if (item.id == null) {
                return
            }
            let id = item.id
            if (id in PriceTable.COMPOSITES) {
                id = PriceTable.COMPOSITES[id]
            }
            if (!(id in quantities)) {
                quantities[id] = item.quantity
                promises.push(
                    ItemStore.getItemInfo(id).then(infoRes => {
                            if (!infoRes.data.tradeable_on_ge) {
                                return {
                                    id: id,
                                    price: 0,
                                    name: infoRes.data.name
                                }
                            }
                            return GEStore.get(id).then(priceRes => {
                                    return {
                                        id: id,
                                        price: priceRes.data.price,
                                        name: infoRes.data.name
                                    }
                                }
                            ).catch(reason => {
                                console.log(`failed to get ${infoRes.data.name}`, reason)
                                return {
                                    id: id,
                                    price: 0,
                                    name: infoRes.data.name
                                }
                            })
                        }
                    ).catch(reason => {
                        console.log(`failed to get item id ${id}`, reason)
                        return {
                            id: id,
                            price: 0,
                            name: id
                        }
                    })
                );
            } else {
                quantities[id] += item.quantity
            }
        }

        for (let i = 0; i < this.props.invy.length; i++) {
            for (let j = 0; j < this.props.invy[i].length; j++) {
                fetchItem(this.props.invy[i][j])
            }
        }

        for (let i = 0; i < this.props.rp.length; i++) {
            fetchItem(this.props.rp[i])
        }

        for (const [_, item] of Object.entries(this.props.eq)) {
            fetchItem(item)
        }

        await Promise.all(promises).then(values => {
            const items = []
            let totalGp = 0
            for (const val of values) {
                val.quantity = quantities[val.id]
                val.total = val.quantity * val.price
                items.push(val)
                totalGp += val.total
            }
            this.setState({items, totalGp}, () => {
                this.props.onPriceChange(totalGp)
            })
        })
    }

    render() {
        if (!this.props.show) {
            return null;
        }

        const style = {
            ...this.props.style || {}
        }

        return (
            <div style={style}>
                <ReactTable
                    columns={PriceTable.DEFAULT_COLS}
                    minRows={1}
                    filterAll={false}
                    data={this.state.items}
                    defaultSorted={[{id: "total", desc: true}]}
                    showPageJump={false}
                    loading={false} // Display the loading overlay when we need it
                    defaultPageSize={60}
                    pageSizeOptions={[]}
                    noDataText="No prices found"
                    className="-striped -highlight"
                    showPageSizeOptions={false}
                    showPagination={false}
                    showPaginationBottom={false}
                    showPaginationTop={false}
                    getNoDataProps={function (params) {
                        return {style: {display: 'none'}};
                    }}
                />
            </div>
        );
    }
}

PriceTable.propTypes = {
    invy: PropTypes.array.isRequired,
    eq: PropTypes.object.isRequired,
    rp: PropTypes.array.isRequired,
    onPriceChange: PropTypes.func.isRequired,
    style: PropTypes.object,
    show: PropTypes.bool.isRequired,
};

export default PriceTable;


