import React from 'react';
import PropTypes from 'prop-types';

const Imagens = ({ src, altura, largura }) => {
  return <img src={src} className="img-fluid" alt="Imagem" style={{ width: largura, height: altura }} />;
};

Imagens.propTypes = {
  src: PropTypes.string.isRequired,
  altura: PropTypes.number.isRequired,
  largura: PropTypes.number.isRequired,
};

export default Imagens;
