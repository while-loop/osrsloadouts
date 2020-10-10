import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import Menu from "../components/Loadout/Menu";


class PopupMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }

    toggleMenu = () => {
        this.setState({open: !this.state.open})
    }

    onItemMenuClose = () => {
        this.setState({open: false})
    }

    render() {
        return (
            <div>
                <FontAwesomeIcon
                    className="Hoverable"
                    onClick={this.toggleMenu}
                    title="menu"
                    color="rgba(0, 0, 0, 0.75)"
                    icon={faBars}/>
                { /****** RIGHT CLICK MENU ******/
                    this.state.open &&
                    <Menu options={this.props.options}
                          onClose={this.onItemMenuClose}
                          name={""}/>
                }
            </div>
        )
    }
}

export default PopupMenu;
