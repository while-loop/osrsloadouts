import React from 'react';
import './Loadout.css';
import PropTypes from "prop-types";
import SlotSchema from "./SlotSchema";
import InventorySlot from "./InventorySlot";

class Menu extends React.Component {
    static CANCEL = '_cancel';
    static QUANTITY = 'Set quantity';

    onClick(option) {
        let me = this;
        return function (e) {
            if (option !== Menu.CANCEL) {
                option.onClick(option.action, e);
            }
            me.hideMenu();
        }
    };

    onMouseLeave = (e) => {
        this.hideMenu();
    };

    createOptions() {
        return this.props.options.map(o => {
            let name = '';
            if (o.includeName) {
                name = ` ${this.props.name}`
            } else if (o.name != null) {
                name = ` ${o.name}`
            }

            return <div key={o.action} onClick={this.onClick(o)} className="Menu-option"><span
                className="Menu-action">{o.action}</span>{name}<br/></div>
        });
    }

    hideMenu() {
        this.props.onClose();
    }

    render() {
        return (
            <div className="Menu"
                 style={{left: this.props.left, top: this.props.top}}
                 onMouseLeave={this.onMouseLeave}>
                <div className="Menu-header">
                    Choose Option
                </div>
                <div className="Menu-content">
                    {this.createOptions()}
                    <div onClick={this.onClick(Menu.CANCEL)} className="Menu-option"><span
                        className="Menu-action">Cancel</span></div>
                </div>
            </div>
        );
    }
}

Menu.propTypes = {
    options: PropTypes.array.isRequired,
    onClose: PropTypes.func,
    name: PropTypes.string,
    left: PropTypes.number,
    top: PropTypes.number,
};

export default Menu;