import React, { useState, useEffect } from "react";
import anexoIcon from "../../../js/assets/icons/anexar.png";
import removeIcon from "../../../js/assets/icons/x.png";
import enviarDadosParaBackend from '../../hooks/functions/submitbackend/submitbackendDataandFile';
import useEncaminhar from '../../hooks/functions/encaminhar/useEncaminhar'
import { Dropdown } from '../index'
import { useUser } from '../../userContext';

const CampoFormularioEdit = ({
    setShowModal, // Desestruture apenas a função setShowModal aqui
    camposDoBanco,
    selectedOption,
    setSelectedOption }
) => {
    const { domain } = useUser();
    const [data, setData] = useState('');
    const [despesa, setDespesa] = useState('');
    const [valor, setValor] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [total, setTotal] = useState(0);
    const [moeda, setMoeda] = useState('R$');
    const [msg, setMsg] = useState('');
    const [dadosFormularios, setDadosFormularios] = useState([]);
    const [Produltos, setProdultos] = useState([]);
    const [notificationVisible, setNotificationVisible] = useState(false);
    const [valorEmDolar, setValorEmDolar] = useState(false);
    const [itsVersionament, setItsVersionament] = useState('Desktop');
    const [style, setstyle] = useState('col');
    const searchParams = new URLSearchParams(location.search);
    const parametro = searchParams.get('cabecalhoId');

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

    const handleShow = () => {

        setShowModal(true);
        setMsg(<span style={{ color: 'green', fontWeight: 'bold' }}>Solicitação enviada com sucesso!</span>);
    };

    useEffect(() => {

        const url = `${domain}despesas`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar os dados');
                }
                return response.json();
            })
            .then(data => {
                setData(data)
                let listDescricao = ['Selecione uma opcao'];
                data.forEach((element, index) => {

                    listDescricao.push(element['descricao']);

                });
                setProdultos(listDescricao);

            })
            .catch(error => {
                console.error('Erro ao buscar os dados:', error);
            });
    }, []);



    const encaminhar = useEncaminhar();

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


    const showNotificationTimeout = (message) => {
        setNotificationVisible(true);
    };

    const handleCheckboxChange = (index, event) => {
        const newValue = event.target.checked;
        setDadosFormularios((prevState) => {
            const newState = [...prevState];
            newState[index].valorEmDolar = newValue; // Atualiza o valorEmDolar do formulário específico
            newState[index].total = calcularTotal(
                newState[index].valor,
                newState[index].quantidade,
                newState[index].despesa,
                data
            );
            return newState;
        });
    };


    const validarCPF = (cpf) => {
        cpf = cpf.replace(/(?=[^xX]*$)/g, ''); // Remove caracteres n�o num�ricos, exceto 'x' e 'X'

        return cpf.length === 11; // Verifica se o CPF tem exatamente 11 d�gitos
    };





    // Função para verificar se a data é válida
    function isValidDate(dateString) {
        // Verifica se a string passada pode ser convertida para uma data válida
        const date = new Date(dateString);
        return date instanceof Date && !isNaN(date);
    }

    const isWithin30Days = (dateString) => {
        // Converta a data fornecida para um objeto Date
        const providedDate = new Date(dateString);

        // Obtenha a data atual
        const currentDate = new Date();

        // Calcule a diferença em milissegundos entre as duas datas
        const differenceInMilliseconds = currentDate - providedDate;

        // Converta a diferença para dias
        const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

        // Verifique se a diferença está dentro do intervalo de 30 dias
        return differenceInDays <= 30;
    };

    const isWithin24Hours = (dateString) => {
        // Converta a data fornecida para um objeto Date
        const providedDate = new Date(dateString);

        // Obtenha a data atual
        const currentDate = new Date();

        // Calcule a diferença em milissegundos entre as duas datas
        const differenceInMilliseconds = currentDate - providedDate;

        // Converta a diferença para horas
        const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);

        // Verifique se a diferença está dentro do intervalo de 24 horas
        return Math.abs(differenceInHours) < 24;
    };




    const handleSubmit = () => {


        let isValid = true;
        let listCampos =
            [
                'Objetivo',
                'Obra',
                'Deartamento',
                'CPF',
                'Gestor',
                'Centro de Custo',
                'Período',
                'Até',
                'Direcionado ao centro de custo',
                'chapa',
                'nome',
                'acesso',
                'Empresa',
                'para a:',
            ];



        camposDoBanco['camposDoBanco'].forEach((campo, index) => {
            // console.log(campo)
            if (index === 14 && campo) {
                camposDoBanco['camposDoBanco'].forEach((campo, index) => {
                    if (!campo && index === 13) {
                        isValid = false;
                        setMsg(`O campo ${listCampos[index]} está vazio.`);
                        return;
                    }
                });
                return;
            }


            // Verifica se algum campo está vazio, exceto para os campos 1 e 4
            if (!campo && index !== 1 && index !== 4 && index !== 13 && index !== 14) {
                isValid = false;
                setMsg(`O campo de ${listCampos[index]} está vazio.`);
                // Retorna apenas se não for um dos campos opcionais
                return;
            }


            // Verifica se os índices são 6 e 7 e se os campos não são datas ou se a data 7 é maior que a data 8
            if ((index === 6 || index === 7) && !isValidDate(campo)) {
                isValid = false;
                setMsg(`O campo ${listCampos[index]} deve ser uma data válida.`);
                return; // Sai do loop se as datas forem inválidas
            }


            if (index === 3) {
                const novoCPF = campo.replace(/[^\dx]/gi, '');
                camposDoBanco['camposDoBanco'][index] = novoCPF;
                if (!validarCPF(novoCPF)) {
                    isValid = false;
                    setMsg(`O campo de ${listCampos[index]} está invalido.`);
                    // Retorna apenas se não for um dos campos opcionais
                    return;
                }

            }








            if (index === 12 && !campo) {
                isValid = false;
                setMsg(`O campo ${listCampos[index]} deve ser uma data válida.`);
                return; // Sai do loop se as datas forem inválidas
            }

        });





        dadosFormularios.forEach((formulario, index) => {
            console.log('formulario', formulario)

            let searchvalue;
            for (const element of data) {
                // Verifica se a descrição do elemento é igual ao valor fornecido
                if (element.descricao === formulario.despesa) {
                    console.log(element.Tipo_NF)
                    searchvalue = element['Tipo_NF']
                }
            }

            console.log('searchvalue', searchvalue)



            if (formulario.data === '') {
                setMsg('Preencha o campo Data no formulário ' + (index + 1));
                isValid = false;
            }

            if (formulario.direcionadoPara === '') {
                setMsg('Preencha o campo direcionadoPara no formulário ' + (index + 1));
                isValid = false;
            }

            if (searchvalue === null || searchvalue === 'Cupom') {
                const dentroDoPrazo = isWithin30Days(formulario.data);
                if (!dentroDoPrazo) {
                    setMsg('A data do formulario ' + (index + 1) + ' está fora do prazo de 30 dias.');
                    isValid = false;
                }
            } else {
                const dentroDoPrazo = isWithin24Hours(formulario.data);
                if (!dentroDoPrazo) {
                    setMsg('A data do formlario ' + (index + 1) + ' está fora do prazo imediato.');
                    isValid = false;
                }
            }

            if (formulario.despesa === '') {
                setMsg('Selecione uma opção para o campo Despesa no formulário ' + (index + 1));
                isValid = false;
            }

            if (formulario.despesa === '2' || formulario.despesa === '3') {
                formulario.valor = '0';
                formulario.quantidade = '0';
            }

            else {
                if (formulario.valor === '') {
                    setMsg('Preencha o campo Valor no formulário ' + (index + 1));
                    isValid = false;
                }

                if (formulario.quantidade === '') {
                    setMsg('Preencha o campo Quantidade no formulário ' + (index + 1));
                    isValid = false;
                }
            }

            if (formulario.descricao === '') {
                setMsg('Preencha o campo Descrição no formulário ' + (index + 1));
                isValid = false;
            }
            if (formulario.pagamento === '') {
                setMsg('Preencha o campo tipo de pagamento no formulário ' + (index + 1));
                isValid = false;
            }



        });

        if (!isValid) {
            return;
        }

        const dadosParaEnviar = dadosFormularios.map(formulario => {
            return {
                data: formulario.data,
                despesa: formulario.despesa,
                valor: formulario.valor,
                quantidade: formulario.quantidade,
                total: formulario.total,
                anexos: formulario.anexos,
                descricao: formulario.descricao,
                itsdolar: formulario.valorEmDolar,
                pagamento: formulario.pagamento,
                direcionadoPara: formulario.direcionadoPara,
            };

        });


        let dados = {
            dadosParaEnviar: dadosParaEnviar,
            camposDoBanco: camposDoBanco
        }

        let listfile = []
        dadosParaEnviar.forEach((element) => {
            listfile.push(element['anexos'])
        })

        const rotaBack = `${domain}solicitcaoEditSubmit?parametro=${parametro}`;
        let mensagem = enviarDadosParaBackend(rotaBack, dados, listfile)

        handleShow()

        mensagem.then((valor) => {
            console.log('valor', valor)
        }).catch((erro) => {
            console.error(erro); // Lidar com erros, se houver
        });
        setMsg(<span style={{ color: 'green', fontWeight: 'bold' }}>Solicitação enviados com sucesso!</span>);
    };

    const formatCurrency = (value) => {
        if (value !== undefined && value !== null) {
            return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
        } else {
            return "";
        }
    };


    const duplicarFormulario = () => {
        const novoFormulario = {
            pagamento: '',
            data: "",
            despesa: "",
            valor: "",
            quantidade: "",
            total: "",
            anexos: [],
            descricao: "",
            nomeArquivo: "Selecione o arquivo",
            valorEmDolar: false, // Adiciona a propriedade valorEmDolar inicialmente como false
            direcionadoPara: selectedOption
        };
        setDadosFormularios([...dadosFormularios, novoFormulario]);
    };


    const removerFormulario = (index) => {
        const novosFormularios = [...dadosFormularios];
        novosFormularios.splice(index, 1);
        setDadosFormularios(novosFormularios);
    };

    const handleFileChange = (index, event) => {
        const file = event.target.files[0];
        const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];

        if (file && allowedTypes.includes(file.type)) {
            const newState = [...dadosFormularios];
            newState[index].anexos = [file]; // Adiciona o arquivo ao estado
            newState[index].nomeArquivo = file.name; // Atualiza o nome do arquivo
            setDadosFormularios(newState);
            showNotificationTimeout(<span style={{ color: 'blue', fontWeight: 'bold' }}>Arquivo foi enviado com sucesso.</span>);
        } else {
            showNotificationTimeout("Formato do arquivo inválido.");
        }
    };

    const removeFile = (index) => {
        const newState = [...dadosFormularios];
        newState[index].anexos = [];
        newState[index].nomeArquivo = "Selecione o arquivo";
        setDadosFormularios(newState);
    };

    const calcularTotal = (valor, quantidade, despesa, data) => {





        if (quantidade) {
            return quantidade * valor
        }
        else { return valor }
    };

    const getQuantidadeLabel = (despesa) => {
        if (despesa === "4") {
            return "Km Rodado";
        } else {
            return "Quantidade";
        }
    };



    function disabledqtde(value, data) {
        const element = data.find(element => element.descricao === value);
        if (element) {
            return !element.qnt_editavel;
        }
        return !false; // ou true, dependendo do comportamento desejado se o elemento não for encontrado
    }



    function disabledvalue(value, data) {
        // Usa um loop for-of para iterar sobre os elementos do array 'data'
        for (const element of data) {
            // Verifica se a descrição do elemento é igual ao valor fornecido
            if (element.descricao === value) {
                // Verifica se o valor não é nulo
                if (element.valor !== null) {
                    return true; // Retorna true se o valor não for nulo
                } else {
                    return false; // Retorna false se o valor for nulo
                }
            }
        }
        return false; // Retorna false se nenhum elemento corresponder ao valor fornecido
    }


    return (
        <div>
            {dadosFormularios.map((formulario, index) => (
                <div key={index} className="container mt-3">
                    <div className="row mt-4  d-flex justify-content-center">
                        <hr
                            style={{
                                borderBottom: "2px solid black",
                            }}
                        />

                        <label htmlFor={`valor_${index}`}>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={formulario.valorEmDolar} // Alterado para formulario.valorEmDolar
                                    onChange={(e) => handleCheckboxChange(index, e)} // Passa o índice para a função handleCheckboxChange
                                    id={`flexCheckDefault_${index}`}
                                />
                                <div>
                                    <label
                                        className={`form-check-label ${itsVersionament === 'Tablet' || itsVersionament === 'Celular'
                                            ? 'small'
                                            : 'normal'
                                            }`}
                                        htmlFor={`flexCheckDefault_${index}`}
                                    >
                                        Dólar
                                    </label>

                                </div>

                            </div>
                        </label>


                        <div className={style}>
                            <label htmlFor={`data_${index}`}>Data</label>
                            <input
                                type="date"
                                id={`data_${index}`}
                                className="form-control"
                                value={formulario.data}
                                onChange={(e) =>
                                    setDadosFormularios((prevState) => {
                                        const newState = [...prevState];
                                        newState[index].data = e.target.value;
                                        return newState;
                                    })
                                }
                            />
                        </div>
                        <div className={style}>
                            <label htmlFor={`despesa_${index}`}>Despesa</label>

                            <select
                                className="form-select"
                                id={`despesa_${index}`}
                                value={formulario.despesa}
                                onChange={(e) =>
                                    setDadosFormularios((prevState) => {
                                        const newState = [...prevState];
                                        newState[index].despesa = e.target.value;
                                        for (const element of data) {
                                            // Verifica se a descrição do elemento é igual ao valor fornecido
                                            if (element.descricao === e.target.value) {
                                                // Verifica se o valor não é nulo
                                                if (element.valor !== null) {
                                                    newState[index].valor = element.valor;
                                                }
                                                else {
                                                    newState[index].valor = 0;
                                                }
                                                if (!element.qnt_editavel) {
                                                    newState[index].quantidade = 0;
                                                }
                                            }
                                        }
                                        newState[index].total = calcularTotal(
                                            newState[index].valor,
                                            newState[index].quantidade,
                                            e.target.value,
                                            data
                                        );
                                        return newState;
                                    })
                                }
                            >
                                <option value={''}>Selecione uma opção</option>
                                {data.map((produto, produtoIndex) => (
                                    produto['active'] && (<option key={produtoIndex} value={produto['descricao']}>{produto['descricao']}</option>)
                                ))}
                            </select>
                        </div>
                        <div className={style}>
                            <label
                                className={`form-check-label ${itsVersionament === 'Tablet' || itsVersionament === 'Celular'
                                    ? 'small'
                                    : 'normal'
                                    }`}
                                htmlFor={`flexCheckDefault_${index}`}
                            >
                                Valor
                            </label>
                            <input
                                type="number"
                                id={`valor_${index}`}
                                className="form-control"
                                value={formulario.valor}
                                onChange={(e) =>
                                    setDadosFormularios((prevState) => {
                                        const newState = [...prevState];
                                        newState[index].valor = e.target.value;
                                        newState[index].total = calcularTotal(
                                            e.target.value,
                                            formulario.quantidade,
                                            formulario.despesa,
                                            data
                                        );
                                        return newState;
                                    })}
                                disabled={disabledvalue(formulario.despesa, data)}
                            />
                        </div>
                        <div className={style}>
                            <label htmlFor={`pagamento_${index}`}>Pagamento</label>
                            <select
                                className="form-select"
                                id={`pagamento_${index}`}
                                value={formulario.pagamento}
                                onChange={(e) =>
                                    setDadosFormularios((prevState) => {
                                        const newState = [...prevState];
                                        newState[index].pagamento = e.target.value;
                                        return newState;
                                    })
                                }
                            >
                                <option value="">Selecione uma opção</option>
                                <option value="cartao coorporativo">Cartão coorporativo</option>
                                <option value="dinheiro">Dinheiro</option>
                            </select>
                        </div>
                        <div className={style}>
                            <label htmlFor={`quantidade_${index}`}>{getQuantidadeLabel(formulario.despesa)}</label>
                            <input
                                type="number"
                                id={`quantidade_${index}`}
                                className="form-control"
                                value={formulario.quantidade}
                                onChange={(e) =>
                                    setDadosFormularios((prevState) => {
                                        const newState = [...prevState];
                                        newState[index].quantidade = e.target.value;
                                        newState[index].total = calcularTotal(
                                            formulario.valor,
                                            e.target.value,
                                            formulario.despesa,
                                            data
                                        );
                                        return newState;
                                    })}
                                disabled={disabledqtde(formulario.despesa, data)}
                            />
                        </div>
                        <div className={style}>
                            <label htmlFor={`total_${index}`}>Total</label>
                            <input
                                type="text"
                                id={`total_${index}`}
                                className="form-control"
                                value={formulario.valorEmDolar ? `$${formulario.total}` : formatCurrency(formulario.total)}
                                readOnly
                            />
                        </div>
                        <div className="mt-2">
                            <div className="input-group mb-1">
                                <div className="input-group flex-nowrap">
                                    <span className="input-group-text" id="addon-wrapping">
                                        Escolher Ficheiro
                                    </span>
                                    <label
                                        key={formulario.nomeArquivo}
                                        className="form-control border-0 bg-light d-flex align-items-center justify-content-between"
                                        style={{ cursor: "pointer" }}
                                    >
                                        <span style={{ width: "80%" }}>
                                            {formulario.nomeArquivo}
                                        </span>
                                        <img
                                            key={formulario.nomeArquivo}
                                            src={anexoIcon}
                                            alt="Arquivo adicionado"
                                            style={{ width: "20px", height: "20px" }}
                                        />
                                        <input
                                            type="file"
                                            id={formulario.nomeArquivo}
                                            style={{ display: "none" }}
                                            onChange={(e) => handleFileChange(index, e)}
                                        />
                                    </label>
                                    <span className="input-group-text" id="addon-wrapping">
                                        <label>
                                            {formulario.anexos.length > 0 ? (
                                                <button
                                                    className="btn btn-outline-danger"
                                                    type="button"
                                                    onClick={() => removeFile(index)}
                                                >
                                                    <img
                                                        src={removeIcon}
                                                        alt="Remover"
                                                        style={{ width: "20px", height: "20px" }}
                                                    />
                                                </button>
                                            ) : (
                                                <>
                                                </>
                                            )}
                                        </label>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style}>
                        <div className="container mt-8">
                            <div className="form-floating">
                                <textarea
                                    className="form-control"
                                    placeholder="Leave a comment here"
                                    id={`descricao_${index}`}
                                    value={formulario.descricao}
                                    onChange={(e) =>
                                        setDadosFormularios((prevState) => {
                                            const newState = [...prevState];
                                            newState[index].descricao = e.target.value;
                                            return newState;
                                        })
                                    }
                                ></textarea>
                                <label htmlFor={`descricao_${index}`}>Descrição</label>
                            </div>
                        </div>
                    </div>

                    <div className={style}>
                        <label htmlFor={`direcionadoPara_${index}`}>Direcionado para o centro de custo:</label>
                        <select
                            className="form-select"
                            id={`direcionadoPara_${index}`}
                            value={formulario.direcionadoPara} // Ajustado para acessar o valor correto do estado
                            onChange={(e) =>
                                setDadosFormularios((prevState) => {
                                    const newState = [...prevState];
                                    newState[index].direcionadoPara = e.target.value;
                                    return newState;
                                })
                            }
                        >
                            <option value="">Selecione uma opção</option>

                            {/* Mapeia os dados de optionsData para criar as opções */}
                            {optionsData.map((value, idx) => (
                                <option key={idx} value={value}>{value}</option>
                            ))}
                        </select>
                    </div>
                    <div className="container mt-3" style={{ marginLeft: '-0.7rem' }}>
                        <button
                            className="btn btn-danger"
                            onClick={() => removerFormulario(index)}
                        >
                            Remover Formulário
                        </button>
                    </div>
                    <div className="row mt-3">
                        <div className="d-flex justify-content-center">
                            {msg && <div style={{ color: 'red', marginTop: '0px', marginLeft: '-8rem' }}>{msg}</div>}

                        </div>
                    </div>
                </div>
            ))}
            <div className="container " style={{ marginTop: '-0.6rem' }}>
                <div className="mt-3">
                    <button className="btn btn-primary" onClick={duplicarFormulario}>
                        Adicionar Formulário
                    </button>
                </div>

                {dadosFormularios.length !== 0 && (
                    <div className="d-flex justify-content-center">
                        <button
                            style={{ backgroundColor: "#00492F" }}
                            className='btn btn-primary mt-3'
                            onClick={handleSubmit}
                        >
                            Enviar Solicitacao
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CampoFormularioEdit;
