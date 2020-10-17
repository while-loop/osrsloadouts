import React from 'react';
import Equipment from "./Equipment";
import Inventory from "./Inventory";
import Stats from "./Stats";
import moment from "moment";
import {Link} from "react-router-dom";
import "./Loadout.css";
import _ from 'lodash';
import LoadoutStore from "../../store/LoadoutStore";
import {toast} from "react-toastify";
import {TOAST_DELAY} from "../../config/constants";
import PopupMenu from "../../utils/PopupMenu";
import TextPopup from "./TextPopup";
import {loadout2setup, setup2loadout} from "../../utils/inventory-setups";
import {currentUser} from "../../utils/base";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy, faEye, faHeart as heartSolid, faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";
import {faHeart as heartOutline} from "@fortawesome/free-regular-svg-icons";
import Humanize from "humanize-plus";
import RSButton from "../../utils/widgets/RSButton/RSButton";
import UserGuide from "./UserGuide";
import RunePouch from "./RunePouch";
import CreatableInputOnly from "./Tags";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import "./react-tabs.css"
import PriceTable from "./PriceTable";
import {colorNumber, normalizeNumber} from "../../utils/js";
import Menu from "./Menu";

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
            exportImportTab: null,
            showGuide: false,
            activeTab: 0,
            totalGp: null,
            showPrices: false,
            showTabMenu: null,
            tabMenuTop: 0,
            tabMenuLeft: 0,
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
            this.setState({loadout: r.data, id: r.data.id});
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
            tabs: [this.emptyTab()],
        }
    }

    emptyTab(title = "default") {
        return {
            title: title,
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
        };
    }

    z(id, q) {
        return {id: id, quantity: q}
    }

    onEquipChange = (ss) => {
        const loadout = _.cloneDeep(this.state.loadout);
        loadout.tabs[this.state.activeTab].equipment[ss.slotType] = this.z(ss.id, ss.quantity);
        this.setState({loadout});
    };

    onPriceChange = (newTotalGp) => {
        this.setState({totalGp: newTotalGp});
    };

    togglePrices = (e) => {
        this.setState({showPrices: e.target.checked});
    };

    onRunePouchChange = (sss) => {
        if (!Array.isArray(sss)) {
            sss = [sss];
        }

        const loadout = _.cloneDeep(this.state.loadout);
        sss.forEach(ss => {
            loadout.tabs[this.state.activeTab].rune_pouch[ss.col] = this.z(ss.id, ss.quantity);
        });
        this.setState({loadout});
    };

    onInvyChange = (sss) => {
        if (!Array.isArray(sss)) {
            sss = [sss];
        }
        const loadout = _.cloneDeep(this.state.loadout);
        sss.forEach(ss => {
            loadout.tabs[this.state.activeTab].inventory[ss.row][ss.col] = this.z(ss.id, ss.quantity);
        });
        this.setState({loadout});
    };

    onTabSelected = (index) => {
        this.setState({activeTab: index, showPrices: this.state.showPrices})
    }

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
            this.setState({loadout: r.data, id: r.data.id})
            this.forceUpdate();
        }).catch(reason => {
            console.log("failed to copy loadout", reason);
            close("Failed to copy loadout: " + reason.toString(), toast.TYPE.ERROR);
        })
    }

    addTab = (tab=null) => {
        let loadout = _.cloneDeep(this.state.loadout);
        if (tab == null) {
            tab = this.emptyTab("new tab")
        }
        loadout.tabs.push(tab)
        this.setState({loadout: loadout, activeTab: loadout.tabs.length - 1})
    }

    onAddTab = (e) => {
        this.addTab();
    }

    deleteTab = (idx) => {
        let loadout = _.cloneDeep(this.state.loadout);

        // check if active tab is the one getting deleted
        let newIdx = this.state.activeTab;
        if (loadout.tabs.length <= 1) {
            newIdx = 0
            loadout.tabs[0] = this.emptyTab()
        } else {
            loadout.tabs.splice(idx, 1)
            // if we're deleting the current tab, switch to the previous tab.
            // or if it's less than the current tab, shift over by 1
            if (idx === newIdx || idx < newIdx) {
                newIdx = Math.max(0, newIdx - 1)
            }
        }

        this.setState({loadout: loadout, activeTab: newIdx})
    }

    onDeleteTab = (idx) => {
        return (action, e) => {
            e.stopPropagation()
            this.deleteTab(idx)
        }
    }

    updateTabTitle = (idx) => {
        return (e) => {
            e.stopPropagation()
            let loadout = _.cloneDeep(this.state.loadout);
            loadout.tabs[idx].title = e.target.textContent;
            this.setState({loadout})
        }
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

    hasRunePouch = (loadoutTab) => {
        for (let i = 0; i < loadoutTab.inventory.length; i++) {
            for (let j = 0; j < loadoutTab.inventory[i].length; j++) {
                if (Loadout.RUNE_POUCH_IDS.includes(loadoutTab.inventory[i][j].id)) {
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

        const tabHeaders = []
        const tabPanels = []

        this.state.loadout.tabs.forEach((tab, idx) => {
            tabHeaders.push(
                <Tab key={idx} onContextMenu={this.onTabContextMenu(tab, idx)}>
                    <div className="Tab-container" >
                        <span
                            className="Tab-title"
                            contentEditable={isOwner}
                            suppressContentEditableWarning
                            onBlur={this.updateTabTitle(idx)}>
                            {tab.title}
                        </span>
                    </div>
                </Tab>
            )

            tabPanels.push(
                <TabPanel key={idx}>
                    <div className="Loadout-content">
                        <div className="Equipment-container">
                            <div className="Equipment-container-left">
                                <Inventory onInvyChange={this.onInvyChange} items={tab.inventory}
                                           isOwner={isOwner}/>
                                <Equipment onEquipChange={this.onEquipChange} items={tab.equipment}
                                           isOwner={isOwner}/>
                            </div>
                            {
                                this.hasRunePouch(tab) &&
                                <RunePouch onRunePouchChange={this.onRunePouchChange}
                                           items={tab.rune_pouch}
                                           isOwner={isOwner}/>
                            }
                        </div>

                        <div className="Equipment-stats-container">
                            {
                                this.state.totalGp != null &&
                                <div>
                                    <span>GE Prices&nbsp;</span>
                                    <label className="switch">
                                        <input type="checkbox" checked={this.state.showPrices}
                                               onChange={this.togglePrices}/>
                                        <span className="slider round"/>
                                    </label>
                                    <span
                                        style={{textShadow: '1px 1px black'}}>&nbsp;{colorNumber(this.state.totalGp)}</span>
                                </div>

                            }
                            <Stats items={tab.equipment}/>
                        </div>
                    </div>
                    <PriceTable
                        style={{width: 420, margin: 'auto', padding: 16}}
                        show={this.state.showPrices}
                        invy={tab.inventory}
                        eq={tab.equipment}
                        rp={tab.rune_pouch}
                        onPriceChange={this.onPriceChange}/>

                </TabPanel>
            )
        })

        if (isOwner) {
            tabHeaders.push(
                <span key={tabHeaders.length} className="react-tabs__tab Tab-add" onClick={this.onAddTab}>
                    <FontAwesomeIcon size={"xs"} icon={faPlus}/>
                </span>
            )
        }

        return (
            <div>
                <h1>
                    <div contentEditable={isOwner} suppressContentEditableWarning onBlur={(e) => {
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
                            <textarea readOnly={!isOwner} rows={6} className="Loadout-description"
                                      value={this.state.loadout.description}
                                      placeholder={isOwner ? "enter description..." : ""}
                                      style={{fontSize: 14}}
                                      onChange={(e) => {
                                          let loadout = _.cloneDeep(this.state.loadout);
                                          loadout.description = e.target.value;
                                          this.setState({loadout})
                                      }}/>
                        </div>
                        <div className="Loadout-info">
                            <div className="Loadout-info-stats">
                                {isOwner &&
                                <RSButton width={45} height={20} onClick={this.saveLoadout}>Save</RSButton>}
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
                                        style={{cursor: loggedIn ? "pointer" : ""}}
                                        onClick={loggedIn ? this.favLoadout : null}
                                        icon={this.state.loadout.favorited ? heartSolid : heartOutline}/>
                                        : {Humanize.compactInteger(this.state.loadout.favorites, 1)}
                                </span>
                                <span
                                    title={"copies: " + this.state.loadout.copies}>
                                    <FontAwesomeIcon
                                        style={{cursor: loggedIn ? "pointer" : ""}}
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
                                                isOwner={isOwner}
                                                onChange={(tags) => this.setState(state => {
                                                    state.loadout.tags = tags;
                                                })}/>
                        </div>
                    </div>
                </div>

                <Tabs style={{paddingTop: 16}} selectedIndex={this.state.activeTab} onSelect={this.onTabSelected}>
                    <TabList>
                        {tabHeaders}
                    </TabList>
                    {tabPanels}
                </Tabs>

                <div>
                    { /****** IMPORT/EXPORT MENU POPUP ******/
                        this.state.showExportImport != null &&
                        <TextPopup text={this.getExportImportText()}
                                   showSave={this.state.showExportImport === 'import'}
                                   onSave={this.saveImport}
                                   onClose={() => {
                                       this.setState({showExportImport: null, exportImportTab: null})
                                   }}
                        />
                    }
                    { /****** TAB MENU POPUP ******/
                        this.state.showTabMenu != null &&
                        <Menu options={this.getTabOptions()}
                              onClose={this.onTabMenuClose}
                              name={""}
                              left={this.state.tabMenuLeft}
                              top={this.state.tabMenuTop}/>
                    }
                    <UserGuide/>
                </div>
            </div>
        );
    }

    getLoadoutOptions() {
        const opts = [];

        if (this.isOwner()) {
            opts.push({
                    action: 'Delete',
                    onClick: () => {
                        if (this.state.loadout.id === "") {
                            return;
                        }
                        this.toastId = toast("Deleting loadout...", {autoClose: false});
                        let close = (msg, type = toast.TYPE.INFO) => {
                            toast.update(this.toastId, {render: msg, type: type, autoClose: TOAST_DELAY});
                        };

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

                            close("Failed to delete loadout: " + reason.toString(), toast.TYPE.ERROR);
                        })
                    },
                    includeName: false,
                    name: "Loadout"
                })
        }

        return opts
    }

    onTabMenuClose = (e) => {
        this.setState({
            showTabMenu: null,
        })
    }

    getTabOptions = () => {
        const opts = [{
            action: 'Copy',
            onClick: () => this.addTab(this.state.loadout.tabs[this.state.showTabMenu]),
            includeName: false,
            name: "Tab"
        },{
            action: 'Export',
            onClick: () => this.setState({showExportImport: 'export', exportImportTab: this.state.showTabMenu}),
            includeName: false,
            name: "Tab"
        }];

        if (this.isOwner()) {
            opts.push({
                    action: 'Import',
                    onClick: () => this.setState({showExportImport: 'import', exportImportTab: this.state.showTabMenu}),
                    includeName: false,
                    name: "Tab"
                },
                {
                    action: 'Delete',
                    onClick: this.onDeleteTab(this.state.showTabMenu),
                    includeName: false,
                    name: "Tab"
                })
        }

        return opts
    }

    onTabContextMenu = (tab, idx) => {
        return (e) => {
            e.preventDefault();
            this.setState({
                showTabMenu: idx,
                tabMenuTop: e.clientY - 8,
                tabMenuLeft: e.clientX - 32,
            });
        }
    };

    getExportImportText() {
        if (this.state.showExportImport === 'import') {
            return ""
        }

        if (this.state.showExportImport == null) {
            return ""
        }

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
            name: this.state.loadout.tabs[this.state.exportImportTab].title,
        }

        let setup = loadout2setup(this.state.loadout.tabs[this.state.exportImportTab], this.state.loadout.description)
        return JSON.stringify({...setup, ...config});
    }

    saveImport = (text) => {
        let cleanup = () => {
            this.setState({showExportImport: null, exportImportTab: null})
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
        loadout.tabs[this.state.exportImportTab].rune_pouch = setUploadout.rune_pouch;
        loadout.tabs[this.state.exportImportTab].inventory = setUploadout.inventory;
        loadout.tabs[this.state.exportImportTab].equipment = setUploadout.equipment;
        loadout.tabs[this.state.exportImportTab].title = setUploadout.title;
        this.setState({loadout, showExportImport: null, exportImportTab: null, activeTab: this.state.exportImportTab});
    }
}

export default Loadout;


