import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ value, setvalue, etiqueta, image, setimage, setimagestatus, interligacao }) => {
  const hasImage = image && image.trim() !== '';

  const handleCheckboxChange = () => {
    setvalue((prevValue) => !prevValue);
  };

  const handleImageClick = () => {
    setimage((prevImage) => (prevImage === seta_baixo ? seta_cima : seta_baixo));
    setimagestatus((prevStatus) => !prevStatus);
  };


  return (
    <div className="form-check" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
      <input
        className="form-check-input"
        type="checkbox"
        id={interligacao}
        checked={value}
        onChange={handleCheckboxChange}
      />
      <label className="form-check-label" htmlFor={interligacao} style={{ marginRight: '0.5rem' }}>
        {etiqueta}
      </label>
      {hasImage && (
        <img
          src={image}
          alt="Imagem"
          style={{ width: '1.5rem', cursor: 'pointer' }}
          onClick={handleImageClick}
        />
      )}
    </div>
  );
};

Checkbox.propTypes = {
  setvalue: PropTypes.func.isRequired,
  etiqueta: PropTypes.string.isRequired,
  image: PropTypes.string,
  setimage: PropTypes.func,
  setimagestatus: PropTypes.func, // Adicionando propriedade setimagestatus ao PropTypes
};

export default Checkbox;
