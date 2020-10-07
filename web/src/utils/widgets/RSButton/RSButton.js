import React from 'react'
import PropTypes from "prop-types";
import "./RSButton.css"

class RSButton extends React.Component {
    render() {
        return (
            <button
                className={"RSButton"}
                onClick={this.props.onClick}
                style={{
                    width: this.props.width || 68,
                    height: this.props.height || 32,
                    fontSize: this.props.fontSize || 16,
                }}>
                {this.props.children}
            </button>
        );
    }
}

RSButton.propTypes = {
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

export default RSButton;