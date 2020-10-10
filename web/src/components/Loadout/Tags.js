import _ from "lodash";
import React from 'react';
import PropTypes from "prop-types";
import Select from "react-select";


class CreatableInputOnly extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            value: this.props.tags.map(t => this.createOption(t)),
        };
    }

    createOption = (label) => ({
        label,
        value: label,
        clearableValue: this.props.isOwner,
    });

    handleChange = (value, actionMeta) => {
        if (value == null) value = [];

        this.setState({value});
        this.update(value);
    };

    handleInputChange = (inputValue) => {
        this.setState({inputValue});
    };

    handleKeyDown = (event) => {
        const {inputValue, value} = this.state;
        if (!inputValue) return;
        if (event.key === 'Enter' || event.key === 'Tab') {
            let vals = [...value];
            inputValue.split(" ").forEach(v => {
                v = v.trim().toLowerCase();
                if (v === "") {
                    return;
                }

                vals.push(this.createOption(v));
            });
            vals = [...new Map(vals.map(item => [item.value, item])).values()];
            this.setState({
                inputValue: '',
                value: vals,
            });
            this.update(vals);
            event.preventDefault();
        }
    };

    update = (values) => {
        if (values == null) {
            values = [];
        }
        this.props.onChange(values.map(v => v.value));
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (_.isEqual(this.props.tags, prevProps.tags)) {
            return;
        }

        if (this.props.tags == null) {
            return;
        }

        this.setState({value: this.props.tags.map(t => this.createOption(t))});
    }

    render() {
        const {inputValue, value} = this.state;
        return (
            <Select
                styles={customStyles}
                components={{DropdownIndicator: null}}
                isSearchable={this.props.isOwner}
                isClearable={this.props.isOwner}
                isDisabled={!this.props.isOwner}
                inputValue={inputValue}
                isMulti
                menuIsOpen={false}
                onChange={this.handleChange}
                onInputChange={this.handleInputChange}
                onKeyDown={this.handleKeyDown}
                placeholder={this.props.isOwner ? "enter tags..." : ""}
                value={value}
            />
        );
    }
}

const customStyles = {
    multiValueRemove: (base, state) => ({
        ...base,
        display: state.selectProps.isClearable ? base.display : 'none',
    }),
    placeholder: (provided, state) => ({
        ...provided,
        color: 'white',
    }),
    input: (provided, state) => ({
        ...provided,
        color: 'white',
    }),
    control: (provided, state) => ({
        ...provided,
        background: 'rgba(93,84,71,0.25)',
        color: 'white',
        border: 'none',
        boxShadow: 'none',
    }),
};

CreatableInputOnly.propTypes = {
    isOwner: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    tags: PropTypes.arrayOf(String),
};

export default CreatableInputOnly;