import Popup from "reactjs-popup";

import React from 'react';
import './Loadout.css'


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
            <Popup
                open={true}
                closeOnDocumentClick
                contentStyle={{width: 'auto'}}
                position={['top center']}
                onClose={() => this.onSave(false)}>
                <div className="modal">
                    <span className="close" onClick={() => this.onSave(false)}>&times;</span>
                    <textarea rows={20} cols={100} className="Loadout-description" value={this.state.text}
                    onChange={(e) => {
                        this.setState({text: e.target.value})
                    }}/>
                    {
                        this.props.showSave && <button onClick={() => this.onSave(true)}>Save</button>
                    }
                </div>
            </Popup>
        )
    }
}

export default TextPopup;