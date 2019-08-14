import React from 'react';
import EquipmentSlot from "./EquipmentSlot";
import SlotSchema from "./SlotSchema";

class Equipment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: {
                head:  this.z("head"),
                cape:  this.z("cape"),
                neck:  this.z("neck"),
                ammo:  this.z("ammo"),
                weapon: this.z("weapon"),
                body:  this.z("body"),
                shield: this.z("shield"),
                legs:  this.z("legs"),
                hands: this.z("hands"),
                feet:  this.z("feet"),
                ring:  this.z("ring"),
            },
        };
    }

    z(slotType) {
        let ss = new SlotSchema();
        ss.slotType = slotType;
        return ss;
    }

    componentDidMount() {
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

        this.setState({items});
    }

    remove = (ss) => {
        this.props.onEquipChange(ss);
        // this.setState(state => {
        //     state.items[ss.slotType] = ss;
        //     return {items: state.items}
        // });
    };

    insert = (ss) => {
        this.props.onEquipChange(ss);
        // this.setState(state => {
        //     state.items[ss.slotType] = ss;
        //     return {items: state.items}
        // });
    };

    render() {
        let slots = [];
        Object.entries(this.state.items).forEach(([slotType, ss]) => {
            slots.push(<EquipmentSlot key={slotType} ss={ss} remove={this.remove} insert={this.insert}/>)
        });

        return (
            <div className="Equipment Shadowed">
                {slots}
            </div>
        );
    }
}

export default Equipment;


