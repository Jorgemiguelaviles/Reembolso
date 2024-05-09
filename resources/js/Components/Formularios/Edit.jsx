import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useUser } from '../../userContext';


const Formularioedit = ({ show, handleClose, despesa, updateList }) => {
    const [novaDespesa, setNovaDespesa] = useState({
        descricao: '',
        valor: '',
        codigo: '',
        conta_razao: '',
        Tipo_NF: '',
        qnt_editavel: ''
    });

    const { domain } = useUser();
    const [envioSucesso, setEnvioSucesso] = useState(false);
    const [mostrarErro, setMostrarErro] = useState(false);
    const [camposVazios, setCamposVazios] = useState([]);
    const [itsVersionament, setItsVersionament] = useState('');
    console.log('itsVersionament', itsVersionament)

    useEffect(() => {

        function handleResize() {
            const { innerWidth } = window;
            if (innerWidth < 768) {
                setItsVersionament('Celular');
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

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [setItsVersionament]);


    useEffect(() => {
        if (show) {
            setNovaDespesa(despesa);
        } else {

            setNovaDespesa({
                descricao: '',
                valor: '',
                codigo: '',
                conta_razao: '',
                Tipo_NF: '',
                qnt_editavel: novaDespesa.qnt_editavel === 'true' ? 1 : 0 
            });
            setEnvioSucesso(false);
            setMostrarErro(false);
            setCamposVazios([]);
        }
    }, [show, despesa]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const newValue = value === '' ? null : value;
        setNovaDespesa({ ...novaDespesa, [name]: name === 'Tipo_NF' ? newValue : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const camposNaoPreenchidos = [];
        if (!novaDespesa.descricao) camposNaoPreenchidos.push('Descrição do item');
        if (!novaDespesa.codigo) camposNaoPreenchidos.push('Código do item');
        if (!novaDespesa.conta_razao) camposNaoPreenchidos.push('Conta Razão');
        if (novaDespesa.qnt_editavel === '') { // Modificado para verificar se é uma string vazia
            setMostrarErro(true);
            setCamposVazios(['Informações de Quantidade']);
            return;
        }
    
        if (camposNaoPreenchidos.length > 0) {
            setMostrarErro(true);
            setCamposVazios(camposNaoPreenchidos);
            return;
        }
    
        // Convertendo o valor de qnt_editavel para um booleano
        const dadosDespesa = { ...novaDespesa, qnt_editavel: novaDespesa.qnt_editavel === 'true' };
    
        if (dadosDespesa.valor === '') {
            delete dadosDespesa.valor;
        }
    
        const rotaBack = `${domain}despesas/${despesa.id}/update`;
        try {
            const response = await axios.post(rotaBack, dadosDespesa);
            console.log('Resposta do servidor:', response.data);
            setEnvioSucesso(true);
            setTimeout(() => {
                handleClose();
                updateList();
            }, 1000);
        } catch (error) {
            console.error('Erro ao lidar com a resposta:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Despesa</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="descricao">
                        <Form.Label>Descrição do item</Form.Label>
                        <Form.Control
                            type="text"
                            name="descricao"
                            value={novaDespesa.descricao}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="valor">
                        <Form.Label>Valor</Form.Label>
                        <Form.Control
                            type="number"
                            name="valor"
                            value={novaDespesa.valor}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="codigo">
                        <Form.Label>Código do item</Form.Label>
                        <Form.Control
                            type="text"
                            name="codigo"
                            value={novaDespesa.codigo}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="conta_Razao">
                        <Form.Label>Conta Razão</Form.Label>
                        <Form.Control
                            type="text"
                            name="conta_razao"
                            value={novaDespesa.conta_razao}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="Tipo_NF">
                        <Form.Label>Tipo de Documento</Form.Label>
                        <Form.Control
                            as="select"
                            name="Tipo_NF"
                            value={novaDespesa.Tipo_NF || ''}
                            onChange={handleInputChange}
                        >
                            <option value="">Selecione...</option>
                            <option value="Cupom">Cupom</option>
                            <option value="NF">NF</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="qnt_editavel">
                    <Form.Label>Quantidade e obrigatorio?</Form.Label>
                        <Form.Control
                            as="select"
                            name="qnt_editavel"
                            value={novaDespesa.qnt_editavel || ''}
                            onChange={handleInputChange}
                        >
                            <option value="">Selecione...</option>
                            <option value="true">Sim</option>
                            <option value="false">Não</option>
                        </Form.Control>
                    </Form.Group>


                    <Button variant="primary" type="submit" className="mt-2">
                        Editar Despesa
                    </Button>
                </Form>
                {mostrarErro && (
                    <Alert variant="danger" className="mt-3">
                        Campos obrigatórios não preenchidos: {camposVazios.join(', ')}
                    </Alert>
                )}
                {envioSucesso && (
                    <div className="alert alert-success mt-3" role="alert">
                        Despesa enviada com sucesso!
                    </div>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default Formularioedit;
