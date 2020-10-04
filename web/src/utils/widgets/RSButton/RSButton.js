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
                    fontSize: this.props.fontSize,
                }}>
                {this.props.children}
            </button>
        );
    }
}

RSButton.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    onClick: PropTypes.func,
    fontSize: PropTypes.string,
};

export default RSButton;