import React from 'react';
import './Loadout.css'
import InventorySlot from "./InventorySlot";
import SlotSchema from "./SlotSchema";
import _ from 'lodash';

class Inventory extends React.Component {
    static invyWidth = 202;
    static invyHeight = 273;

    constructor(props) {
        super(props);
        this.state = {
            items: [
                [this.z(), this.z(), this.z(), this.z()],
                [this.z(), this.z(), this.z(), this.z()],
                [this.z(), this.z(), this.z(), this.z()],
                [this.z(), this.z(), this.z(), this.z()],
                [this.z(), this.z(), this.z(), this.z()],
                [this.z(), this.z(), this.z(), this.z()],
                [this.z(), this.z(), this.z(), this.z()],
            ],
            lastAdded: null,
        };
    }

    z() {
        return new SlotSchema();
    }

    swap = (ss1, ss2) => {
        let sa = _.cloneDeep(this.state.items);
        let item1 = sa[ss1.row][ss1.col];
        let item2 = sa[ss2.row][ss2.col];

        let i1 = item1.id;
        let q1 = item1.quantity;
        let i2 = item2.id;
        let q2 = item2.quantity;

        item1.reset();
        item2.reset();

        item1.id = i2;
        item1.quantity = q2;
        item2.id = i1;
        item2.quantity = q1;
        this.props.onInvyChange([item1, item2]);
    };

    quantity = (ss) => {
        this.props.onInvyChange(ss);
    };

    insert = (ss) => {
        this.props.onInvyChange(ss);
        this.setState({lastAdded: ss})
    };

    remove = (ss) => {
        this.props.onInvyChange(ss);
    };

    getSlots() {
        let slots = [];
        for (let i = 0; i < this.state.items.length; i++) {
            for (let j = 0; j < this.state.items[i].length; j++) {
                let item = this.state.items[i][j];
                let left = (j * 45) + 17;
                let top = (i * 35) + 17;
                item.row = i;
                item.col = j;

                slots.push(
                    <InventorySlot swap={this.swap} quantity={this.quantity} insert={this.insert} remove={this.remove}
                                   ss={item} key={item.key()}
                                   id={item.key()} left={left} top={top}
                                   isOwner={this.props.isOwner}
                                   lastAdded={this.state.lastAdded}/>
                );
            }
        }

        return slots;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (_.isEqual(this.props.items, prevProps.items)) {
            return;
        }

        this.setState({items: this.toSS()});
    }

    toSS() {
        let items = this.state.items;

        for (let i = 0; i < this.props.items.length; i++) {
            for (let j = 0; j < this.props.items[i].length; j++) {
                let item = SlotSchema.fromJSON(this.props.items[i][j]);
                if (item == null) {
                    item = new SlotSchema(null, 0, i, j);
                }
                items[i][j] = item;
            }
        }

        return items;
    }

    componentDidMount() {
        window.initosrstooltip();
        this.setState({items: this.toSS()});
    }

    render() {
        return (
            <div className="Inventory Shadowed">
                {this.getSlots()}
            </div>
        );
    }
}

export default Inventory;


