import React from 'react';
import Equipment from "./Equipment";
import Inventory from "./Inventory";
import Stats from "./Stats";
import moment from "moment";
import {Link} from "react-router-dom";
import "./Loadout.css";
import CreatableSelect from 'react-select/creatable';
import _ from 'lodash';
import LoadoutStore from "../../store/LoadoutStore";
import {toast} from "react-toastify";
import {TOAST_DELAY} from "../../config/constants";
import PopupMenu from "../../utils/PopupMenu";
import TextPopup from "./TextPopup";
import {loadout2setup, setup2loadout} from "../../utils/inventory-setups";
import {currentUser} from "../../utils/base";

class Loadout extends React.Component {
    toastId = null;

    constructor(props) {
        super(props);

        this.state = {
            id: props.match.params.id,
            loadout: this.empty(),
            status: "Loading...",
            showExportImport: null,
        };
    }

    componentDidMount() {
        if (this.state.id == null) {
            let loadout = _.cloneDeep(this.state.loadout);
            loadout.title = "New Loadout";
            this.setState({loadout});
            return;
        }

        LoadoutStore.get(this.state.id).then(r => {
            this.setState({loadout: r.data});
            this.forceUpdate();
        }).catch(reason => {
            console.log("failed to get loadout", reason.response);
            toast.error("Failed to get loadout: " + reason.toString());
            this.setState({status: "Not Found", loadout: null})
        })
    }

