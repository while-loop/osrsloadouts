import React from 'react'
import PropTypes from "prop-types";
import "./RSWidget.css"
import widget from "./widget.png"
import widgetSmall from "./widget_small.png"

class RSWidget extends React.Component {
    static DEFAULT_WIDTH = 418
    static DEFAULT_HEIGHT = 295

    closeModal = (e) => {
        this.props.onClose(e);
    };

    render() {
        const style = {
            width: this.props.width || RSWidget.DEFAULT_WIDTH,
            height: this.props.height || RSWidget.DEFAULT_HEIGHT,
            fontSize: this.props.fontSize || 16,
            padding: this.props.padding || 0,
            background: `transparent url(${this.props.small ? widgetSmall : widget}) no-repeat`

        }
        const headerProps = this.props.header;
        let headerStyle = {}
        if (headerProps != null) {
            headerStyle = {
                padding: this.props.header.padding || 0
            }
        }
        style.backgroundSize = style.width + "px " + style.height + "px"
        // const heightScale = style.height / RSWidget.DEFAULT_HEIGHT;

        return (
            <div
                className="RSWidget"
                style={style}>

                <div className="RSWidget-header" style={headerStyle}>
                    {this.props.title}
                    {this.props.closeable && <div className="RSWidget-close" onClick={this.closeModal}/>}
                </div>

                <div className="RSWidget-content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

RSWidget.propTypes = {
    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    height: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    title: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
    ]),
    fontSize: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    padding: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    closeable: PropTypes.bool,
    small: PropTypes.bool
};

export default RSWidget;