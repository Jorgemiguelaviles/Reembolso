import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import enviarDadosParaBackend from '../../hooks/functions/submitbackend/submitbackend';
import axios from 'axios';
import { useUser } from '../../userContext';

const FormularioModal = ({ show, handleClose, updateList }) => {
    const [novaDespesa, setNovaDespesa] = useState({
        descricao: '',
        valor: '',
        codigo: '',
        conta_razao: '',
        Tipo_NF: '',
        qnt_editavel:''
    });

    const { domain } = useUser();
    const [envioSucesso, setEnvioSucesso] = useState(false);
    const [mostrarErro, setMostrarErro] = useState(false);
    const [camposVazios, setCamposVazios] = useState([]);

    useEffect(() => {
        if (!show) {

            setNovaDespesa({
                descricao: '',
                valor: '',
                codigo: '',
                conta_razao: '',
                Tipo_NF: '',
                qnt_editavel:''
            });
            setEnvioSucesso(false);
            setMostrarErro(false);
            setCamposVazios([]);
        }
    }, [show]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const newValue = value === '' ? null : value;
        setNovaDespesa({ ...novaDespesa, [name]: name === 'Tipo_NF' ? newValue : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificar se o campo valor está vazio e atribuir null se estiver
        const valor = novaDespesa.valor === '' ? null : novaDespesa.valor;

        // Criar o objeto de dados a ser enviado para o backend
        const dadosDespesa = {
            descricao: novaDespesa.descricao,
            valor: valor,
            codigo: novaDespesa.codigo,
            conta_razao: novaDespesa.conta_razao,
            Tipo_NF: novaDespesa.Tipo_NF,
            qnt_editavel: novaDespesa.qnt_editavel === 'true' ? 1 : 0

        };

        const camposNaoPreenchidos = [];
        if (!novaDespesa.descricao) camposNaoPreenchidos.push('Descrição do item');
        if (!novaDespesa.codigo) camposNaoPreenchidos.push('Código do item');
        if (!novaDespesa.conta_razao) camposNaoPreenchidos.push('Conta Razão');

        if (camposNaoPreenchidos.length > 0) {
            setMostrarErro(true);
            setCamposVazios(camposNaoPreenchidos);
            return;
        }

        const rotaBack = `${domain}despesascreate`;
        try {
            const dadosResposta = await enviarDadosParaBackend(rotaBack, dadosDespesa);
            console.log('Dados da resposta:', dadosResposta);
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
                <Modal.Title>Adicionar Nova Despesa</Modal.Title>
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
                            value={novaDespesa.Tipo_NF || ''} // Defina o valor como uma string vazia se for null
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


                    <Button variant="primary" type="submit" className={'mt-2'}>
                        Adicionar Despesa
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

export default FormularioModal;
