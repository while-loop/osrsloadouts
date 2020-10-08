import React from 'react';
import SlotSchema from "./SlotSchema";
import InventorySlot from "./InventorySlot";
import PropTypes from "prop-types";
import RSWidget from "../../utils/widgets/RSWidget/RSWidget";
import _ from "lodash";

class RunePouch extends React.Component {

    static TOP = 26;

    constructor(props) {
        super(props);
        this.props = {
            items: [this.z(), this.z(), this.z()],
        };
    }

    z() {
        return new SlotSchema();
    }

    changed = (ss) => {
        this.props.onRunePouchChange(ss);
    };

    swap = (ss1, ss2) => {
        if (ss1.slotType !== ss2.slotType) {
            return
        }
        let item1 = _.cloneDeep(ss1);
        let item2 = _.cloneDeep(ss2);

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
        this.props.onRunePouchChange([item1, item2]);
    };

    getSlots() {
        let slots = [];

        let items = this.props.items || [this.z(), this.z(), this.z()]
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let ss = new SlotSchema();
            if (item != null) {
                ss.id = item.id;
                ss.quantity = item.quantity;
            }

            let left = (i * 45) + 17;
            ss.col = i;
            ss.slotType = "rune_pouch";

            slots.push(
                <InventorySlot swap={this.swap}
                               draggable={true}
                               quantity={this.changed}
                               insert={this.changed}
                               remove={this.changed}
                               ss={ss}
                               key={ss.key()}
                               id={ss.key()}
                               left={left}
                               top={RunePouch.TOP}
                               isOwner={this.props.isOwner}
                />
            );
        }

        return slots;
    }

    render() {
        return (
            <div className="RunePouch Shadowed">
                <RSWidget width={156}
                          height={64}
                          small
                          title={<span style={{fontSize: 14}}>Rune Pouch</span>}
                          padding={"3px 0 0 0"}
                >
                    {this.getSlots()}
                </RSWidget>
            </div>
        );
    }
}

RunePouch.propTypes = {
    onRunePouchChange: PropTypes.func,
    items: PropTypes.array.isRequired,
    isOwner: PropTypes.bool.isRequired,
};

export default RunePouch;


