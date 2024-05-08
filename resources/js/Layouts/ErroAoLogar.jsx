import React from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import useEncaminhar from '../hooks/functions/encaminhar/useEncaminhar';

const ErroAoLogar = () => {
    const encaminhar = useEncaminhar();

    return (
        <div className="vh-100 d-flex justify-content-center align-items-center">
            <div className="text-center border rounded p-4">
                <h1 className="text-danger mb-4">Usuário ou senha incorretos</h1>
                <Button variant="primary" size="lg" onClick={() => encaminhar('/login')} className="mb-4">Voltar</Button>
            </div>
        </div>
    );
}

export default ErroAoLogar;
