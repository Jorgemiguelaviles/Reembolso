import React, { useState, useEffect } from "react";
import NavbarReembolso from "../Components/NavbarReembolso";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Filtro from "../Components/Filtro/filtro";
import { Dropdown } from '../Components/index';
import { useUser } from '../userContext';
import useEncaminhar from '../hooks/functions/encaminhar/useEncaminhar';
import enviarDadosParaBackend from '../hooks/functions/submitbackend/atualizarDadosNoBackend';
import 'react-toastify/dist/ReactToastify.css';
import { Event } from "@mui/icons-material";
import { useCookies } from 'react-cookie';
import verificarInatividade from '../hooks/functions/verificaCookies/index';


function Consulta() {
    const { domain } = useUser();
    const [nde, setnde] = useState(0);
    const [nate, setnate] = useState(10);
    const [ultimoid, setultimoid] = useState();
    const [inforeembolso, setInforeembolso] = useState([]);
    const [Formlario, setFormlario] = useState([]);
    const [selectedOption, setSelectedOption] = useState({});
    const encaminhar = useEncaminhar();
    const [selectedStatus, setSelectedStatus] = useState('');
    const [reasonforcancellation, setreasonforcancellation] = useState('');
    const [cookies] = useCookies(['status', 'Nome', 'Chapa', 'Departamento', 'Gestor', 'Acesso', 'CPF']);
    const timeout = verificarInatividade(cookies)
    const nome = cookies['Nome'];
    const chapa = cookies['Chapa'];
    const departamento = cookies['Departamento'];
    const gestor = cookies['Gestor'];
    const acesso = cookies['Acesso'];
    const cpf = cookies['CPF'];
    const [showModal, setShowModal] = useState(false);
    const [id, setid] = useState('');
    const [status, setstatus] = useState('');
    const [userData, setUserData] = useState({ name: "", chapa: "" });
    const optionsDataGestorReembolso = ['Cancelado', 'Aprovado',];
    const optionsDataContabilidadeReturn = ['Rejeitado', 'Pre-aprovado'];
    const optionsDataContabilidade = ['Rejeitado', 'Finalizado'];
    const optionsData = ['Rejeitado', 'Cancelado', 'Pendente', 'Pre-aprovado', 'Aprovado', 'Finalizado'];
    const [itsVersionament, setItsVersionament] = useState('Desktop');

    const [filtros, setFiltros] = useState({
        filtroAbertoEm: "",
        filtroAte: "",
        filtroNumero: "",
        filtroCentroDeCusto: "",
        filtroStatus: ""
    });
    const openModal = (status, cabecalhoId) => {
        setid(cabecalhoId)
        setstatus(status)
        setShowModal(true)
    };
    const closeModal = () => {
        setreasonforcancellation('')
        setShowModal(false);
    }

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

        // Removendo o listener de resize quando o componente desmontar
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [setItsVersionament]); // Adicionando as dependências necessárias

    const handleStatusChange = async (status, cabecalhoId) => {
        if (event) {

            const newStatus = status;
            // Encontra o índice do elemento dentro do array inforeembolso com base no ID do cabeçalho
            const index = inforeembolso.findIndex(cabecalho => cabecalho.id === cabecalhoId);

            if (index !== -1) { // Verifica se o elemento foi encontrado no array
                // Cria uma cópia do array inforeembolso
                const updatedInforeembolso = [...inforeembolso];
                // Atualiza apenas o status do elemento encontrado
                updatedInforeembolso[index].status = newStatus;
                // Atualiza o estado com o novo array
                setInforeembolso(updatedInforeembolso);
            } else {
                console.error('Cabeçalho não encontrado.');
            }
            var list = []

            Formlario.forEach((element, id) => {
                if (cabecalhoId === element['inforeembolso_id']) {
                    list.push(element)
                }
            });

            var valuesLine = [inforeembolso[index], list]

            // Envia os dados atualizados para o backend
            const dados = {
                newStatus: newStatus,
                id: cabecalhoId,
                nome: nome,
                valueesLine: valuesLine,
                reasonforcancellation: reasonforcancellation,
            }

            try {

                const response = await enviarDadosParaBackend('/status', dados);

                console.log('response', response)

                closeModal();

                // Toast ou outra lógica de feedback aqui
            } catch (error) {
                console.error('Erro ao atualizar o status:', error);
                // Toast ou outra lógica de feedback aqui
            }
        }
    };

    useEffect(() => {
        // Verifica se nde e nate têm valores definidos
        if (nde !== null && nate !== null) {
            fetch(`${domain}getDatabase?nde=${nde}&nate=${nate}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Erro ao buscar as solicitações");
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log('data', data)
                    // Extraia os dados da resposta JSON
                    const inforeembolso = data.Inforeembolso;
                    setultimoid(data['ultimoId'])

                    // Atualize os estados correspondentes com os dados recebidos
                    setInforeembolso(inforeembolso);
                })
                .catch((error) => console.error("Erro:", error));
        }
    }, [nde, nate]); // Adicione nde e nate como dependências do useEffect

    const handleFiltrar = async (filtros) => {
        try {
            if (Object.keys(filtros['filtroAbertoEm']).length === 0
                && Object.keys(filtros['filtroAte']).length === 0
                && Object.keys(filtros['filtroNumero']).length === 0
                && Object.keys(filtros['filtroCentroDeCusto']).length === 0
                && Object.keys(filtros['filtroStatus']).length === 0
            ) {
                const response = await fetch(`${domain}getDatabase?nde=${nde}&nate=${nate}`);
                if (!response.ok) {
                    throw new Error("Erro ao buscar as solicitações");
                }
                const data = await response.json();
                setInforeembolso(data.Inforeembolso);
            } else {
                const response = await enviarDadosParaBackend(`${domain}filters`, filtros);
                if (response.success) {
                    setInforeembolso(response.data['listdatabase']);
                } else {
                    setSolicitacoes([]);
                    // Lógica para lidar com nenhum resultado encontrado, se necessário
                }
            }
        } catch (error) {
            // Lógica para lidar com erros de comunicação com o backend, se necessário
        }
    };


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


    const handleTextareaChange = (event) => {
        setreasonforcancellation(event.target.value);
    };

    const proximaPagina = () => {
        if (nde + 10 > ultimoid) {
        } else {
            setnde(nde + 10);
            setnate(nate + 10);
        }
    };

    const paginaAnterior = () => {
        if (nde > 0) {
            setnde(nde - 10);
            setnate(nate - 10);
        }
    };

    console.log('acesso', acesso)


    if (timeout) {
        return (
            <div>
                <NavbarReembolso titulo={'Consulta de reembolso'} Nome={nome} Chapa={chapa} />
                <Filtro onFiltrar={handleFiltrar} filtros={filtros} setFiltros={setFiltros} />
                <div className="container">
                    <div className="row mt-3" >
                        <div className="col text-center">
                            <button type="button" className="btn btn-primary m-3" onClick={paginaAnterior}>
                                <span aria-hidden="true">&larr;</span> Anterior
                            </button>
                            <button type="button" className="btn btn-primary m-3" onClick={proximaPagina}>
                                Próximo <span aria-hidden="true">&rarr;</span>
                            </button>
                        </div>


                        <div className="col">
                            <div className="table-responsive" style={{ minHeight: "300px", maxHeight: "500px", overflowY: "auto" }}>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Autor</th>
                                            <th scope="col">Solicitante</th>
                                            <th scope="col">Chapa</th>
                                            <th scope="col">Gestor</th>
                                            <th scope="col">Departamento</th>
                                            <th scope="col">Empresa</th>
                                            <th scope="col">Obra</th>
                                            <th scope="col">Criado</th>
                                            <th scope="col">Atualizado por:</th>
                                            <th scope="col">Ultima Atualização</th>
                                            <th scope="col">Centro de Custo</th>
                                            <th scope="col">Direcionado</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Detalhes</th>
                                            <th scope="col">Editar</th>
                                            <th scope="col">Imprimir</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {inforeembolso && inforeembolso.length > 0 && (
                                            <>
                                                {inforeembolso.map((cabecalho, index) => {
                                                    if (cabecalho.Solicitante === nome && acesso === 'ComumRembolso') {
                                                        return (<>

                                                            {showModal && (
                                                                <div className="modal fade show -scroll-mt-80" tabIndex="-1" style={{ display: 'block', zIndex: '1050' }}>
                                                                    <div className="modal-dialog">
                                                                        <div className="modal-content">
                                                                            <div className="modal-header">
                                                                                <h5 className="modal-title">A alteracao de status e irreversivel, deseja continuar?</h5>
                                                                                <button type="button" className="btn-close" onClick={closeModal}></button>
                                                                            </div>
                                                                            {(status === 'Cancelado' || status === 'Rejeitado') && (
                                                                                <div className="modal-body">
                                                                                    {/* Conteúdo da modal */}
                                                                                    <textarea
                                                                                        style={{ width: '100%', height: '200px', resize: 'none' }} // Tamanho fixo e impedir redimensionamento
                                                                                        value={reasonforcancellation} // Usar o estado como valor do textarea
                                                                                        onChange={handleTextareaChange} // Atualizar o estado quando o conteúdo do textarea for alterado
                                                                                    />
                                                                                </div>
                                                                            )}

                                                                            <div className="modal-footer">
                                                                                {/* Botões de ação */}
                                                                                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                                                                    Fechar
                                                                                </button>
                                                                                <button type="button" className="btn btn-primary" onClick={(event) => handleStatusChange(status, id)}>
                                                                                    Salvar mudanças
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}

                                                            <tr key={index}>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{cabecalho.id}</td>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{cabecalho.Solicitante}</td>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{cabecalho.designationpeople}</td>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{cabecalho.chapa}</td>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{cabecalho.gestor}</td>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{cabecalho.departamento}</td>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{cabecalho.TipoDeEmpresa}</td>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{cabecalho.obra}</td>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{new Date(cabecalho.created_at).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</td>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{cabecalho.ultimaAtualizacao}</td>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{new Date(cabecalho.updated_at).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</td>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{cabecalho.centro_de_custo}</td>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{cabecalho.direcionado_ao_centro_de_custo}</td>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status), textAlign: 'center' }}>
                                                                    <span style={{ cursor: 'default' }}>{cabecalho.status}</span>
                                                                </td>

                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>
                                                                    <Link to={{ pathname: '/acompanhamento', search: `?cabecalhoId=${cabecalho.id}` }}>
                                                                        <Button className="btn" style={{ backgroundColor: "#1A7A5D" }}>
                                                                            Consultar
                                                                        </Button>
                                                                    </Link>
                                                                </td>
                                                                {(cabecalho.status === 'Cancelado' || cabecalho.status === 'Rejeitado') ? (
                                                                    <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>
                                                                        <Link to={{ pathname: '/solicitacaoEdit', search: `?cabecalhoId=${cabecalho.id}` }}>
                                                                            <Button className="btn" style={{ backgroundColor: "#3c00ff" }}>
                                                                                Editar
                                                                            </Button>
                                                                        </Link>
                                                                    </td>
                                                                ) : (
                                                                    <td style={{ backgroundColor: getStatusColor(cabecalho.status), textAlign: 'center' }}></td>
                                                                )}
                                                                {(cabecalho.status === 'Finalizado') ? (<td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>
                                                                    <Link to={{ pathname: '/PDF', search: `?cabecalhoId=${cabecalho.id}` }}>
                                                                        <Button className="btn" style={{ backgroundColor: "#FFA500" }}>
                                                                            PDF
                                                                        </Button>
                                                                    </Link>
                                                                </td>) : (<td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>
                                                                </td>)}

                                                            </tr>
                                                        </>);
                                                    } else if (cabecalho.gestor === nome && acesso === 'GestorRembolso' || cabecalho.chapa === chapa && acesso === 'GestorRembolso' || cabecalho.Solicitante === nome && acesso === 'GestorRembolso'
                                                    ) {
                                                        return (<>

                                                            {showModal && (
                                                                <div className="modal fade show -scroll-mt-80" tabIndex="-1" style={{ display: 'block', zIndex: '1050' }}>
                                                                    <div className="modal-dialog">
                                                                        <div className="modal-content">
                                                                            <div className="modal-header">
                                                                                <h5 className="modal-title">A alteracao de status e irreversivel, deseja continuar?</h5>
                                                                                <button type="button" className="btn-close" onClick={closeModal}></button>
                                                                            </div>
                                                                            {(status === 'Cancelado' || status === 'Rejeitado') && (
                                                                                <div className="modal-body">
                                                                                    {/* Conteúdo da modal */}
                                                                                    <textarea
                                                                                        style={{ width: '100%', height: '200px', resize: 'none' }} // Tamanho fixo e impedir redimensionamento
                                                                                        value={reasonforcancellation} // Usar o estado como valor do textarea
                                                                                        onChange={handleTextareaChange} // Atualizar o estado quando o conteúdo do textarea for alterado
                                                                                    />
                                                                                </div>
                                                                            )}
                                                                            <div className="modal-footer">
                                                                                {/* Botões de ação */}
                                                                                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                                                                    Fechar
                                                                                </button>
                                                                                <button type="button" className="btn btn-primary" onClick={(event) => handleStatusChange(status, id)}>
                                                                                    Salvar mudanças
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}

                                                            <tr key={index}>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{cabecalho.id}</td>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{cabecalho.Solicitante}</td>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{cabecalho.designationpeople}</td>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{cabecalho.chapa}</td>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{cabecalho.gestor}</td>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{cabecalho.departamento}</td>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{cabecalho.TipoDeEmpresa}</td>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{cabecalho.obra}</td>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{new Date(cabecalho.created_at).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</td>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{cabecalho.ultimaAtualizacao}</td>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{new Date(cabecalho.updated_at).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</td>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{cabecalho.centro_de_custo}</td>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{cabecalho.direcionado_ao_centro_de_custo}</td>
                                                                {cabecalho.status === 'Pre-aprovado' && cabecalho.Solicitante != nome ? (
                                                                    <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>
                                                                        <div className="dropdown">
                                                                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                {cabecalho.status}
                                                                            </button>
                                                                            <ul className="dropdown-menu">
                                                                                {optionsDataGestorReembolso.map((option, index) => (
                                                                                    <li key={index}>
                                                                                        <div onClick={(event) => openModal(option, cabecalho.id)} style={{ cursor: 'pointer' }}>
                                                                                            {option}
                                                                                        </div>
                                                                                    </li>
                                                                                ))}
                                                                            </ul>
                                                                        </div>
                                                                    </td>
                                                                ) : (
                                                                    <td style={{ backgroundColor: getStatusColor(cabecalho.status), textAlign: 'center' }}>
                                                                        <span style={{ cursor: 'default' }}>{cabecalho.status}</span>
                                                                    </td>
                                                                )}

                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>
                                                                    <Link to={{ pathname: '/acompanhamento', search: `?cabecalhoId=${cabecalho.id}` }}>
                                                                        <Button className="btn" style={{ backgroundColor: "#1A7A5D" }}>
                                                                            Consultar
                                                                        </Button>
                                                                    </Link>
                                                                </td>
                                                                {(cabecalho.status === 'Rejeitado' && cabecalho.Solicitante == nome) ? (
                                                                    <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>
                                                                        <Link to={{ pathname: '/solicitacaoEdit', search: `?cabecalhoId=${cabecalho.id}` }}>
                                                                            <Button className="btn" style={{ backgroundColor: "#3c00ff" }}>
                                                                                Editar
                                                                            </Button>
                                                                        </Link>
                                                                    </td>
                                                                ) : (
                                                                    <td style={{ backgroundColor: getStatusColor(cabecalho.status), textAlign: 'center' }}></td>
                                                                )}
                                                                {(cabecalho.status === 'Finalizado') ? (<td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>
                                                                    <Link to={{ pathname: '/PDF', search: `?cabecalhoId=${cabecalho.id}` }}>
                                                                        <Button className="btn" style={{ backgroundColor: "#FFA500" }}>
                                                                            PDF
                                                                        </Button>
                                                                    </Link>
                                                                </td>) : (<td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>
                                                                </td>)}

                                                            </tr>
                                                        </>);
                                                    }

                                                    else if (acesso === 'AdministracaoRembolso') {
                                                        return (<>

                                                            {showModal && (
                                                                <div className="modal fade show -scroll-mt-80" tabIndex="-1" style={{ display: 'block', zIndex: '1050' }}>
                                                                    <div className="modal-dialog">
                                                                        <div className="modal-content">
                                                                            <div className="modal-header">
                                                                                <h5 className="modal-title">A alteracao de status e irreversivel, deseja continuar?</h5>
                                                                                <button type="button" className="btn-close" onClick={closeModal}></button>
                                                                            </div>
                                                                            {(status === 'Cancelado' || status === 'Rejeitado') && (
                                                                                <div className="modal-body">
                                                                                    {/* Conteúdo da modal */}
                                                                                    <textarea
                                                                                        style={{ width: '100%', height: '200px', resize: 'none' }} // Tamanho fixo e impedir redimensionamento
                                                                                        value={reasonforcancellation} // Usar o estado como valor do textarea
                                                                                        onChange={handleTextareaChange} // Atualizar o estado quando o conteúdo do textarea for alterado
                                                                                    />
                                                                                </div>
                                                                            )}
                                                                            <div className="modal-footer">
                                                                                {/* Botões de ação */}
                                                                                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                                                                    Fechar
                                                                                </button>
                                                                                <button type="button" className="btn btn-primary" onClick={(event) => handleStatusChange(status, id)}>
                                                                                    Salvar mudanças
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}

                                                            <tr key={index}>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{cabecalho.id}</td>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{cabecalho.Solicitante}</td>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{cabecalho.designationpeople}</td>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{cabecalho.chapa}</td>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{cabecalho.gestor}</td>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{cabecalho.departamento}</td>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{cabecalho.TipoDeEmpresa}</td>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{cabecalho.obra}</td>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{new Date(cabecalho.created_at).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</td>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{cabecalho.ultimaAtualizacao}</td>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{new Date(cabecalho.updated_at).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</td>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{cabecalho.centro_de_custo}</td>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{cabecalho.direcionado_ao_centro_de_custo}</td>

                                                                {cabecalho.status !== 'Finalizado' ? (
                                                                    <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>
                                                                        <div className="dropdown">
                                                                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                {cabecalho.status}
                                                                            </button>
                                                                            <ul className="dropdown-menu">
                                                                                {optionsData.map((option, index) => (
                                                                                    <li key={index}>
                                                                                        <div onClick={(event) => openModal(option, cabecalho.id)} style={{ cursor: 'pointer' }}>
                                                                                            {option}
                                                                                        </div>
                                                                                    </li>
                                                                                ))}
                                                                            </ul>
                                                                        </div>
                                                                    </td>
                                                                ) : (
                                                                    <td style={{ backgroundColor: getStatusColor(cabecalho.status), textAlign: 'center' }}>
                                                                        <span style={{ cursor: 'default' }}>{cabecalho.status}</span>
                                                                    </td>
                                                                )}
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>
                                                                    <Link to={{ pathname: '/acompanhamento', search: `?cabecalhoId=${cabecalho.id}` }}>
                                                                        <Button className="btn" style={{ backgroundColor: "#1A7A5D" }}>
                                                                            Consultar
                                                                        </Button>
                                                                    </Link>
                                                                </td>
                                                                {cabecalho.status !== 'Finalizado' && cabecalho.status !== 'Pendente' && cabecalho.status !== 'Aprovado' ? (
                                                                    <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>
                                                                        <Link to={{ pathname: '/solicitacaoEdit', search: `?cabecalhoId=${cabecalho.id}` }}>
                                                                            <Button className="btn" style={{ backgroundColor: "#3c00ff" }}>
                                                                                Editar
                                                                            </Button>
                                                                        </Link>
                                                                    </td>
                                                                ) : (
                                                                    <td style={{ backgroundColor: getStatusColor(cabecalho.status), textAlign: 'center' }}></td>
                                                                )}

                                                                {(cabecalho.status === 'Finalizado') ? (<td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>
                                                                    <Link to={{ pathname: '/PDF', search: `?cabecalhoId=${cabecalho.id}` }}>
                                                                        <Button className="btn" style={{ backgroundColor: "#FFA500" }}>
                                                                            PDF
                                                                        </Button>
                                                                    </Link>
                                                                </td>) : (<td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>
                                                                </td>)}


                                                            </tr>
                                                        </>);
                                                    }

                                                    else if (acesso === 'ContabilidadeRembolso' || cabecalho.chapa === chapa) {
                                                        return (<>

                                                            {showModal && (
                                                                <div className="modal fade show -scroll-mt-80" tabIndex="-1" style={{ display: 'block', zIndex: '1050' }}>
                                                                    <div className="modal-dialog">
                                                                        <div className="modal-content">
                                                                            <div className="modal-header">
                                                                                <h5 className="modal-title">A alteracao de status e irreversivel, deseja continuar?</h5>
                                                                                <button type="button" className="btn-close" onClick={closeModal}></button>
                                                                            </div>
                                                                            {(status === 'Cancelado' || status === 'Rejeitado') && (
                                                                                <div className="modal-body">
                                                                                    {/* Conteúdo da modal */}
                                                                                    <textarea
                                                                                        style={{ width: '100%', height: '200px', resize: 'none' }} // Tamanho fixo e impedir redimensionamento
                                                                                        value={reasonforcancellation} // Usar o estado como valor do textarea
                                                                                        onChange={handleTextareaChange} // Atualizar o estado quando o conteúdo do textarea for alterado
                                                                                    />
                                                                                </div>
                                                                            )}
                                                                            <div className="modal-footer">
                                                                                {/* Botões de ação */}
                                                                                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                                                                    Fechar
                                                                                </button>
                                                                                <button type="button" className="btn btn-primary" onClick={(event) => handleStatusChange(status, id)}>
                                                                                    Salvar mudanças
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}

                                                            <tr key={index}>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{cabecalho.id}</td>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{cabecalho.Solicitante}</td>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{cabecalho.designationpeople}</td>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{cabecalho.chapa}</td>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{cabecalho.gestor}</td>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{cabecalho.departamento}</td>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{cabecalho.TipoDeEmpresa}</td>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{cabecalho.obra}</td>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{new Date(cabecalho.created_at).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</td>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{cabecalho.ultimaAtualizacao}</td>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{new Date(cabecalho.updated_at).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</td>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{cabecalho.centro_de_custo}</td>
                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>{cabecalho.direcionado_ao_centro_de_custo}</td>
                                                                {(cabecalho.status === 'Pendente' || cabecalho.status === 'Aprovado' || (cabecalho.status === 'Pre-aprovado' && nome === cabecalho.gestor)) ? (
                                                                    <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>
                                                                        <div className="dropdown">
                                                                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                {cabecalho.status}
                                                                            </button>
                                                                            <ul className="dropdown-menu">
                                                                                {(cabecalho.status === 'Pendente' && cabecalho.gestor != null) ? (
                                                                                    optionsDataContabilidadeReturn.map((option, index) => (
                                                                                        <li key={index}>
                                                                                            <div onClick={(event) => openModal(option, cabecalho.id)} style={{ cursor: 'pointer' }}>
                                                                                                {option}
                                                                                            </div>
                                                                                        </li>
                                                                                    ))
                                                                                )
                                                                                    :
                                                                                    (cabecalho.status === 'Pre-aprovado' && cabecalho.gestor != null) ? (
                                                                                        optionsDataGestorReembolso.map((option, index) => (
                                                                                            <li key={index}>
                                                                                                <div onClick={(event) => openModal(option, cabecalho.id)} style={{ cursor: 'pointer' }}>
                                                                                                    {option}
                                                                                                </div>

                                                                                            </li>
                                                                                        ))
                                                                                    ) :
                                                                                        (
                                                                                            optionsDataContabilidade.map((option, index) => (
                                                                                                <li key={index}>
                                                                                                    <div onClick={(event) => openModal(option, cabecalho.id)} style={{ cursor: 'pointer' }}>
                                                                                                        {option}
                                                                                                    </div>
                                                                                                </li>
                                                                                            ))
                                                                                        )}
                                                                            </ul>
                                                                        </div>
                                                                    </td>
                                                                ) : (
                                                                    <td style={{ backgroundColor: getStatusColor(cabecalho.status), textAlign: 'center' }}>
                                                                        <span style={{ cursor: 'default' }}>{cabecalho.status}</span>
                                                                    </td>
                                                                )}

                                                                <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>
                                                                    <Link to={{ pathname: '/acompanhamento', search: `?cabecalhoId=${cabecalho.id}` }}>
                                                                        <Button className="btn" style={{ backgroundColor: "#1A7A5D" }}>
                                                                            Consultar
                                                                        </Button>
                                                                    </Link>
                                                                </td>
                                                                {cabecalho.status === 'Cancelado' && cabecalho.Solicitante === nome || cabecalho.status === 'Rejeitado' && cabecalho.Solicitante === nome ? (
                                                                    <td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>
                                                                        <Link to={{ pathname: '/solicitacaoEdit', search: `?cabecalhoId=${cabecalho.id}` }}>
                                                                            <Button className="btn" style={{ backgroundColor: "#3c00ff" }}>
                                                                                Editar
                                                                            </Button>
                                                                        </Link>
                                                                    </td>
                                                                ) : (
                                                                    <td style={{ backgroundColor: getStatusColor(cabecalho.status), textAlign: 'center' }}></td>
                                                                )}
                                                                {(cabecalho.status === 'Finalizado') ? (<td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>
                                                                    <Link to={{ pathname: '/PDF', search: `?cabecalhoId=${cabecalho.id}` }}>
                                                                        <Button className="btn" style={{ backgroundColor: "#FFA500" }}>
                                                                            PDF
                                                                        </Button>
                                                                    </Link>
                                                                </td>) : (<td style={{ backgroundColor: getStatusColor(cabecalho.status) }}>
                                                                </td>)}

                                                            </tr>

                                                        </>);
                                                    }
                                                    return null;
                                                })}
                                            </>
                                        )}
                                        {(!inforeembolso || inforeembolso.length === 0) && (
                                            <tr>
                                                <td colSpan="9" style={{ textAlign: "center" }}>
                                                    {inforeembolso ? "Nenhuma solicitação encontrada" : "Carregando..."}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col text-center">
                            <Link to="/main">
                                <Button className="btn" style={{ backgroundColor: "#285C72" }}>
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

export default Consulta;
