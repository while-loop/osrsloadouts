import React from 'react';
import slot from "./img/slot.png"
import ItemSelector from "./ItemSelector";
import Menu from "./Menu";
import QuantityPopup from "./QuantityPopup";
import InventorySlot from "./InventorySlot";
import PropTypes from "prop-types";
import SlotSchema from "./SlotSchema";
import ItemStore from "../../store/ItemStore";

class EquipmentSlot extends InventorySlot {
    static equipWidth = 202;
    static slotSize = 36;
    static slotGapY = 3;
    static slotGapX = 5;
    static xMid = 83;
    static yTop = 37;
    static row3XOffset = (EquipmentSlot.slotSize * 1.5) + 2;
    static boundaries = {
        head: {
            left: EquipmentSlot.xMid,
            top: EquipmentSlot.yTop,
        },
        cape: {
            left: EquipmentSlot.xMid - EquipmentSlot.slotSize - EquipmentSlot.slotGapX,
            top: EquipmentSlot.yTop + EquipmentSlot.slotSize + EquipmentSlot.slotGapY,
        },
        neck: {
            left: EquipmentSlot.xMid,
            top: (EquipmentSlot.yTop) + EquipmentSlot.slotSize + EquipmentSlot.slotGapY,
        },
        ammo: {
            left: EquipmentSlot.xMid + EquipmentSlot.slotSize + EquipmentSlot.slotGapX,
            top: (EquipmentSlot.yTop) + EquipmentSlot.slotSize + EquipmentSlot.slotGapY,
        },
        weapon: {
            left: EquipmentSlot.xMid - EquipmentSlot.row3XOffset,
            top: (EquipmentSlot.yTop * 2) + EquipmentSlot.slotSize + (EquipmentSlot.slotGapY * 2) - 1,
        },
        body: {
            left: EquipmentSlot.xMid,
            top: (EquipmentSlot.yTop * 2) + EquipmentSlot.slotSize + (EquipmentSlot.slotGapY * 2) - 1,
        },
        shield: {
            left: EquipmentSlot.xMid + EquipmentSlot.row3XOffset,
            top: (EquipmentSlot.yTop * 2) + EquipmentSlot.slotSize + (EquipmentSlot.slotGapY * 2) - 1,
        },
        legs: {
            left: EquipmentSlot.xMid,
            top: (EquipmentSlot.yTop * 3) + EquipmentSlot.slotSize + (EquipmentSlot.slotGapY * 3) - 1,
        },
        hands: {
            left: EquipmentSlot.xMid - EquipmentSlot.row3XOffset,
            top: (EquipmentSlot.yTop * 4) + EquipmentSlot.slotSize + (EquipmentSlot.slotGapY * 4) - 1,
        },
        feet: {
            left: EquipmentSlot.xMid,
            top: (EquipmentSlot.yTop * 4) + EquipmentSlot.slotSize + (EquipmentSlot.slotGapY * 4) - 1,
        },
        ring: {
            left: EquipmentSlot.xMid + EquipmentSlot.row3XOffset,
            top: (EquipmentSlot.yTop * 4) + EquipmentSlot.slotSize + (EquipmentSlot.slotGapY * 4) - 1,
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            selecting: false,
            showQuantity: false,
            showMenu: false,
            menuOptions: this.getMenuOptions(),
        };

        this.style = {
            left: EquipmentSlot.boundaries[this.props.ss.slotType].left,
            top: EquipmentSlot.boundaries[this.props.ss.slotType].top,
        };
    }

    render() {
        let osrsinfo = {};
        if (!this.state.selecting && !this.state.showMenu && this.props.ss.id != null) {
            osrsinfo = {
                className: 'osrstooltip',
                title: this.props.ss.info && this.props.ss.info.name != null ? this.props.ss.info.name : '',
                'data-type': this.props.ss.info && this.props.ss.info.equipable ? 'bonuses' : 'short',
                id: this.props.ss.id
            };
        }

        let image = <div onClick={this.selectItem}
                         style={{width: InventorySlot.slotSize, height: InventorySlot.slotSize}}
                         draggable="false"/>;
        if (this.props.ss.id != null) {
            image = <img onClick={this.handleItemClick}
                         draggable="false" src={ItemStore.imgUrl(this.props.ss.id)} alt=""/>;
        }

        return (
            <div onContextMenu={this.onContextMenu}>
                { /****** NEW ITEM SELECTOR ******/
                    this.state.selecting &&
                    <ItemSelector onSelected={this.onSelected} slotType={this.props.ss.slotType}/>
                }
                { /****** RIGHT CLICK MENU ******/
                    this.state.showMenu && this.props.ss.info &&
                    <Menu options={this.state.menuOptions}
                          onClose={this.onItemMenuClose}
                          name={this.props.ss.info.name}
                          left={this.state.menuLeft}
                          top={this.state.menuTop}/>
                }
                { /****** QUANTITY POPUP ******/
                    this.state.showQuantity &&
                    <QuantityPopup quantity={this.props.ss.quantity}
                                   onClose={(q) => {
                                       this.props.ss.quantity = q;
                                       this.setState({showQuantity: false});
                                       this.props.quantity(this.props.ss);
                                   }}/>
                }
                {
                    this.props.ss.id != null &&
                    <img className="Equipment-slot" style={this.style} src={slot} draggable={false}
                         alt="equipment slot"/>
                }
                <div className="Equipment-slot"
                     style={{
                         left: this.style.left + (EquipmentSlot.slotGapX / 2),
                         top: this.style.top + (EquipmentSlot.slotGapY / 2) + 0.5,
                     }}>

                    { /****** ITEM QUANTITY ******/
                        this.props.ss.info != null && this.props.ss.info.stackable &&
                        <span className="Item-quantity">{this.normalizeNumber(this.props.ss.quantity)}</span>
                    }

                    <div {...osrsinfo}>
                        {image}
                    </div>
                </div>
            </div>
        );
    }
}

EquipmentSlot.propTypes = {
    remove: PropTypes.func.isRequired,
    insert: PropTypes.func.isRequired,
    quantity: PropTypes.func.isRequired,
    ss: PropTypes.instanceOf(SlotSchema)
};

export default EquipmentSlot;
