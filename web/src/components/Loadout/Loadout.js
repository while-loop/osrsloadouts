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
import RSButton from "../../utils/widgets/RSButton/RSButton";
import UserGuide from "./UserGuide";
import RunePouch from "./RunePouch";

class Loadout extends React.Component {
    toastId = null;

    static RUNE_POUCH_IDS = [12791, 23650]

    constructor(props) {
        super(props);

        this.state = {
            id: props.match.params.id,
            loadout: this.empty(),
            status: "Loading...",
            showExportImport: null,
            showGuide: false
        };


        if (this.props.location.loadout != null) {
            this.state.loadout = this.props.location.loadout;
        }
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
                head: this.z(null, 1),
                cape: this.z(null, 1),
                neck: this.z(null, 1),
                ammo: this.z(null, 1),
                weapon: this.z(null, 1),
                body: this.z(null, 1),
                shield: this.z(null, 1),
                legs: this.z(null, 1),
                hands: this.z(null, 1),
                feet: this.z(null, 1),
                ring: this.z(null, 1),
            },
            rune_pouch: [this.z(null, 1), this.z(null, 1), this.z(null, 1)]
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

    onRunePouchChange = (sss) => {
        if (!Array.isArray(sss)) {
            sss = [sss];
        }

        const loadout = _.cloneDeep(this.state.loadout);
        sss.forEach(ss => {
            loadout.rune_pouch[ss.col] = this.z(ss.id, ss.quantity);
        });
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

    hasRunePouch() {
        for (let i = 0; i < this.state.loadout.inventory.length; i++) {
            for (let j = 0; j < this.state.loadout.inventory[i].length; j++) {
                if (Loadout.RUNE_POUCH_IDS.includes(this.state.loadout.inventory[i][j].id)) {
                    return true
                }
            }
        }

        return false
    }

    render() {
        if (this.state.loadout == null) {
            return <span>{this.state.status}</span>
        }

        let loggedIn = currentUser() != null
        let isOwner = this.isOwner()
        let created = moment(this.state.loadout.created);
        let updated = moment(this.state.loadout.updated);
        let author = this.state.loadout.author != null ? this.state.loadout.author.username : "";

        return (
            <div>
                <h1>
                    <div contentEditable={this.isOwner()} onBlur={(e) => {
                        let loadout = _.cloneDeep(this.state.loadout);
                        loadout.title = e.target.textContent;
                        this.setState({loadout})
                    }}>
                        {this.state.loadout.title}
                    </div>
                </h1>

                <div className="Loadout-header">
                    <div className="Loadout-top">
                        <div className="Loadout-description-container Shadowed">
                            <textarea readOnly={!this.isOwner()} rows={6} className="Loadout-description"
                                      value={this.state.loadout.description}
                                      placeholder={"enter description..."}
                                      style={{fontSize: 14}}
                                      onChange={(e) => {
                                          let loadout = _.cloneDeep(this.state.loadout);
                                          loadout.description = e.target.value;
                                          this.setState({loadout})
                                      }}/>
                        </div>
                        <div className="Loadout-info">
                            <div className="Loadout-info-stats">
                                {this.isOwner() && <RSButton width={45} height={20} onClick={this.saveLoadout}>Save</RSButton>}
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
                    <div className="Equipment-container">
                        <div className="Equipment-container-left">
                            <Inventory onInvyChange={this.onInvyChange} items={this.state.loadout.inventory} isOwner={isOwner}/>
                            <Equipment onEquipChange={this.onEquipChange} items={this.state.loadout.equipment} isOwner={isOwner}/>
                        </div>
                        {
                            this.hasRunePouch() && <RunePouch onRunePouchChange={this.onRunePouchChange} items={this.state.loadout.rune_pouch} isOwner={isOwner}/>
                        }
                    </div>

                    <div className="Equipment-stats-container">
                        <Stats items={this.state.loadout.equipment}/>
                    </div>
                </div>

                <div>
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
                    <UserGuide/>
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


