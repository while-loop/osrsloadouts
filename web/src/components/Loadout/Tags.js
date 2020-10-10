import _ from "lodash";
import CreatableSelect from "react-select/creatable/dist/react-select.esm";
import React from 'react';


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
            <CreatableSelect
                styles={customStyles}
                components={{DropdownIndicator: null}}
                inputValue={inputValue}
                isMulti
                menuIsOpen={false}
                onChange={this.handleChange}
                onInputChange={this.handleInputChange}
                onKeyDown={this.handleKeyDown}
                placeholder="enter tags..."
                value={value}
            />
        );
    }
}

const customStyles = {
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
    }),
};

export default CreatableInputOnly;