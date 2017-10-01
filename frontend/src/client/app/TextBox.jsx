import React from 'react';
import PropTypes from 'prop-types';
const TextBox = ({name, value, onChange, placeHolder, className}) => (
    <input className={className} name={name} type="textbox" value={value} onChange={onChange} placeholder={placeHolder} />
)

TextBox.propType = {
    name:PropTypes.string,
    onChange:PropTypes.func.isRequired,
    placeHolder:PropTypes.string,
    className: PropTypes.string
}

export default TextBox;