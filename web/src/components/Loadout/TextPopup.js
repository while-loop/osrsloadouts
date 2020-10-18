import Popup from "reactjs-popup";

import React from 'react';
import './Loadout.css'
import PropTypes from "prop-types";
import RSPopup from "../../utils/widgets/RSPopup/RSPopup";
import RSButton from "../../utils/widgets/RSButton/RSButton";


class TextPopup extends React.Component {

    state = {
        text: this.props.text,
    };

    onSave = (save) => {
        if (save) {
            this.props.onSave(this.state.text);
        } else {
            this.props.onClose();
        }
    };

    render() {
        return (
            <RSPopup
                title={`${this.props.showSave ? "Import" : "Export"} Tab`}
                onClose={() => this.onSave(false)}
                padding={"0 0 0 0"}
                header={{padding: "13px 0 0 0"}}
                closeable>
                    <textarea rows={this.props.showSave ? 14 : 17}
                              cols={70}
                              style={{background: 'transparent', marginTop: 16, resize: 'none', outline: 'none', color: '#ff9301'}}
                              value={this.state.text}
                              onChange={(e) => {
                                  this.setState({text: e.target.value})
                              }}/>
                {
                    this.props.showSave && <RSButton onClick={() => this.onSave(true)}>Save</RSButton>
                }
            </RSPopup>
        )
    }
}

TextPopup.propTypes = {
    title: PropTypes.string
};

export default TextPopup;