import React, { useState, useEffect } from "react";
import NavbarReembolso from "../Components/NavbarReembolso";
import Table from "../Components/Table/index";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useUser } from '../userContext';
import useEncaminhar from '../hooks/functions/encaminhar/useEncaminhar';
import enviarDadosParaBackend from '../hooks/functions/submitbackend/atualizarDadosNoBackend';
import 'react-toastify/dist/ReactToastify.css';
import { Event } from "@mui/icons-material";
import { useCookies } from 'react-cookie';
import verificarInatividade from '../hooks/functions/verificaCookies/index';


function Portal() {
    const { domain } = useUser();
    const [inforeembolso, setInforeembolso] = useState([]);
    const [Formlario, setFormlario] = useState([]);
    const [selectedOption, setSelectedOption] = useState({});
    const encaminhar = useEncaminhar();
    const [selectedStatus, setSelectedStatus] = useState('');
    const [userData, setUserData] = useState({ name: "", chapa: "" });
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

    const handleClick = async (event, cabecalhoId) => {
        await handleStatusChange(event, cabecalhoId);
    };

    const handleStatusChange = async (event, cabecalhoId) => {
        if (event) {
            const newStatus = event.target.textContent;
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

            var valuesLine = [inforeembolso[cabecalhoId - 1], list]

            console.log('valuesLine', valuesLine)

            // Envia os dados atualizados para o backend
            const dados = {
                newStatus: newStatus,
                id: cabecalhoId,
                nome: nome,
                valueesLine: valuesLine,
            }

            try {

                const response = await enviarDadosParaBackend('/status', dados);
                console.log('valores vindos do backend', response);

                // Toast ou outra lógica de feedback aqui
            } catch (error) {
                console.error('Erro ao atualizar o status:', error);
                // Toast ou outra lógica de feedback aqui
            }
        }
    };

    useEffect(() => {
        setUserData({ name: nome, chapa: chapa });
        fetch(`${domain}getDatabase`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erro ao buscar as solicitações");
                }
                return response.json();
            })
            .then((data) => {
                const inforeembolso = data.Inforeembolso;
                const Formulario = data.Formulario

                setInforeembolso(inforeembolso)
                setFormlario(Formulario)
            })
            .catch((error) => console.error("Erro:", error));
    }, []);

    console.log('acesso', acesso)

    if (timeout) {
        return (
            <div>
                <NavbarReembolso titulo={'Portal de Despesas '} Nome={nome} Chapa={chapa} />
                <div className="container">
                    <div className="row mt-3">
                        <div className="col">
                            <div className="table-responsive" style={{ maxHeight: "500px", overflowY: "auto" }}>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <Table />
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

export default Portal;
