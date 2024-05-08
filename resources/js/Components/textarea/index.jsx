import React from 'react';
import PropTypes from 'prop-types';

export default function CustomTextarea({ etiqueta, input, setInput }) {
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="form-floating">
      <textarea
        className="form-control"
        placeholder={etiqueta}
        value={input}
        onChange={handleChange}
        style={{ height: '100px' }}
      ></textarea>
    </div>
  );
}

CustomTextarea.propTypes = {
  etiqueta: PropTypes.string.isRequired,
  input: PropTypes.string.isRequired,
  setInput: PropTypes.func.isRequired,
};
