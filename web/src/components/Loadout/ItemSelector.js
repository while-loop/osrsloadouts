import Inventory from "./Inventory";
import Select, {components} from "react-select";
import React from "react";
import InventorySlot from "./InventorySlot";
import ItemStore from "../../store/ItemStore";
import PropTypes from "prop-types";

class ItemSelector extends React.Component {
    static maxListSize = 50;

    state = {
        options: [],
        allItems: [],
    };

    componentDidMount() {
        let itemsFn = () => ItemStore.getAll();
        if (this.props.slotType != null) {
            itemsFn = () => ItemStore.getEquipmentType(this.props.slotType)
        }

        itemsFn().then(items => {
            let opts = items.slice(0, ItemSelector.maxListSize).map((i) => {
                return {
                    id: i.id,
                    value: i.name,
                    label: i.name,
                    img: ItemStore.imgUrl(i.id),
                }
            });
            this.setState({allItems: items, options: opts})
        });
    }

    onInputChange = (search) => {
        if (search == null || search === "") {
            return;
        }

        let opts = this.state.allItems.filter((i) => {
            return i.name.toLowerCase().includes(search)
        }).map((i) => {
            return {
                id: i.id,
                value: i.name,
                label: i.name,
                img: ItemStore.imgUrl(i.id),
            }
        }).slice(0, ItemSelector.maxListSize);

        this.setState({options: opts});
    };

    onChange = (e) => {
        this.props.onSelected(e);
    };


    onMenuClose = () => {
        this.setState({selecting: false});
        this.props.onSelected(null);
    };

    render() {
        return (
            <Select styles={customStyles} openMenuOnFocus={true} autoFocus={true} onChange={this.onChange}
                    onMenuClose={this.onMenuClose} onInputChange={this.onInputChange}
                    ref='select' options={this.state.options} ignoreAccents={false}
                    components={{Option: IconOption}}
                    noOptionsMessage={() => 'No items found'}
            />
        );
    }
}

const customStyles = {
    option: (provided, state) => {
        return {
            ...provided,
            padding: 4,
            color: 'black',
            float: 'left',
            zIndex: 999999,
        }
    },
    menuList: (provided, state) => ({
        ...provided,
        maxHeight: Inventory.invyHeight - 50,
        zIndex: 999999,
    }),
    container: (provided, state) => ({
        ...provided,
        fontSize: '.5em',
        zIndex: 999999,
        width: Inventory.invyWidth,
    }),
};

const IconOption = (props) => (
    <components.Option {...props}>
        {props.data.img &&
        <img style={{width: InventorySlot.slotSize / 2, height: 'auto'}} src={props.data.img} alt=""/>}
        {props.data.label}
    </components.Option>
);

ItemSelector.propTypes = {
    onSelected: PropTypes.func.isRequired,
    slotType: PropTypes.string,
};

export default ItemSelector;