import React, { useState, useEffect } from "react";
import NavbarReembolso from "../Components/NavbarReembolso";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useUser } from '../userContext';
import useEncaminhar from '../hooks/functions/encaminhar/useEncaminhar';
import { useCookies } from 'react-cookie';
import verificarInatividade from '../hooks/functions/verificaCookies/index';
import { Card } from 'react-bootstrap';


function Acompanhamento() {
    const { domain } = useUser();
    const searchParams = new URLSearchParams(location.search);
    const parametro = searchParams.get('cabecalhoId');
    const [solicitacoes, setSolicitacoes] = useState([]);
    const [statusOptions, setStatusOptions] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [reasonforcancellation, setreasonforcancellation] = useState('');
    const [sumx, setsumx] = useState('');


    const encaminhar = useEncaminhar();
    const url = `${domain}getDatabaseBody?cabecalhoId=${parametro}`;
    const [filtros, setFiltros] = useState({
        filtrosStatus: "",
        id: parametro,
    });
    const [itsVersionament, setItsVersionament] = useState('Desktop');
    const [cookies] = useCookies(['status', 'Nome', 'Chapa', 'Departamento', 'Gestor', 'Acesso', 'CPF']);
    const timeout = verificarInatividade(cookies)

    const status = cookies['status'];
    const nome = cookies['Nome'];
    const chapa = cookies['Chapa'];
    const departamento = cookies['Departamento'];
    const gestor = cookies['Gestor'];
    const acesso = cookies['Acesso'];
    const cpf = cookies['CPF'];

    useEffect(() => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar os dados');
                }
                return response.json();
            })
            .then(data => {
                setreasonforcancellation(data['dados'][1][0]['motivoDoCancelamento'])
                setsumx(data['dados'][1][0]['SomaTotalDosValores'])

                setSolicitacoes(data['dados'][0]);
            })
            .catch(error => {
                console.error('Erro:', error);
            });

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

        // Removendo o listener de resize quando o componente desmontar
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const getStatusColor = (status) => {
        switch (status) {
            case 'Rejeitado':
                return 'rgba(255, 0, 0, 0.2)';
            case 'Cancelado':
                return 'rgba(255, 165, 0, 0.2)';
            case 'Pendente':
                return
            case 'Pre-aprovado':
                return
            case 'Aprovado':
                return;
            case 'Finalizado':
                return 'rgba(144, 238, 144, 0.3)';
            default:
                return 'inherit';
        }
    };
    if (timeout) {
        return (
            <div>
                <NavbarReembolso titulo={'Acompanhamento de Solicitações'} Nome={nome} Chapa={chapa} />
                <div className="container">
                    <div className="row mt-5 mb-5">
                        <div className="col">
                            <div className="table-responsive" style={{ maxHeight: "500px", overflowY: "auto" }}>
                                <table className="table mt-3">
                                    <thead>
                                        <tr>
                                            <th scope="col">Data</th>
                                            <th scope="col">Solicitante</th>
                                            <th scope="col">Despesa</th>
                                            <th scope="col">Descrição</th>
                                            <th scope="col">Quantidade</th>
                                            <th scope="col">Anexo</th>
                                            <th scope="col">Valor</th>
                                            <th scope="col">Total</th>
                                            <th scope="col">Tipo de pagamento</th>
                                            <th scope="col">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(!solicitacoes) && (
                                            <tr>
                                                <td colSpan="10" style={{ textAlign: "center" }}>
                                                    Nenhuma solicitação encontrada
                                                </td>
                                            </tr>
                                        )}
                                        {solicitacoes && (
                                            solicitacoes.map((solicitacao, index) => (
                                                <tr key={index}>
                                                   <td style={{ backgroundColor: getStatusColor(solicitacao.status) }}>{new Date(solicitacao.data).toLocaleDateString('pt-BR')}</td>
                                                    <td style={{ backgroundColor: getStatusColor(solicitacao.status) }}>{solicitacao.Solicitante}</td>
                                                    <td style={{ backgroundColor: getStatusColor(solicitacao.status) }}>{solicitacao.despesa}</td>
                                                    <td style={{ backgroundColor: getStatusColor(solicitacao.status) }}>{solicitacao.descricao}</td>
                                                    <td style={{ backgroundColor: getStatusColor(solicitacao.status) }}>{solicitacao.quantidade}</td>
                                                    <td style={{ backgroundColor: getStatusColor(solicitacao.status) }}>
                                                        {solicitacao.anexo_path ? (
                                                            <a href={solicitacao.anexo_path} download target="_blank">Download do anexo</a>
                                                        ) : (
                                                            ''
                                                        )}
                                                    </td>
                                                    <td style={{ backgroundColor: getStatusColor(solicitacao.status) }}>
                                                        {solicitacao.itsdolar === 'true' ? `$${solicitacao.valor}` : `R$${solicitacao.valor}`}
                                                    </td>
                                                    <td style={{ backgroundColor: getStatusColor(solicitacao.status) }}>
                                                        {solicitacao.itsdolar === 'true' ? `$${solicitacao.total}` : `R$${solicitacao.total}`}
                                                    </td>
                                                    <td style={{ backgroundColor: getStatusColor(solicitacao.status) }}>
                                                        {solicitacao.tipoDePagamento}
                                                    </td>
                                                    <td style={{ backgroundColor: getStatusColor(solicitacao.status) }}>{solicitacao.status}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        {/* Card para Soma Total */}
                        <Card style={{ marginRight: '20px', width: '300px' }}>
                            <Card.Body>
                            <Card.Title style={{ textAlign: 'center' }}>Total</Card.Title>
                            <Card.Text style={{ textAlign: 'center' }}>R$ {sumx}</Card.Text>
                            </Card.Body>
                        </Card>

                        {/* Renderizar o Card para Motivo do Cancelamento somente se reasonforcancellation não for null */}
                        {reasonforcancellation && (
                            <Card style={{ width: '300px' }}>
                                <Card.Body>
                                    <Card.Title style={{ textAlign: 'center' }}>Motivo do Cancelamento</Card.Title>
                                    <Card.Text style={{  whiteSpace: 'pre-wrap' }}>{reasonforcancellation}</Card.Text>
                                </Card.Body>
                            </Card>
                        )}
                    </div>
                    <div className="row mt-3">
                        <div className="col text-center">
                            <Link to="/consulta">
                                <Button
                                    className="btn"
                                    style={{ backgroundColor: "#285C72" }}
                                >
                                    Voltar
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>


            </div>
        );
    } else {
        encaminhar('/login')
    }

}

export default Acompanhamento;
