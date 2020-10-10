import React from 'react'
import PropTypes from "prop-types";
import "./RSPopup.css"
import Popup from "reactjs-popup";
import RSWidget from "../RSWidget/RSWidget";

class RSPopup extends React.Component {
    render() {
        return (
            <Popup
                open={true}
                closeOnDocumentClick
                contentStyle={{width: 'auto', padding: 0, border: 'none'}}
                position={['top center']}
                onClose={this.props.onClose}>
                <RSWidget {...this.props}>
                    {this.props.children}
                </RSWidget>
            </Popup>
        );
    }
}

RSPopup.propTypes = {
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
    ]),
    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    height: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    onClose: PropTypes.func,
    fontSize: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    closeable: PropTypes.bool
};

export default RSPopup;