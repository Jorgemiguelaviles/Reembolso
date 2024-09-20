import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import CampoFormularioEdit from "../Components/CampoFormularioEdit";
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
    const [selectedOptionIndustria, setSelectedOptionIndustria] = useState();
    const [CPFespecial, setCPFespecial] = useState();
    const [userData, setUserData] = useState({ name: "", chapa: "" });
    const [camposDoBanco, setCamposDoBanco] = useState([]);
    const [msg, setMsg] = useState("");
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [redirectToMain, setRedirectToMain] = useState(false);
    const [formIsValid, setFormIsValid] = useState(false);
    const [ShowInput, setShowInput] = useState(false);
    const [showModalinit, setshowModalinit] = useState(false);
    const [InputEmployeeValues, setInputEmployeeValues] = useState(false);
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
    const [showModal, setShowModal] = useState(false);
    const [selectedOptionEmployee, setSelectedOptionEmployee] = useState();
    const [dadosFormularios, setDadosFormularios] = useState([]);
    const [formularios, setFormularios] = useState();
    const [optionsDataIndustria, setoptionsDataIndustria] = useState([
        'ALPINA EQUIPAMENTOS INDUSTRIAIS LTDA',
        'ALPINA EQUIPAMENTOS INDUSTRIAIS,SERVIÇOS E MONTAGENS LTDA',
        'ALPINA ORION TECNOLOGIA AÇUCAREIRA S/A',
        'ALPINA TERMOPLASTICOS LTDA'
    ])

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


    const [optionsData, setoptionsData] = useState([
        '60 - ESTAGIARIOS',
        '101 - CORTE DE REFORCOS DE VIDRO',
        '102 - PREPARACAO DE RESINAS',
        '105 - LAMINACAO SPRAY-UP',
        '107 - LAMINACAO DE PAS',
        '110 - ACABAMENTO Equipamentos',
        '1101 - GARANTIA DA QUALIDADE',
        '1102 - CONTROLE DA QUALIDADE',
        '111 - REPARO/RETRABALHO',
        '115 - RTM LIGHT',
        '116 - LIXAMENTO E CORTE',
        '1399 - GERAL MANUTENCAO',
        '1510 - SEMI-ACABADOS',
        '1511 - EMPILHADORES',
        '1516 - PLANEJAMENTO E CONTROLE DE PRODUCAO',
        '1518 - ALMOXARIFADO',
        '1598 - SUPERVISAO',
        '1599 - GERAL PCP',
        '1601 - MOTORISTAS',
        '1602 - EMPILHADORES',
        '1698 - SUPERVISAO',
        '1699 - GERAL EXPEDICAO',
        '1901 - DEPTO MEDICO',
        '198 - PULTRUSAO E BMC',
        '199 - GERAL - COMPOSITOS',
        '2101 - CUSTOS/ORCAMENTOS',
        '2102 - Contabilidade',
        '2103 - TESOURARIA',
        '2104 - RECURSOS HUMANOS',
        '2106 - FATURAMENTO',
        '2109 - EXPORTACAO/IMPORTACAO',
        '2110 - INFORMATICA/O&M',
        '2201 - ENGENHARIA DE PRODUTO',
        '2401 - COMPRAS',
        '2601 - ADM/VENDAS EQUIPAMENTOS',
        '2603 - COORDENACAO DE CONTRATOS',
        '2604 - ENGENHARIA DE APLICACAO',
        '2605 - SERVICOS',
        '2606 - VENDAS-RIO DE JANEIRO',
        '2607 - VENDAS-PERNAMBUCO',
        '2610 - MARKETING',
        '2611 - SERVICOS EXTERNOS',
        '2698 - GERENCIA',
        '2902 - SEGURANCA DO TRABALHO',
        '301 - EXTRUSAO DE PERFIS E FILME',
        '303 - TERMOFORMAGEM A19/W20',
        '307 - LIDERES',
        '3099 - GERAL GER PRODUCAO',
        '3503 - ALTA GESTAO',
        '399 - ESTAMPAGEM E MONTAGEM DE ELIMI',
        '401 - PRE-MONTAGEM',
        '402 - COLAGEM ENCHIMENTOS A-19, W-20',
        '404 - MONTAGEM DO ENCHIMENTO SG-BSD',
        '408 - MONTAGEM DE CONJUNTO DE ACIONA',
        '499 - GERAL SERVICOS',
        '502 - EMBALADORES',
        '599 - GERAL EMBALAGEM',
        '601 - LIDERES',
        '697 - ORION - COMERCIAL',
        '698 - SUPERVISAO',
        '701 - FURACAO, CORTE, MONT. E ACABAM',
        '704 - SERRALHERIA',
        '705 - CORTE A PLASMA/OXICORTE',
        '707 - SOLDA',
        '7101 - PREMAP - DISTRIBUICAO',
        '7109 - ACABAMENTO (MONT., SOLDA, ESP)',
        '7116 - ASSISTENCIA TECNICA',
        '7119 - SUPERVISAO',
        '7140 - ROTOMOLDAGEM DT - MAQ. SH-5000',
        '7141 - ROTOMOLDAGEM DT - MAQ. CA-3500',
        '7197 - LIDERES',
        '7201 - ADM VENDAS',
        '7202 - VENDEDORES',
        '7302 - ADMINISTRACAO',
        '7401 - ENGENHARIA',
        '799 - GERAL MECANICA',
        '801 - USINAGEM'
    ]);


    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const parametro = searchParams.get('cabecalhoId');
        const url = `${domain}solicitcaoEdit?parametro=${parametro}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar os dados');
                }
                return response.json();
            })
            .then(data => {
                console.log('Dados :', data);
                console.log('Dados Inforeembolso:', data.Inforeembolso[0]);
                setObjetivo(data.Inforeembolso[0]['objetivo'])
                setObra(data.Inforeembolso[0]['obra'])
                setCentroDeCusto(data.Inforeembolso[0]['centro_de_custo'])
                setPeriodo(data.Inforeembolso[0]['periodo'])
                setAte(data.Inforeembolso[0]['ate'])
                setSelectedOption(data.Inforeembolso[0]['centro_de_custo'])
                setSelectedOptionIndustria(data.Inforeembolso[0]['TipoDeEmpresa'])
                console.log('formularios', data.Formulario)
                var listFormulario = []
                var dicFormulario = []
		console.log('experimentodata', data)
                data.Formulario.forEach((value, index) => {
    		// Cria um novo objeto para cada item
    		const dicFormulario = {
        		data: value.data,
        		despesa: value.despesa,
        		valor: value.valor,
        		pagamento: value.tipoDePagamento,
        		quantidade: value.quantidade,
        		total: value.total,
        		anexos: value.anexo_path !== null ? value.anexo_path : 0,
        		descricao: value.descricao,
        		nomeArquivo: value.anexo_path,
        		valorEmDolar: value.itsdolar,
        		direcionadoPara: value.direcionado_ao_centro_de_custo,
    		};
    		listFormulario.push(dicFormulario);
		});

		setDadosFormularios(listFormulario);
            })
            .catch(error => {
                console.error('Erro ao buscar os dados:', error);
            });
    }, [location.search]);


    useEffect(() => {
        if (isGestor) {
            setshowModalinit(true);
        }
        else {
            setshowModalinit(false);
        }
    }, [isGestor]);

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
            chapa,
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
            console.log(errorMessage);
            setMsg(errorMessage);
        } else {
            console.log("Todos os campos estão preenchidos corretamente.");
            // Enviar os dados para o backend e exibir mensagem de sucesso
            setShowSuccessMessage(true);
            handleSubmit(); // Chamada da função para enviar os dados para o backend
        }

    };

    const handleSelectEmployee = () => {
        setshowModalinit(false);
        setShowInput(true);
        enviarDadosParaBackend("/searcheemployee", nome)
            .then(response => {
                const allValues = response['all'];
                const employeeValues = [nome, ...allValues];
                setInputEmployeeValues(employeeValues);
                // Tratar os dados retornados do backend
            })
            .catch(error => {
                console.error('Erro ao buscar funcionário:', error);
            });
    };

    const handleCPF = (value) => {
        console.log('value', value)
        enviarDadosParaBackend("/getCPF", value)
            .then(response => {
                setCPFespecial(response.resposta)
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
                                        Solicitação atualizada com sucesso!
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
                                    <Input obrigatorio={true}
                                        etiqueta={'Objetivo'}
                                        desativado={false}
                                        input={Objetivo}
                                        setinput={setObjetivo}
                                        tipo={'text'}
                                        subtitulo={'Objetivo'}
                                    />
                                    <Input obrigatorio={true}
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
                                        desativado={true}
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
                                                selectedOption={selectedOptionIndustria}
                                                setSelectedOption={setSelectedOptionIndustria}
                                                optionsData={optionsDataIndustria}
                                                etiqueta="Para:"
                                                obrigatorio={true}
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
                                <CampoFormularioEdit
                                    showModal={showModal}
                                    setShowModal={setShowModal}
                                    camposDoBanco={{ camposDoBanco }}
                                    selectedOption={selectedOption}
                                    setSelectedOption={setSelectedOption}
                                    dadosFormularios={dadosFormularios}
                                    setDadosFormularios={setDadosFormularios}
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
                                        style={{ backgroundColor: "#285C72", marginRight: "0px", marginBottom: "1rem" }}
                                        className="px-4 py-2 btn"
                                    >
                                        Voltar
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        encaminhar('/login')
    }
};


export default Solicitacao;
