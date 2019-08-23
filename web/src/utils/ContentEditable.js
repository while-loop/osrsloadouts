import React from "react";

class ContentEditable extends React.Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.html !== this.getDOMNode().innerHTML;
    }

    emitChange = () => {
        var html = this.getDOMNode().innerHTML;
        if (this.props.onChange && html !== this.lastHtml) {

            this.props.onChange({
                target: {
                    value: html
                }
            });
        }
        this.lastHtml = html;
    };

    render() {
        return (
            <div>
                onInput={this.emitChange}
                onBlur={this.emitChange}
                contentEditable
                dangerouslySetInnerHTML={{__html: this.props.html}}>
            </div>
        );
    }
}