import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({
    desativado,
    selectedOption,
    setSelectedOption,
    optionsData,
    etiqueta,
    obrigatorio,
    personalizacao,
    handleSelectChange,
}) => {
    console.log(optionsData)

    const handleSelectChangeLocal = (event) => {
        setSelectedOption(event.target.value);
        handleSelectChange(event.target.value);
    };

    const renderEtiqueta = () => {
        return obrigatorio ? (
            <>
                {etiqueta} <span style={{ color: 'red' }}>*</span>
            </>
        ) : (
            etiqueta
        );
    };

    useEffect(() => {
        if (optionsData && optionsData.length > 0) {
            // Faça o que precisar com optionsData após ser atualizado
            console.log('Options Data atualizado:', optionsData);
        }
    }, [optionsData]); // Executa sempre que optionsData mudar

    return (
        <div className="mb-3">
            <label htmlFor={personalizacao} className="form-label">
                {renderEtiqueta()}
            </label>
            <select
                className="form-select"
                id={personalizacao}
                disabled={desativado}
                value={selectedOption}
                onChange={handleSelectChangeLocal}
                required={obrigatorio}
            >
                <option value="">Selecione...</option>
                {optionsData && optionsData.length > 0 && optionsData.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

Dropdown.propTypes = {
    desativado: PropTypes.bool.isRequired,
    selectedOption: PropTypes.string.isRequired,
    setSelectedOption: PropTypes.func.isRequired,
    optionsData: PropTypes.array,
    etiqueta: PropTypes.string.isRequired,
    obrigatorio: PropTypes.bool,
    personalizacao: PropTypes.string.isRequired,
    handleSelectChange: PropTypes.func.isRequired,
};

export default Dropdown;
