import React from 'react';
import PropTypes from 'prop-types';

export const Deslogin = ({ descricao, funcao }) => {
    return (
        <>
            <button
                className="col-sm-2 col-form-label col-form-label-sm w-10"
                onClick={funcao}
            >
                {descricao}
            </button>
        </>
    );
};

const Submit = ({ descricao, funcao }) => {
    return (
        <>
            <button
                className="btn btn-success"
                onClick={funcao}>
                {descricao}
            </button>
        </>
    );
};

export default Submit;

export const ButtomFile = ({ descricao, acceptedFileType }) => {
    const verificarTipo = (e) => {
        const selectedFile = e.target.files[0];

        if (!selectedFile) {
            alert('Nenhum arquivo selecionado.');
            return;
        }

        const selectedFileType = selectedFile.type.toLowerCase();
        const acceptedTypes = acceptedFileType
            ? acceptedFileType.split(',').map((type) => type.trim().toLowerCase())
            : [];

        const isAccepted = acceptedTypes.includes(selectedFileType);

        if (isAccepted) {
            const imageUrl = URL.createObjectURL(selectedFile);
            setfoto(imageUrl);

            const imgElement = document.getElementById('previewImage');

            if (imgElement) {
                imgElement.src = imageUrl;
            }
        } else {
            alert('Tipo de arquivo não suportado.');
        }
    };

    return (
        <>
            <label
                htmlFor="foto"
                className="bg-success d-flex justify-content-center align-items-center p-3"
                style={{ height: '2.5rem', borderRadius: '5px' }}
            >
                {descricao}
                <input
                    type="file"
                    name="foto"
                    id="foto"
                    style={{ display: 'none' }}
                    onChange={verificarTipo}
                />
            </label>
        </>
    );
};

export const ButtomWebCam = ({ descricao, funcao1, funcao2, estado1, estado2, }) => {
    return (
        <>
            {estado2 && (
                <button
                    className="bg-warning d-flex justify-content-center align-items-center p-3"
                    style={{ height: '2.5rem', borderRadius: '5px', border: 0 }}
                    onClick={funcao1}
                    type="submit"
                >
                    {descricao}
                </button>
            )}
        </>
    );
};

export const Accept = ({ descricao }) => {
    return (
        <>
            <button
                type="submit"
                className="col-sm-2 col-form-label col-form-label-sm w-100 mt-3"
            >
                {descricao}
            </button>
        </>
    );
};

export const Cancel = ({ descricao, funcao }) => {
    return (
        <>
            <button
                type="submit"
                className="col-sm-2 col-form-label col-form-label-sm w-100 mt-3"
                onClick={funcao}
            >
                {descricao}
            </button>
        </>
    );
};

export const Success = ({ descricao, funcao }) => {
    return (
        <>
            <button
                type="submit"
                className="col-sm-2 col-form-label col-form-label-sm w-100 mt-3"
                onClick={funcao}
            >
                {descricao}
            </button>
        </>
    );
};

Deslogin.propTypes = {
    descricao: PropTypes.string.isRequired,
    funcao: PropTypes.func.isRequired,
};
Submit.propTypes = {
    descricao: PropTypes.string.isRequired,
    funcao: PropTypes.func.isRequired,
};
Accept.propTypes = {
    descricao: PropTypes.string.isRequired,
};
Cancel.propTypes = {
    descricao: PropTypes.string.isRequired,
    funcao: PropTypes.func.isRequired,
};
Success.propTypes = {
    descricao: PropTypes.string.isRequired,
    funcao: PropTypes.func.isRequired,
};

ButtomFile.propTypes = {
    descricao: PropTypes.string.isRequired,
    setfoto: PropTypes.func.isRequired,
    acceptedFileType: PropTypes.string.isRequired,
};

