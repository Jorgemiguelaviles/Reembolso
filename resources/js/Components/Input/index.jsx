import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';

const Input = ({ obrigatorio, etiqueta, desativado, input, setinput, tipo, classeExtra, subtitulo }) => {
    const [itsVersionament, setItsVersionament] = useState('Desktop');
    const [style, setstyle] = useState('4');
    console.log('itsVersionament', itsVersionament)


    const etiquetaComAsterisco = obrigatorio ? (
        <>
            {subtitulo} <span style={{ color: 'red' }}>*</span>
        </>
    ) : (
        subtitulo
    );



    useEffect(() => {


        function handleResize() {
            const { innerWidth } = window;
            if (innerWidth < 768) {
                setItsVersionament('Celular');
                setstyle('12')
            } else if (innerWidth >= 768 && innerWidth < 992) {
                setItsVersionament('Tablet');
            } else {
                setItsVersionament('Desktop');
            }
        }

        // Adicionando um listener de resize para ajustar o state conforme a mudança do tamanho da tela
        window.addEventListener('resize', handleResize);

        // Definindo o estado inicial baseado no tamanho da tela quando o componente montar
        handleResize();

        // Removendo o listener de resize quando o componente desmontar
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [setItsVersionament]); // Adicionando as dependências necessárias





    return (
        <div className={`col-${style} mb-3 ${classeExtra}`}>
            <label htmlFor={etiqueta}>{etiquetaComAsterisco}</label>
            <div className="col-sm">
                <div className="input-group">
                    <input
                        type={tipo}
                        className="form-control"
                        placeholder={etiqueta}
                        id={etiqueta}
                        disabled={desativado}
                        value={input || ''} // Tratamento para valores nulos ou indefinidos
                        onChange={(e) => setinput(e.target.value)}
                        required={obrigatorio}
                    />
                </div>
            </div>
        </div>
    );
};

Input.propTypes = {
    etiqueta: PropTypes.string.isRequired,
    desativado: PropTypes.bool.isRequired,
    input: PropTypes.string, // O valor de entrada agora é opcional
    setinput: PropTypes.func.isRequired,
    tipo: PropTypes.string.isRequired,
    classeExtra: PropTypes.string, // Permite classes CSS extras
    subtitulo: PropTypes.string.isRequired,
    obrigatorio: PropTypes.bool,
};

export default Input;
