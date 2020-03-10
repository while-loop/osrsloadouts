import React from 'react';
import './Loadout.css'
import ItemStore from "../../store/ItemStore";
import PropTypes from 'prop-types';
import Menu from "./Menu";
import QuantityPopup from "./QuantityPopup";
import SlotSchema from "./SlotSchema";
import ItemSelector from "./ItemSelector";
import _ from "lodash";
import {toast} from "react-toastify";


class InventorySlot extends React.Component {
    static slotSize = 36;

    constructor(props) {
        super(props);
        this.state = {
            dragging: false,
            items: [],
            menuOptions: this.getMenuOptions(),
            showMenu: false,
            showQuantity: false,
            id: null,
            quantity: null,
        };
    }

    getMenuOptions(item) {
        let opts = [];
        if (item == null) {
            item = this.props.ss.info;
        }

        if (item != null) {
            opts.push({action: 'Open wiki', onClick: () => this.viewItem(), includeName: false});
            if (item.stackable) {
                opts.push({
                    action: Menu.QUANTITY,
                    onClick: () => this.setState({showQuantity: true}),
                    includeName: false
                });
            }
        }
        opts.push({action: 'Drop', onClick: () => this.removeItem(), includeName: true});

        if (item != null) {
            opts.push({action: 'Examine', onClick: () => toast.info(item.examine), includeName: true});
        }

        return opts;
    }

    dragEnd = (event) => {
        this.setState({dragging: false})
    };

    dragStart = (event) => {
        event.dataTransfer.setData("text", JSON.stringify(this.props.ss));
        this.setState({dragging: true});
    };

    drop = (event) => {
        let sourcess = SlotSchema.fromJSON(JSON.parse(event.dataTransfer.getData("text")));
        let destss = this.props.ss;

        if (sourcess && destss) {
            this.props.swap(sourcess, destss);
            event.dataTransfer.clearData()
        }
    };

    viewItem = (e) => {
        if (e != null && e.shiftKey) {
            // shift click drop
            this.removeItem();
            return;
        }

        if (this.props.ss.info == null || this.props.ss.info.wiki_url == null) {
            return;
        }


        window.open(this.props.ss.info.wiki_url, "_blank");
    };

    onContextMenu = (e) => {
        if (this.props.ss.info == null) {
            return;
        }

        e.preventDefault();
        this.setState({
            showMenu: true,
            menuTop: e.pageY,
            menuLeft: e.pageX - InventorySlot.slotSize,
        });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (_.isEqual(this.props.ss, prevProps.ss)) {
            return;
        }

        this._getItemInfo();
    }

    _getItemInfo() {
        if (this.props.ss.id == null) {
            return;
        }

        ItemStore.getItemInfo(this.props.ss.id).then(resp => {
            this.props.ss.info = resp.data;
            this.setState({
                menuOptions: this.getMenuOptions(this.props.ss.info),
                id: resp.data.id,
                quantity: this.props.ss.quantity,
            })
        }).catch(reason => {
            console.log("failed to get slot item info", reason);
        })
    }

    removeItem() {
        this.setState({
            menuOptions: [
                {action: 'Drop', onClick: () => this.removeItem(), includeName: true}
            ],
        });
        this.props.ss.reset();
        this.props.remove(this.props.ss);
    }

    componentDidMount() {
        this._getItemInfo();
    }

    selectItem = (e) => {
        if (e != null && (e.ctrlKey || e.metaKey) && this.props.lastAdded != null) {
            this.onSelected({id: this.props.lastAdded.id})
            return;
        }

        this.setState({selecting: true})
    };

    onSelected = (e) => {
        this.setState({selecting: false});
        if (e == null) {
            return;
        }

        this.props.ss.reset();
        this.props.ss.id = e.id;
        this.props.insert(this.props.ss);
        this._getItemInfo();
    };

    onItemMenuClose = () => {
        this.setState({showMenu: false});
    };


    render() {
        let style = {
            left: this.props.left + 'px',
            top: this.props.top + 'px',
        };

        if (this.state.dragging) {
            style.opacity = .25;
        }

        let osrsinfo = {};
        if (!this.state.selecting && !this.state.showMenu && this.props.ss.id !== null) {
            osrsinfo = {
                className: 'osrstooltip',
                title: this.props.ss.info && this.props.ss.info.name !== null ? this.props.ss.info.name : '',
                'data-type': this.props.ss.info && this.props.ss.info.equipable ? 'bonuses' : 'short',
                id: this.props.ss.id
            };
        }

        let image = <div onClick={this.selectItem}
                         style={{width: InventorySlot.slotSize, height: InventorySlot.slotSize}} idx={this.props.id}
                         draggable="false"/>;
        if (this.props.ss.id !== null) {
            image = <img onClick={this.viewItem} idx={this.props.id}
                         draggable="false" src={ItemStore.imgUrl(this.props.ss.id)} alt=""/>;
        }

        return (
            <div onContextMenu={this.onContextMenu}>
                { /****** NEW ITEM SELECTOR ******/
                    this.state.selecting &&
                    <ItemSelector onSelected={this.onSelected}/>
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
                                   }}
                    />
                }

                <div
                    idx={this.props.id} draggable={this.props.ss.id !== null} onDrop={this.drop}
                    onDragStart={this.dragStart} onDragOver={(event) => event.preventDefault()}
                    onDragEnd={this.dragEnd} style={style}
                    className="No-add Inventory-slot">

                    { /****** ITEM QUANTITY ******/
                        this.props.ss.info !== null && this.props.ss.info.stackable &&
                        <span className="Item-quantity">{this.normalizeNumber(this.props.ss.quantity)}</span>
                    }

                    <div {...osrsinfo} >
                        {image}
                    </div>
                </div>
            </div>
        )
    }

    normalizeNumber = (number) => {
        let num = '';
        let color = '#ffff03';
        if (number >= 10000000) {
            color = '#07f97e';
            num = (number / 1000000).toFixed(0) + 'm';
        } else if (number >= 100000) {
            color = 'white';
            num = (number / 1000).toFixed(0) + 'k';
        } else {
            num = String(number)
        }

        return <span style={{color: color}}>{num}</span>;
    };
}

InventorySlot.propTypes = {
    id: PropTypes.string.isRequired,
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    swap: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    quantity: PropTypes.func.isRequired,
    insert: PropTypes.func.isRequired,
    ss: PropTypes.instanceOf(SlotSchema),
    lastAdded: PropTypes.instanceOf(SlotSchema),
};

export default InventorySlot;

