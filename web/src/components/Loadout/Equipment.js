import React from 'react';
import EquipmentSlot from "./EquipmentSlot";
import SlotSchema from "./SlotSchema";

class Equipment extends React.Component {

    constructor(props) {
        super(props);
        this.props = {
            items: {
                head: this.z("head"),
                cape: this.z("cape"),
                neck: this.z("neck"),
                ammo: this.z("ammo"),
                weapon: this.z("weapon"),
                body: this.z("body"),
                shield: this.z("shield"),
                legs: this.z("legs"),
                hands: this.z("hands"),
                feet: this.z("feet"),
                ring: this.z("ring"),
            },
        };
    }

    componentDidMount() {
        window.initosrstooltip();
    }

    z(slotType) {
        let ss = new SlotSchema();
        ss.slotType = slotType;
        return ss;
    }

    toSS() {
        let items = {};
        Object.entries(this.props.items).forEach(([slotType, data]) => {
                let ss = new SlotSchema();
                if (data !== null) {
                    ss.id = data.id;
                    ss.quantity = data.quantity;
                }
                ss.slotType = slotType;
                items[slotType] = ss;
            }
        );
        return items;
    }

    changed = (ss) => {
        this.props.onEquipChange(ss);
    };

    render() {
        let slots = [];
        Object.entries(this.toSS()).forEach(([slotType, ss]) => {
            slots.push(<EquipmentSlot key={slotType} ss={ss} remove={this.changed} insert={this.changed}
                                      quantity={this.changed}/>)
        });

        return (
            <div className="Equipment Shadowed">
                {slots}
            </div>
        );
    }
}

export default Equipment;


