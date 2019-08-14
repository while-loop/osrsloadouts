import React from 'react';
import Equipment from "./Equipment";
import Inventory from "./Inventory";
import Stats from "./Stats";
import moment from "moment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCodeBranch, faEye, faStar} from '@fortawesome/free-solid-svg-icons'
import * as Humanize from 'humanize-plus';
import {Link} from "react-router-dom";
import "./Loadout.css";
import CreatableSelect from 'react-select/creatable';
import _ from 'lodash';

class Loadout extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: props.match.params.id,
            loadout: null,
        };
    }

    componentDidMount() {

        // already 'mapped' data for frontend..
        this.setState(state => {
            state.loadout = {
                id: '00112233-4455-6677-8899-aabbccddeeff',
                title: "Poor man's Chambers of Xeric",
                author: 'whileloop',
                description: "- Drag invy items to switch slots\n" +
                    "- Right click items for more actions\n" +
                    "- Shift-click to drop items\n" +
                    "- Click to visit item wiki\n" +
                    "- Click empty space to search and add an item\n" +
                    "- Hover over an invy/equipped item for stat bonuses",
                created: new Date(2019, 8, 10, 10, 11, 23),
                updated: new Date(2019, 8, 10, 23, 51, 23),
                copies: 513,
                favorites: 123,
                favorited: true,
                views: 8675309,
                tags: ["cox", "raids", "radis1", "chambers", "of", "xeric"],
                parent: '00112233-4455-6677-8899-aabbccddeeff',
                inventory: [
                    [this.z(12899, 1), this.z(11663, 1), this.z(11804, 1), this.z(11665, 1)],
                    [this.z(12612, 1), this.z(12002, 1), this.z(12954, 1), this.z(4151, 1)],
                    [this.z(12018, 1), this.z(21009, 1), this.z(12926, 1), this.z(11920, 1)],
                    [this.z(12625, 1), this.z(3024, 1), this.z(6685, 1), this.z(6685, 1)],
                    [this.z(10925, 1), this.z(3024, 1), this.z(6685, 1), this.z(6685, 1)],
                    [this.z(2444, 1), this.z(3024, 1), this.z(6685, 1), this.z(6685, 1)],
                    [this.z(12695, 1), this.z(3024, 1), this.z(6685, 1), this.z(12791, 1)],
                ],
                equipment: {
                    head: {id: 11664, quantity: 1},
                    cape: {id: 22109, quantity: 1},
                    neck: {id: 6585, quantity: 1},
                    ammo: {id: 21944, quantity: 350},
                    weapon: {id: 21902, quantity: 1},
                    body: {id: 13072, quantity: 1},
                    shield: {id: 11926, quantity: 1},
                    legs: {id: 13073, quantity: 1},
                    hands: {id: 8842, quantity: 1},
                    feet: {id: 22951, quantity: 1},
                    ring: {id: 22975, quantity: 1},
                },
            };

            return {loadout: state.loadout}
        })
    }


    z(id, q) {
        return {id: id, quantity: q}
    }

    onEquipChange = (ss) => {
        const loadout = _.cloneDeep(this.state.loadout);
        loadout.equipment[ss.slotType] = this.z(ss.id, ss.quantity);
        this.setState({loadout});
    };

    onInvyChange = (sss) => {
        if (!Array.isArray(sss)) {
            sss = [sss];
        }
        const loadout = _.cloneDeep(this.state.loadout);
        sss.forEach(ss => {
            loadout.inventory[ss.row][ss.col] = this.z(ss.id, ss.quantity);
        });

        this.setState({loadout});
    };

    render() {
        if (this.state.loadout == null) {
            return <span>Loading...</span>
        }

        console.log("render");

        return (
            <div>
                <h4>{this.state.loadout.title}</h4>
                <button onClick={() => console.log(this.state.loadout.inventory)}>invy</button>
                <button onClick={() => console.log(this.state.loadout.equipment)}>equp</button>
                <div className="Loadout-header">
                    <div className="Loadout-top">
                        <textarea rows={6} className="Loadout-description" value={this.state.loadout.description}
                                  readOnly/>
                        <div className="Loadout-info">
                        <span>Author: <Link
                            to={"/u/" + this.state.loadout.author}>{this.state.loadout.author}</Link></span>
                            <span>Created: {moment(this.state.loadout.created).format('MMM Do YY, h:mm:ss a')}</span>
                            <span>Updated: {moment(this.state.loadout.updated).format('MMM Do YY, h:mm:ss a')}</span>
                            <div className="Loadout-info-stats">
                                <span title="views"><FontAwesomeIcon
                                    icon={faEye}/>: {Humanize.compactInteger(this.state.loadout.views, 1)}</span>
                                <span title="favorites"><FontAwesomeIcon
                                    icon={faStar}/>: {Humanize.compactInteger(this.state.loadout.favorites, 1)}</span>
                                <span title="copies"><FontAwesomeIcon
                                    icon={faCodeBranch}/>: {Humanize.compactInteger(this.state.loadout.copies, 1)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="Loadout-tags">
                        <div className="Loadout-tags-select">
                            <CreatableInputOnly tags={this.state.loadout.tags}
                                                onChange={(tags) => this.setState(state => {
                                                    state.loadout.tags = tags;
                                                })}/>
                        </div>

                    </div>
                </div>
                <div className="Loadout-content">
                    <Inventory onInvyChange={this.onInvyChange} items={this.state.loadout.inventory}/>
                    <Equipment onEquipChange={this.onEquipChange} items={this.state.loadout.equipment}/>
                    <Stats items={this.state.loadout.equipment}/>
                </div>
            </div>
        );
    }
}

class CreatableInputOnly extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            value: this.props.tags.map(t => this.createOption(t)),
        };
    }

    createOption = (label) => ({
        label,
        value: label,
    });

    handleChange = (value, actionMeta) => {
        if (value == null) value = [];

        this.setState({value});
        this.update(value);
    };

    handleInputChange = (inputValue) => {
        this.setState({inputValue});
    };

    handleKeyDown = (event) => {
        const {inputValue, value} = this.state;
        if (!inputValue) return;
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                let vals = [...value];
                inputValue.split(" ").forEach(v => {
                    v = v.trim();
                    if (v === "") {
                        return;
                    }

                    vals.push(this.createOption(v));
                });
                vals = [...new Map(vals.map(item => [item.value, item])).values()]
                this.setState({
                    inputValue: '',
                    value: vals,
                });
                this.update(vals);
                event.preventDefault();
        }
    };

    update = (values) => {
        if (values == null) {
            values = [];
        }
        this.props.onChange(values.map(v => v.value));
    };

    render() {
        const {inputValue, value} = this.state;
        return (
            <CreatableSelect
                styles={customStyles}
                components={{DropdownIndicator: null}}
                inputValue={inputValue}
                isMulti
                menuIsOpen={false}
                onChange={this.handleChange}
                onInputChange={this.handleInputChange}
                onKeyDown={this.handleKeyDown}
                placeholder="enter tags..."
                value={value}
            />
        );
    }
}

const customStyles = {
    placeholder: (provided, state) => ({
        ...provided,
        color: 'white',
    }),
    input: (provided, state) => ({
        ...provided,
        color: 'white',
    }),
    control: (provided, state) => ({
        ...provided,
        background: 'rgba(93,84,71,0.25)',
        color: 'white',
        border: 'none',
    }),
};

export default Loadout;


