import React from 'react';
import SlotSchema from "./SlotSchema";
import InventorySlot from "./InventorySlot";
import PropTypes from "prop-types";
import RSWidget from "../../utils/widgets/RSWidget/RSWidget";

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

            slots.push(
                <InventorySlot swap={null}
                               draggable={false}
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

RSWidget.propTypes = {
    onRunePouchChange: PropTypes.func,
    items: PropTypes.array.isRequired,
    isOwner: PropTypes.bool.isRequired,
};

export default RunePouch;


