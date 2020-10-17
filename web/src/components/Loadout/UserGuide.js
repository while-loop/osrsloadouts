import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";

class UserGuide extends React.Component {

    state = {
        showGuide: false,
    }

    render() {
        return (
            <div style={{paddingTop: this.props.paddingTop || 36}}>
                        <span
                            style={{cursor: 'pointer'}}
                            onClick={() => this.setState({showGuide: !this.state.showGuide})}>
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
                        <li>Export/Import tabs to the <a href="https://github.com/dillydill123/inventory-setups">Inventory
                            Setups</a> plugin on <a href="https://runelite.net/plugin-hub">RuneLite's
                            Plugin Hub</a></li>
                        <li>Export tabs to the RuneLite's <a href="https://github.com/runelite/runelite/wiki/Bank-Tags">Bank Tags</a> plugin</li>
                    </ul>
                }
            </div>
        );
    }
}

export default UserGuide;