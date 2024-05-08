import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import PropTypes from 'prop-types';
import { saveAs } from 'file-saver';


export function ModalWebCam({ descricao, titulo, setPhoto }) {
  const [visible, setVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [capturing, setCapturing] = useState(false);
  const webcamRef = useRef(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setCapturing(true);
  };

  const confirmCapture = () => {
    // Converte a imagem para PNG
    const imgData = capturedImage.split(',')[1];
    const byteCharacters = atob(imgData);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' });

    // Armazena a imagem no estado setPhoto
    setPhoto(blob);

    setVisible(false);
    setCapturing(false);
  };

  const cancelCapture = () => {
    setCapturedImage(null);
    setVisible(false);
    setCapturing(false);
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    setCapturing(false);
  };

  return (
    <>
      <button
        style={{ background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        onClick={() => setVisible(!visible)}
      >
        {descricao}
      </button>
      <div className={`modal ${visible ? 'show' : ''}`} tabIndex="-1" style={{ display: visible ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">{titulo}</h1>
              <button type="button" style={{ width: '2rem', height: '2rem', border: 'none', background: 'transparent' }} aria-label="Close" onClick={() => cancelCapture()}>
                <img src={close} alt="Close" style={{ width: '2rem', height: '2rem', border: 'none', background: 'transparent' }} />
              </button>
            </div>
            <div className="modal-body">
              {capturing ? (
                <div>
                  <h3>Prévia da Foto</h3>
                  <img src={capturedImage} alt="Captured" style={{ maxWidth: '100%' }} />
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => retakePhoto()}>Retirar Foto</button>
                    <button type="button" className="btn btn-secondary" onClick={() => cancelCapture()}>Cancelar</button>
                    <button type="button" className="btn btn-primary" onClick={() => confirmCapture()}>Utilizar Foto</button>
                  </div>
                </div>
              ) : (
                <div>
                  <Webcam
                    audio={false}
                    height={480}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={640}
                  />
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => cancelCapture()}>Cancelar</button>
                    <button type="button" className="btn btn-primary" onClick={() => capture()}>Capturar</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

ModalWebCam.propTypes = {
  descricao: PropTypes.string.isRequired,
  titulo: PropTypes.string.isRequired,
  setPhoto: PropTypes.func.isRequired,
};

export default ModalWebCam;
