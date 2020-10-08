import React from 'react'
import PropTypes from "prop-types";
import "./RSButton.css"

class RSPopup extends React.Component {
    render() {
        return (
            <div
                className={"RSPopup"}
                style={{
                    width: this.props.width || 68,
                    height: this.props.height || 32,
                    fontSize: this.props.fontSize || 16,
                }}>
                <div className={"RSWidget-close"}/>
                {this.props.children}
            </div>
        );
    }
}

RSPopup.propTypes = {
    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    height: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    onClick: PropTypes.func,
    fontSize: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
};

export default RSPopup;