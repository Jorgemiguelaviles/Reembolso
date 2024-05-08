import React, { useState } from 'react';
import PropTypes from 'prop-types';


export function ModalSelectCorpos({setVisible, visible, descricao, titulo, corpomodal }) {


  return (
    <>
      <button style={{background:'#333', borderColor:'#333' }} className="mt-5 w-100 btn btn-primary" onClick={() => setVisible(!visible)}>
        {descricao}
      </button>

      <div className={`modal ${visible ? 'show' : ''}`} tabIndex="-1" style={{ display: visible ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">{titulo}</h1>
              <button type="button" style={{ width: '2rem', height: '2rem', border: 'none', background: 'transparent' }} aria-label="Close" onClick={() => setVisible(!visible)}>
                <img src={close} alt="Close" style={{ width: '2rem', height: '2rem', border: 'none', background: 'transparent' }} />
              </button>
            </div>
            <div className="modal-body">
              {corpomodal}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

ModalSelectCorpos.propTypes = {
  descricao: PropTypes.string.isRequired,
  titulo: PropTypes.string.isRequired,
  corpomodal: PropTypes.node.isRequired,
};
