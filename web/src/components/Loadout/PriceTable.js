import React from 'react';
import PropTypes from "prop-types";
import _ from "lodash";
import ItemStore from "../../store/ItemStore";
import GEStore from "../../store/GEStore";
import ReactTable from "react-table";
import {normalizeNumberStrict, unnormalizeNumber} from "../../utils/js";

class PriceTable extends React.Component {

    // https://www.osrsbox.com/tools/item-search/
    static COMPOSITES = {
        'Toxic blowpipe': 12924,   // Toxic blowpipe (empty)
        'Trident of the seas (e)': 22290, //	Uncharged trident (e)
        'Trident of the seas': 11908, // 	Uncharged trident
        'Trident of the swamp (e)': 22294, //	Uncharged toxic trident (e)
        'Trident of the swamp': 12900, // 	Uncharged toxic trident
        "Serpentine helm": 12929,
        "Tanzanite helm": 12929,
        "Magma helm ": 12929,

        'Ring of endurance': 24844,
        "Bryophyta's staff": 22368,
        "Scythe of vitur": 22486,

        "Infernal pickaxe": 11920,
        "Dragon pickaxe": 11920,
        "Infernal harpoon": 21028,
        "Dragon harpoon": 21028,

        'abyssal whip': 4151,   // catches volcanic/frozen abyssal whip
        'Abyssal tentacle': 4151,   // Volcanic abyssal whip

        'Slayer helmet': 8921,   // black mask
        'slayer helmet': 8921,   // black mask

        "Ahrim's hood": 4708,
        "Ahrim's robeskirt": 4714,
        "Ahrim's robetop": 4712,
        "Ahrim's staff": 4710,
        "Dharok's greataxe": 4718,
        "Dharok's helm": 4716,
        "Dharok's platebody": 4720,
        "Dharok's platelegs": 4722,
        "Karil's coif": 4732,
        "Karil's crossbow": 4734,
        "Karil's leatherskirt": 4738,
        "Karil's leathertop": 4736,
        "Guthan's chainskirt": 4730,
        "Guthan's helm": 4724,
        "Guthan's platebody": 4728,
        "Guthan's warspear": 4726,
        "Torag's hammers": 4747,
        "Torag's helm": 4745,
        "Torag's platebody": 4749,
        "Torag's platelegs": 4751,
        "Verac's brassard": 4757,
        "Verac's flail": 4755,
        "Verac's helm": 4753,
        "Verac's plateskirt": 4759,
        "Sanguinesti staff": 22481,

        "Berserker ring": 6737,
        "Archers ring": 6733,
        "Seers ring": 6731,

        "Ring of suffering": 19550,
        "Amulet of torture": 19553,
        "Necklace of anguish": 19547,
        "Tormented bracelet": 19544,
        "Amulet of blood fury": 24777, // blood shard

        "Tyrannical ring": 12603,
        "Treasonous ring": 12605,
        "Ring of the gods": 12601,

        "Book of darkness": 13159, // page set
        "Book of balance": 13153, // page set
        "Book of war": 13155, // page set
        "Book of law": 13157, // page set
        "Holy book": 13149, // page set
        "Unholy book": 13151, // page set

        "Dragonfire ward": 22003,
        "Dragonfire shield": 11284,
    }

    static getComposite(name) {
        name = name.replace("(or)", "") // ornament
        name = name.replace("(i)", "") // imbued
        name = name.trim()
        for (const [key, value] of Object.entries(PriceTable.COMPOSITES)) {
            if (name.includes(key)) {
                return value
            }
        }

        return null
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
            const id = item.id
            if (!(id in quantities)) {
                quantities[id] = item.quantity
                promises.push(
                    ItemStore.getItemInfo(id).then(infoRes => {
                            let composite = PriceTable.getComposite(infoRes.data.name);
                            if (!infoRes.data.tradeable_on_ge && composite == null) {
                                let price = 0
                                if (infoRes.data.name === "Coins") {
                                    price = 1
                                }
                                return {
                                    id: id,
                                    price: price,
                                    name: infoRes.data.name
                                }
                            }
                            return GEStore.get(composite || id).then(priceRes => {
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
                    defaultSorted={[{id: "total", desc: false}]}
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


