import Popup from "reactjs-popup";

import React from 'react';
import './Loadout.css'


class QuantityPopup extends React.Component {

    state = {
        quantity: this.props.quantity,
    };

    closeModal = () => {
        this.props.onClose(this.state.quantity);
    };

    render() {
        return (
            <Popup
                open={true}
                closeOnDocumentClick
                contentStyle={{width: 'auto'}}
                position={['top center']}
                onClose={this.closeModal}>
                <div className="modal">
                    <span className="close" onClick={this.closeModal}>&times;</span>
                    <input size="7" type="number" placeholder="quantity"
                           autoFocus={true}
                           onChange={(e) => {if (e.target.value > 0) this.setState({quantity: e.target.value})}}
                           onKeyUp={(e) => {
                               if (e.key === "Enter") this.closeModal()
                           }}/>
                </div>
            </Popup>
        )
    }
}

export default QuantityPopup;