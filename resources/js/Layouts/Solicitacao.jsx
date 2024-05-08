import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import CampoFormulario from "../Components/CampoFormulario";
import { validarFormulario } from "../hooks/functions/ValidarCamposBanco";
import NavbarReembolso from '../Components/NavbarReembolso/index'
import { Input, Dropdown } from '../Components/index'
import { useUser } from '../userContext';
import useEncaminhar from '../hooks/functions/encaminhar/useEncaminhar'
import enviarDadosParaBackend from '../hooks/functions/submitbackend/submitbackend'; // Importe a função
import { useCookies } from 'react-cookie';
import verificarInatividade from '../hooks/functions/verificaCookies/index';

const Solicitacao = () => {
    const encaminhar = useEncaminhar();
    const { domain } = useUser();
    const [ChapaSubordinado, setChapaSubordinado] = useState();
    const [selectedOptionEmployee, setSelectedOptionEmployee] = useState();
    const [selectedOptionIndustria, setSelectedOptionIndustria] = useState();
    const [userData, setUserData] = useState({ name: "", chapa: "" });
    const [camposDoBanco, setCamposDoBanco] = useState([]);
    const [dadosFormularios, setDadosFormularios] = useState([]);
    const [msg, setMsg] = useState("");
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [redirectToMain, setRedirectToMain] = useState(false);
    const [formIsValid, setFormIsValid] = useState(false);
    const [Objetivo, setObjetivo] = useState();
    const [Obra, setObra] = useState();
    const [Departamento, setDepartamento] = useState();
    const [CPF, setCPF] = useState('');
    const [Gestor, setGestor] = useState();
    const [CentroDeCusto, setCentroDeCusto] = useState();
    const [Periodo, setPeriodo] = useState();
    const [Ate, setAte] = useState();
    const [selectedOption, setSelectedOption] = useState('');
    const [itsVersionament, setItsVersionament] = useState('Desktop');
    const [style, setstyle] = useState('row');
    const [ShowInput, setShowInput] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [InputEmployeeValues, setInputEmployeeValues] = useState();
    const [showModalinit, setshowModalinit] = useState(false);
    const [cookies] = useCookies(['status', 'Nome', 'Chapa', 'Departamento', 'Gestor', 'Acesso', 'CPF']);
    const timeout = verificarInatividade(cookies)
    const status = cookies['status'];
    const nome = cookies['Nome'];
    const chapa = cookies['Chapa'];
    const departamento = cookies['Departamento'];
    const gestor = cookies['Gestor'];
    const acesso = cookies['Acesso'];
    const cpf = cookies['CPF'];
    const isGestor = cookies['isGestor'];

    const handleConfirm = () => {
        // Realiza o redirecionamento para a página principal
        encaminhar('/main');
    };

    const [optionsDataIndustria, setoptionsDataIndustria] = useState([

        'ALPINA EQUIPAMENTOS INDUSTRIAIS LTDA',
        'ALPINA EQUIPAMENTOS INDUSTRIAIS,SERVIÇOS E MONTAGENS LTDA',
        'ALPINA ORION TECNOLOGIA AÇUCAREIRA S/A',
        'ALPINA TERMOPLASTICOS LTDA'
    ])

    const [optionsData, setoptionsData] = useState([
        '110 - ACABAMENTO Equipamentos',
        '110 - ACABAMENTO Equipamentos',
        '7109 - ACABAMENTO Termoplástico',
        '2601 - ADM VENDAS Equipamentos',
        '7201 - ADM VENDAS Termoplástico',
        '7302 - ADMINISTRACAO Termoplástico',
        '1518 - ALMOXARIFADO',
        '7116 - ASSISTENCIA TECNICA Termoplástico',
        '901 - BALANCEAMENTO',
        '7141 - CA-3500 Termoplástico',
        '701 - CALANDRAGEM/MONTAGEM DE AROS',
        '697 - COMERCIAL ORION',
        '2401 - COMPRAS',
        '2102 - CONTABILIDADE',
        '1102 - CONTROLE DA QUALIDADE',
        '2603 - COORDENACAO DE CONTRATOS',
        '2101 - CUSTOS/ORCAMENTOS',
        '1901 - DEPTO MEDICO',
        '402 - ENCHIMENTO A19/W20',
        '404 - ENCHIMENTO SG',
        '2604 - ENGENHARIA DE APLICACAO',
        '2201 - ENGENHARIA DE PRODUTO',
        '7401 - ENGENHARIA Termoplástico',
        '2109 - EXPORTACAO/IMPORTACAO',
        '301 - EXTRUSAO',
        '2106 - FATURAMENTO',
        '1101 - GARANTIA DA QUALIDADE',
        '599 - GERAL EMBALAGEM',
        '1699 - GERAL EXPEDICAO',
        '3099 - GERAL GER PRODUCAO',
        '1399 - GERAL MANUTENCAO',
        '799 - GERAL MECANICA',
        '199 - GERAL POLIESTER',
        '499 - GERAL SERVICOS Montagem externa',
        '2110 - INFORMATICA/O&M',
        '105 - LAMINACAO 105',
        '107 - LAMINACAO PAS',
        '116 - LIXADEIRA/CORTE',
        '401 - MONTAGEM',
        '705 - OPERADOR OXICORTE',
        '1516 - PLANEJAMENTO E CONTROLE DE PRODUCAO',
        '101 - PREPARACAO DE MATERIAIS-REFORCO',
        '102 - PREPARACAO DE MATERIAIS-RESINAS',
        '2104 - RECURSOS HUMANOS',
        '115 - RTM LIGHT',
        '2902 - SEGURANCA DO TRABALHO',
        '3503 - SEGURANCA-DIRETORIA',
        '704 - SERRALHEIROS',
        '2605 - SERVICOS',
        '7140 - SH-5000 Termoplástico',
        '707 - SOLDADORES',
        '7119 - SUPERVISAO Termoplástico',
        '303 - TERMOFORMAGEM A19/W20',
        '2103 - TESOURARIA',
        '801 - USINAGEM',
        '2607 - VENDAS-PERNAMBUCO',
        '2606 - VENDAS-RIO DE JANEIRO',
    ]);

    useEffect(() => {
        // Definindo os estados iniciais
        setDepartamento(departamento);
        if (cpf !== null) {
            setCPF(
                cpf.toString())
        } else { setCPF() }

        setGestor(gestor);

        function handleResize() {
            const { innerWidth } = window;
            if (innerWidth < 768) {
                setItsVersionament('Celular');
                setstyle('col')
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
    }, [departamento, cpf, gestor, setItsVersionament]); // Adicionando as dependências necessárias

    useEffect(() => {
        if (isGestor) {
            setshowModalinit(true);
        }
        else {
            setshowModalinit(false);
        }
    }, [isGestor]);

    useEffect(() => {
        let chapaSubmit = chapa
        if (ChapaSubordinado) { chapaSubmit = ChapaSubordinado }
        setUserData({ name: nome, chapa: chapa });
        setCamposDoBanco([
            Objetivo,
            Obra,
            Departamento,
            CPF,
            Gestor,
            CentroDeCusto,
            Periodo,
            Ate,
            selectedOption,
            chapaSubmit,
            nome,
            acesso,
            selectedOptionIndustria,
            selectedOptionEmployee,
            ShowInput,

        ]);
    }, [
        Objetivo,
        Obra,
        Departamento,
        CPF,
        Gestor,
        CentroDeCusto,
        Periodo,
        Ate,
        selectedOption,
        acesso,
        selectedOptionIndustria,
        selectedOptionEmployee,
        ShowInput,
        ChapaSubordinado

    ]);

    const handleInputChange = () => {
        const periodo = document.getElementById("periodo").value;
        const ate = document.getElementById("outroCampo").value;
        const isPeriodoValid = periodo !== "";
        const isAteValid = ate !== "";

        setFormIsValid(isPeriodoValid && isAteValid);
        const values = camposDoBanco.map((campo) =>
            document.getElementById(campo).value
        );
        if (values.every(value => !!value) && isPeriodoValid && isAteValid) {
            setFormIsValid(true);
        } else {
            setFormIsValid(false);
        }
    };

    const handleDataSubmission = () => {
        if (showSuccessMessage) {
            return;
        }
        // Obtém os valores dos campos do banco
        const camposBancoValues = camposDoBanco.map((campo) =>
            document.getElementById(campo).value
        );
        // Obtém os valores dos campos dos formulários
        const formDataValues = dadosFormularios.flatMap((formulario) => [
            formulario.data,
            formulario.despesa,
            formulario.anexos,
            formulario.descricao,
        ]);
        // Valida o formulário
        const { isValid, mensagensErro } = validarFormulario(
            userData.name,
            userData.chapa,
            ...camposBancoValues,
            ...formDataValues
        );

        // Verifica se a descrição é "Reembolso KM" para renomear o rótulo do campo de quantidade
        const descricaoIndex = camposDoBanco.indexOf("Descrição");
        const descricao = camposBancoValues[descricaoIndex];
        if (!isValid) {
            const errorMessage =
                "Formulário inválido. Mensagens de erro: " + mensagensErro.join(", ");
            setMsg(errorMessage);
        } else {
            // Enviar os dados para o backend e exibir mensagem de sucesso
            setShowSuccessMessage(true);
            handleSubmit(); // Chamada da função para enviar os dados para o backend
        }

    };

    const handleSelectChangeIndustria = (event) => {
        setSelectedOptionIndustria(event.target.value);
    };

    const handleSelectEmployee = () => {
        setshowModalinit(false);
        setShowInput(true);
        enviarDadosParaBackend("/searcheemployee", nome)
            .then(response => {
                const allValues = response['all'];
                const employeeValues = [nome, ...allValues];
                setInputEmployeeValues(employeeValues);
            })
            .catch(error => {
                console.error('Erro ao buscar funcionário:', error);
            });
    };

    const handleCPF = (value) => {
        console.log('value', value)
        enviarDadosParaBackend("/getCPF", value)
            .then(response => {
                console.log(response.resposta[0]['CPF'])
                setChapaSubordinado(response.resposta[0]['Chapa'])
                setCPF(response.resposta[0]['CPF'])

            })
            .catch(error => {
                console.error('Erro ao buscar CPF:', error);
            });
    }

    const handleCentroDeCusto = (value) => {
        setSelectedOption(value)
    }

    if (timeout) {
        return (
            <>
                <div className="Solicitacao">
                    <div>
                        <div className={`modal fade ${showModalinit ? 'show' : ''}`} style={{ display: showModalinit ? 'block' : 'none' }}>
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Atenção</h5>
                                    </div>
                                    <div className="modal-body">
                                        A solicitação é para você ou outra pessoa?
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={() => { handleSelectEmployee() }}>Outra pessoa</button>
                                        <button type="button" className="btn btn-primary" onClick={() => { setshowModalinit(false); setShowInput(false); }}>Para você</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {showModalinit && <div className="modal-backdrop fade show"></div>}

                        <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}>
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Atenção</h5>
                                    </div>
                                    <div className="modal-body">
                                        Solicitação enviada com sucesso!
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-primary" onClick={handleConfirm}>Confirmar</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <NavbarReembolso titulo={'Solicitação de reembolso'} Nome={userData.name} Chapa={userData.chapa} />
                        <div>
                            <div className="container mt-5 ">
                                <div className={style + " mt-5"}>
                                    <Input
                                        obrigatorio={true}
                                        etiqueta={'Objetivo'}
                                        desativado={false}
                                        input={Objetivo}
                                        setinput={setObjetivo}
                                        tipo={'text'}
                                        subtitulo={'Objetivo'}
                                    />
                                    <Input obrigatorio={false}
                                        etiqueta={'Obra'}
                                        desativado={false}
                                        input={Obra}
                                        setinput={setObra}
                                        tipo={'text'}
                                        subtitulo={'Obra'}
                                    />
                                    <Input
                                        obrigatorio={true}
                                        etiqueta={'Departamento'}
                                        desativado={false}
                                        input={Departamento}
                                        setinput={setDepartamento}
                                        tipo={'text'}
                                        subtitulo={'Departamento'}
                                    />
                                    <Input
                                        obrigatorio={true}
                                        etiqueta={'CPF'}
                                        desativado={false}
                                        input={CPF}
                                        setinput={setCPF}
                                        tipo={'text'}
                                        subtitulo={'CPF'}
                                    />
                                    <Input
                                        obrigatorio={true}
                                        etiqueta={'Gestor'}
                                        desativado={true}
                                        input={Gestor}
                                        setinput={setGestor}
                                        tipo={'text'}
                                        subtitulo={'Gestor'}
                                    />

                                    {ShowInput && (
                                        <>
                                            <Dropdown
                                                desativado={false}
                                                selectedOption={selectedOptionEmployee}
                                                setSelectedOption={setSelectedOptionEmployee}
                                                optionsData={InputEmployeeValues}
                                                etiqueta="Para:"
                                                obrigatorio={true}
                                                handleSelectChange={handleCPF}
                                            />
                                        </>
                                    )}

                                    <Dropdown
                                        desativado={false}
                                        selectedOption={selectedOptionIndustria}
                                        setSelectedOption={setSelectedOptionIndustria}
                                        optionsData={optionsDataIndustria}
                                        etiqueta="Empresa"
                                        obrigatorio={true}
                                    />

                                    <Dropdown
                                        desativado={false}
                                        selectedOption={CentroDeCusto}
                                        setSelectedOption={setCentroDeCusto}
                                        optionsData={optionsData}
                                        etiqueta="Centro de custo"
                                        obrigatorio={true}
                                        handleSelectChange={handleCentroDeCusto}
                                    />

                                    <Input
                                        obrigatorio={true}
                                        etiqueta={'Período'}
                                        desativado={false}
                                        input={Periodo}
                                        setinput={setPeriodo}
                                        tipo={'date'}
                                        subtitulo={'Período'}
                                    />
                                    <Input
                                        obrigatorio={true}
                                        etiqueta={'Até'}
                                        desativado={false}
                                        input={Ate}
                                        setinput={setAte}
                                        tipo={'date'}
                                        subtitulo={'Até'}
                                    />



                                </div>
                            </div>
                            <div className="row mb-5">
                                <CampoFormulario
                                    showModal={showModal}
                                    setShowModal={setShowModal}
                                    camposDoBanco={{ camposDoBanco }}
                                    selectedOption={selectedOption}
                                    setSelectedOption={setSelectedOption}
                                />
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    marginTop: "20px",
                                }}
                            >
                                <Link to="/main">
                                    <Button
                                        style={{ backgroundColor: "#285C72", marginRight: "0px" }}
                                        className="px-4 py-2 btn"
                                    >
                                        Voltar
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div >
            </>
        );
    } else {
        encaminhar('/login')
    }
};


export default Solicitacao;