    empty() {
        return {
            id: '',
            title: "Loading...",
            author: {
                id: "",
                username: "",
            },
            description: "",
            created: new Date(),
            updated: new Date(),
            copies: 0,
            favorites: 0,
            favorited: false,
            views: 0,
            tags: [],
            parent: '',
            inventory: [
                [this.z(null, 1), this.z(null, 1), this.z(null, 1), this.z(null, 1)],
                [this.z(null, 1), this.z(null, 1), this.z(null, 1), this.z(null, 1)],
                [this.z(null, 1), this.z(null, 1), this.z(null, 1), this.z(null, 1)],
                [this.z(null, 1), this.z(null, 1), this.z(null, 1), this.z(null, 1)],
                [this.z(null, 1), this.z(null, 1), this.z(null, 1), this.z(null, 1)],
                [this.z(null, 1), this.z(null, 1), this.z(null, 1), this.z(null, 1)],
                [this.z(null, 1), this.z(null, 1), this.z(null, 1), this.z(null, 1)],
            ],
            equipment: {
                head: {id: null, quantity: 1},
                cape: {id: null, quantity: 1},
                neck: {id: null, quantity: 1},
                ammo: {id: null, quantity: 1},
                weapon: {id: null, quantity: 1},
                body: {id: null, quantity: 1},
                shield: {id: null, quantity: 1},
                legs: {id: null, quantity: 1},
                hands: {id: null, quantity: 1},
                feet: {id: null, quantity: 1},
                ring: {id: null, quantity: 1},
            },
        }
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

    saveLoadout = () => {
        console.log(this.state.loadout);
        this.toastId = toast("Saving loadout...", {autoClose: false});
        let close = (msg, type = toast.TYPE.INFO) => {
            toast.update(this.toastId, {render: msg, type: type, autoClose: TOAST_DELAY});
        };
        if (this.state.id == null) {
            LoadoutStore.create(this.state.loadout).then(r => {
                close("Created ✔");
                this.props.history.push(`/l/${r.data.id}`)
            }).catch(reason => {
                console.log("failed to create loadout", reason.response);
                close("Failed to create loadout: " + reason.toString(), toast.TYPE.ERROR);
            })
        } else {
            LoadoutStore.update(this.state.id, this.state.loadout).then(r => {
                close("Saved ✔︎");
                this.setState({loadout: r.data});
                this.forceUpdate();
            }).catch(reason => {
                let resp = reason.response;
                console.log("failed to save loadout", resp);

                if (resp != null && resp.status === 403) {
                    close("Permission denied", toast.TYPE.ERROR);
                    return
                }

                close("Failed to save loadout: " + reason.toString(), toast.TYPE.ERROR);
            })
        }
    };

    isOwner() {
        return this.state.loadout.author.id === currentUser().uid
    }

    render() {
        if (this.state.loadout == null) {
            return <span>{this.state.status}</span>
        }

        let isOwner = this.isOwner()
        let created = moment(this.state.loadout.created);
        let updated = moment(this.state.loadout.updated);

        return (
            <div>
                <h4>
                    <div contentEditable={this.isOwner()} onBlur={(e) => {
                        let loadout = _.cloneDeep(this.state.loadout);
                        loadout.title = e.target.textContent;
                        this.setState({loadout})
                    }}>
                        {this.state.loadout.title}
                    </div>
                </h4>
                <div className="Loadout-header">
                    <div className="Loadout-top">
                        <textarea focusa readOnly={!this.isOwner()} rows={6} className="Loadout-description" value={this.state.loadout.description}
                                  onChange={(e) => {
                                      let loadout = _.cloneDeep(this.state.loadout);
                                      loadout.description = e.target.value;
                                      this.setState({loadout})
                                  }}/>
                        <div className="Loadout-info">
                            <div className="Loadout-info-stats">
                                { this.isOwner() && <button onClick={this.saveLoadout}>Save</button>}
                                <PopupMenu style={{float: "right"}}  options={this.getLoadoutOptions()}/>
                            </div>


                            <span>Author: <Link
                                to={"/u/" + this.state.loadout.author.username}>{this.state.loadout.author.username}</Link></span>
                            <span
                                title={created.format('MMM Do YY, h:mm:ss a')}>Created: {created.format('MMM Do YYYY')}</span>
                            <span title={updated.format('MMM Do YY, h:mm:ss a')}>Updated: {updated.fromNow()}</span>
                            {/*<div className="Loadout-info-stats">*/}
                            {/*    <span title="views"><FontAwesomeIcon*/}
                            {/*        icon={faEye}/>: {Humanize.compactInteger(this.state.loadout.views, 1)}</span>*/}
                            {/*    <span title="favorites"><FontAwesomeIcon*/}
                            {/*        icon={faStar}/>: {Humanize.compactInteger(this.state.loadout.favorites, 1)}</span>*/}
                            {/*    <span title="copies"><FontAwesomeIcon*/}
                            {/*        icon={faCodeBranch}/>: {Humanize.compactInteger(this.state.loadout.copies, 1)}</span>*/}
                            {/*</div>*/}
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
                    <Inventory onInvyChange={this.onInvyChange} items={this.state.loadout.inventory} isOwner={isOwner}/>
                    <Equipment onEquipChange={this.onEquipChange} items={this.state.loadout.equipment} isOwner={isOwner}/>
                    <Stats items={this.state.loadout.equipment}/>
                    { /****** QUANTITY POPUP ******/
                        this.state.showExportImport != null &&
                        <TextPopup text={this.getExportImportText()}
                                   showSave={this.state.showExportImport === 'import'}
                                   onSave={this.saveImport}
                                   onClose={() => {
                                       this.setState({showExportImport: null})
                                   }}
                        />
                    }
                </div>
            </div>
        );
    }

    getLoadoutOptions() {
        const opts = [{
            action: 'Export',
            onClick: () => this.setState({showExportImport: 'export'}),
            includeName: false,
            name: "Loadout"
        }];

        if (this.isOwner()) {
            opts.push({
                    action: 'Import',
                    onClick: () => this.setState({showExportImport: 'import'}),
                    includeName: false,
                    name: "Loadout"
                },
                {
                    action: 'Delete',
                    onClick: () => {
                        if (this.state.loadout.id === "") {
                            return;
                        }
                        this.toastId = toast("Deleting loadout...", {autoClose: false});
                        let close = (msg, type = toast.TYPE.INFO) => {
                            toast.update(this.toastId, {render: msg, type: type, autoClose: TOAST_DELAY});
                        };
                        console.log("delete", this.state.loadout.id)
                        LoadoutStore.delete(this.state.id).then(r => {
                            close("Loaded deleted ✔︎");
                            this.props.history.push(`/loadouts`);
                        }).catch(reason => {
                            let resp = reason.response;
                            console.log("failed to save loadout", reason);

                            if (resp != null && resp.status === 403) {
                                close("Permission denied", toast.TYPE.ERROR);
                                return
                            }

                            close("Failed to save loadout: " + reason.toString(), toast.TYPE.ERROR);
                        })
                    },
                    includeName: false,
                    name: "Loadout"
                })
        }

        return opts
    }

    getExportImportText() {
        if (this.state.showExportImport === 'export') {
            const config = {
                highlightColor: {
                    "value": -65536,
                    "falpha": 0
                },
                stackDifference: false,
                variationDifference: false,
                highlightDifference: true,
                filterBank: true,
                unorderedHighlight: true,
                name: this.state.loadout.title,
            }
            let setup = loadout2setup(this.state.loadout)
            return JSON.stringify({...setup, ...config});
        }

        return "";
    }

    saveImport = (text) => {
        let cleanup = () => {
            this.setState({showExportImport: null})
        }
        if (text == null) {
            cleanup()
            return
        }
        text = text.trim()
        if (text === "") {
            cleanup()
            return
        }

        const setup = JSON.parse(text);
        const setUploadout = setup2loadout(setup)
        const loadout = _.cloneDeep(this.state.loadout);
        loadout.inventory = setUploadout.inventory;
        loadout.equipment = setUploadout.equipment;
        loadout.title = setUploadout.title;
        this.setState({loadout, showExportImport:null});
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
        if (event.key === 'Enter' || event.key === 'Tab') {
            let vals = [...value];
            inputValue.split(" ").forEach(v => {
                v = v.trim().toLowerCase();
                if (v === "") {
                    return;
                }

                vals.push(this.createOption(v));
            });
            vals = [...new Map(vals.map(item => [item.value, item])).values()];
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (_.isEqual(this.props.tags, prevProps.tags)) {
            return;
        }

        this.setState({value: this.props.tags.map(t => this.createOption(t))});
    }

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


