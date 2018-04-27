import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FieldComponent extends Component {
  state = {
    value: this.props.value,
    error: false,
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value });
  }

  onChange = (evt) => {
    const name = this.props.name;
    const value = evt.target.value;
    const error = this.props.validate ? this.props.validate(value) : false;

    this.setState({ value, error });

    this.props.onChange({ name, value, error })
  }

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder={this.props.placeholder}
          name={this.props.name}
          value={this.state.value}
          onChange={this.onChange} />
        <span style={{ color: 'red' }}>{this.state.error}</span>
      </div>
    );
  }
}

FieldComponent.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  validate: PropTypes.func,
  onChange: PropTypes.func.isRequired,
};

export default FieldComponent;