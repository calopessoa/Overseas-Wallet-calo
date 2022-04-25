import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Select extends Component {
  render() {
    const { id, testid, title, name, value, array, handleChange } = this.props;
    return (
      <div>
        <label htmlFor={ id }>{title}</label>
        <select
          id={ id }
          data-testid={ testid }
          name={ name }
          value={ value }
          onChange={ handleChange }
        >
          {array.map((element) => <option key={ element }>{element}</option>)}
        </select>
      </div>
    );
  }
}

Select.propTypes = {
  id: PropTypes.number,
  testid: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.string,
  array: PropTypes.arrayOf(PropTypes.string),
  handleChange: PropTypes.func,
}.isRequired;
