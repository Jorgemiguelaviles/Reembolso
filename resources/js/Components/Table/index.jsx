import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import FormularioModal from '../Formularios/index';
import Formularioedit from '../Formularios/Edit';
import axios from 'axios';
import { useUser } from '../../userContext';

function Despesas() {
    const { domain } = useUser();
    const [items, setItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [itsVersionament, setItsVersionament] = useState('');
    const [style, setstyle] = useState('col');

    useEffect(() => {

        function handleResize() {
            const { innerWidth } = window;
            if (innerWidth < 768) {
                setItsVersionament('Celular');
                setstyle('row  mt-3 d-flex justify-content-center')
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

    const fetchData = async () => {
        try {
            const response = await fetch(`${domain}despesas`);
            if (!response.ok) {
                throw new Error('Erro ao buscar despesas');
            }
            const data = await response.json();
            console.log('Dados recebidos:', data);
            setItems(data);
        } catch (error) {
            console.error('Erro:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleRemover = async (id) => {
        console.log('Desativar/ativar item com id:', id);
        try {
            const itemToUpdate = items.find(item => item.id === id);
            const updatedItems = items.map(item =>
                item.id === id ? { ...item, active: !item.active } : item
            );
            console.log('Item atualizado localmente:', updatedItems.find(item => item.id === id));

            const response = await axios.post(`${domain}despesas/${id}/status`, { active: itemToUpdate.active ? 0 : 1 }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Resposta do backend:', response);
            setItems(updatedItems);
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        setShowEditModal(false);
        setSelectedItem(null);
    };

    return (
        <div style={{ overflowX: 'auto' }}>
            <Button onClick={() => setShowModal(true)} className={'mb-3'}>Adicionar Nova Despesa</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Descrição do item</th>
                        <th>Valor</th>
                        <th>Código do item</th>
                        <th>Conta razão</th>
                        <th>Documento</th>
                        <th>Quantidade e obrigatorio?</th>
                        <th>Opções</th>
                        
                    </tr>
                </thead>
                <tbody>
                {items.map(item => (
                <tr key={item.id} className={!item.active ? 'table-danger' : ''}>
                    <td>{item.descricao}</td>
                    <td>{item.valor}</td>
                    <td>{item.codigo}</td>
                    <td>{item.conta_razao}</td>
                    <td>{item.Tipo_NF}</td>
                    <td>{item.qnt_editavel === 1 ? 'Sim' : 'Não'}</td>

                    
                    <td>
                <div style={{ display: 'flex' }}>
                    {item.active && ( // Renderizar apenas se o item estiver ativo
                        <Button onClick={() => { setShowEditModal(true); setSelectedItem(item); }}>
                            Editar
                        </Button>
                    )}
                    <Button variant={item.active ? "danger" : "success"} onClick={() => handleRemover(item.id)}>
                        {item.active ? "Desativar" : "Ativar"}
                    </Button>
            </div>
        </td>
    </tr>
))}

                </tbody>
            </Table>

            <FormularioModal
                show={showModal}
                handleClose={handleModalClose}
                selectedItem={selectedItem}
                updateList={fetchData}
            />

            <Formularioedit
                show={showEditModal}
                handleClose={handleModalClose}
                despesa={selectedItem}
                updateList={fetchData}
            />
        </div>
    );
}

export default Despesas;
