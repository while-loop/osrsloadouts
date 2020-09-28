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
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash, faHeart as heartSolid, faCopy} from "@fortawesome/free-solid-svg-icons";
import {faHeart as heartOutline} from "@fortawesome/free-regular-svg-icons";
import Humanize from "humanize-plus";

class Loadout extends React.Component {
    toastId = null;

    constructor(props) {
        super(props);

        this.state = {
            id: props.match.params.id,
            loadout: this.empty(),
            status: "Loading...",
            showExportImport: null,
            showGuide: false
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
            this.setState({loadout: r.data, id:r.data.id});
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
            LoadoutStore.update(this.state.loadout).then(r => {
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
        let user = currentUser()
        if (this.state.loadout == null) {
            return true
        }

        let author = this.state.loadout.author
        if (author == null || author.id == null || author.id === "") {
            return true
        }

        return user != null && author.id === user.uid
    }

    copyLoadout = () => {
        if (this.state.loadout.id == null) {
            return
        }
        this.toastId = toast("Copying loadout...", {autoClose: false});
        let close = (msg, type = toast.TYPE.INFO) => {
            toast.update(this.toastId, {render: msg, type: type, autoClose: TOAST_DELAY});
        };

        LoadoutStore.copyLoadout(this.state.loadout.id).then(r => {
            close("Copied ✔")
            this.props.history.push(`/l/${r.data.id}`)
            this.setState({loadout:r.data, id:r.data.id})
            this.forceUpdate();
        }).catch(reason => {
            console.log("failed to copy loadout", reason);
            close("Failed to copy loadout: " + reason.toString(), toast.TYPE.ERROR);
        })
    }
    favLoadout = () => {
        if (this.state.loadout.id == null) {
            return
        }

        const newVal = !this.state.loadout.favorited;
        LoadoutStore.favoriteLoadout(this.state.loadout.id, newVal).then(res => {
        }).catch(reason => {
            console.log("failed to fav loadout", reason);
            toast("Failed to update favorite: " + reason.toString(), {type: toast.TYPE.ERROR, autoClose: TOAST_DELAY});
            this.setState((state) => {
                state.loadout.favorited = !newVal;
                state.loadout.favorites += newVal ? -1 : 1;
                return state
            })
        })
        this.setState((state) => {
            state.loadout.favorited = newVal;
            state.loadout.favorites += newVal ? 1 : -1;
            return state
        })
    }

    render() {
        if (this.state.loadout == null) {
            return <span>{this.state.status}</span>
        }

        let loggedIn = currentUser() != null
        console.log(currentUser())
        let isOwner = this.isOwner()
        let created = moment(this.state.loadout.created);
        let updated = moment(this.state.loadout.updated);
        let author = this.state.loadout.author != null ? this.state.loadout.author.username : "";

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
                        <textarea focusa readOnly={!this.isOwner()} rows={6} className="Loadout-description"
                                  value={this.state.loadout.description}
                                  onChange={(e) => {
                                      let loadout = _.cloneDeep(this.state.loadout);
                                      loadout.description = e.target.value;
                                      this.setState({loadout})
                                  }}/>
                        <div className="Loadout-info">
                            <div className="Loadout-info-stats">
                                {this.isOwner() && <button onClick={this.saveLoadout}>Save</button>}
                                <PopupMenu style={{float: "right"}} options={this.getLoadoutOptions()}/>
                            </div>


                            <span>Author: <Link
                                to={"/u/" + author}>{author}</Link></span>
                            <span
                                title={created.format('MMM Do YY, h:mm:ss a')}>Created: {created.format('MMM Do YYYY')}</span>
                            <span title={updated.format('MMM Do YY, h:mm:ss a')}>Updated: {updated.fromNow()}</span>
                            <div className="Loadout-info-stats">
                                <span title={"views: " + this.state.loadout.views}><FontAwesomeIcon
                                    icon={faEye}/>: {Humanize.compactInteger(this.state.loadout.views, 1)}</span>
                                <span
                                    title={"favorites: " + this.state.loadout.favorites}>
                                    <FontAwesomeIcon
                                        style={{cursor: loggedIn ? "pointer" : "" }}
                                        onClick={loggedIn ? this.favLoadout : null}
                                        icon={this.state.loadout.favorited ? heartSolid : heartOutline}/>
                                        : {Humanize.compactInteger(this.state.loadout.favorites, 1)}
                                </span>
                                <span
                                    title={"copies: " + this.state.loadout.copies}>
                                    <FontAwesomeIcon
                                        style={{cursor: loggedIn ? "pointer" : "" }}
                                        onClick={loggedIn ? this.copyLoadout : null}
                                        icon={faCopy}/>
                                        : {Humanize.compactInteger(this.state.loadout.copies, 1)}
                                </span>
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
                    <Inventory onInvyChange={this.onInvyChange} items={this.state.loadout.inventory} isOwner={isOwner}/>
                    <Equipment onEquipChange={this.onEquipChange} items={this.state.loadout.equipment}
                               isOwner={isOwner}/>
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
                    <div style={{fontSize: '.6em'}}>
                        <br/>
                        <br/>
                        <span
                            style={{cursor: 'pointer'}}
                            onClick={() => this.setState({showGuide: !this.state.showGuide})}
                        >
                            User Guide:&nbsp;&nbsp;&nbsp;&nbsp;
                            {
                                this.state.showGuide && <span>Hide</span>
                            }
                            {
                                !this.state.showGuide && <span>Show</span>
                            }
                            <FontAwesomeIcon
                                title="toggle guide"
                                className="Hoverable"
                                color="rgba(0, 0, 0, 0.75)"
                                icon={this.state.showGuide ? faEye : faEyeSlash}

                            />

                        </span>
                        {
                            this.state.showGuide &&
                            <ul style={{textAlign: 'left'}}>
                                <li>Click an empty inventory/equipment slot to search items</li>
                                <li>Right click items for menu</li>
                                <li>Shift+Click to drop item</li>
                                <li>Ctrl+Click (Cmd+Click on macOS) an empty slot to fill with previously selected
                                    item
                                </li>
                                <li>Drag and Drop items to swap slots</li>
                                <li>Right click stackable items to set quantity</li>
                                <li>Export/Import loadouts to the <code style={{fontSize: '.7em'}}><u>Inventory
                                    Setups</u></code> plugin on <a href="https://runelite.net/plugin-hub">Runelite
                                    Plugin Hub</a></li>
                            </ul>
                        }
                    </div>
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
        this.setState({loadout, showExportImport: null});
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

        if (this.props.tags == null) {
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


