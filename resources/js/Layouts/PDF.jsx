import React, { useState, useEffect, useRef } from 'react';
import generatePDF, { Margin } from 'react-to-pdf';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importe o arquivo CSS do Bootstrap
import icons from "../assets/icons/AlpinaLogo.png";
import Input from '../Components/Input/index'
import useEncaminhar from '../hooks/functions/encaminhar/useEncaminhar'
import { useUser } from '../userContext';
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useCookies } from 'react-cookie';
import verificarInatividade from '../hooks/functions/verificaCookies/index';


const recuperarConteudoParaPDF = () => document.getElementById("Conteudo");

const PDF = () => {


    const encaminhar = useEncaminhar();
    const { domain } = useUser();
    const [cookies] = useCookies(['status', 'Nome', 'Chapa', 'Departamento', 'Gestor', 'Acesso', 'CPF']);
    const timeout = verificarInatividade(cookies)
    const status = cookies['status'];
    const nome = cookies['Nome'];
    const chapa = cookies['Chapa'];
    const departamento = cookies['Departamento'];
    const gestor = cookies['Gestor'];
    const acesso = cookies['Acesso'];
    const cpf = cookies['CPF'];



    const [itsVersionament, setItsVersionament] = useState('Desktop');


    const [Empresa, setEmpresa] = useState();
    const [tipoDePagamento, settipoDePagamento] = useState();
    const [Objetivo, setObjetivo] = useState();
    const [Obra, setObra] = useState();
    const [PeriodoDaDespesa, setPeriodoDaDespesa] = useState();
    const [Ate, setAte] = useState();
    const [Name, setName] = useState();
    const [Cargo, setCargo] = useState();
    const [CPF, setCPF] = useState();
    const [Departamento, setDepartamento] = useState();
    const [Supervisor, setSupervisor] = useState();
    const [CodFunc, setCodFunc] = useState();
    const [Solicitante, setSolicitante] = useState();


    const [table, setTable] = useState([]);

    const [Aprovador, setAprovador] = useState();
    const [Anotacoes, setAnotacoes] = useState();
    const [Total, setTotal] = useState();
    const searchParams = new URLSearchParams(location.search);
    const parametro = searchParams.get('cabecalhoId');
    const url = `${domain}getDatabaseBody?cabecalhoId=${parametro}`;





    useEffect(() => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar os dados');
                }
                return response.json();
            })
            .then(data => {
                console.log('data', data)

                setEmpresa(data['dados'][1][0]['TipoDeEmpresa']);
                setObjetivo(data['dados'][1][0]['objetivo']);
                setObra(data['dados'][1][0]['obra']);
                setPeriodoDaDespesa(data['dados'][1][0]['data']);
                setAte(data['dados'][1][0]['ate']);
                setName(data['dados'][1][0]['Solicitante']);
                setSolicitante(data['dados'][1][0]['designationpeople'])
                //setCargo(data['dados'][1][0]['TipoDeEmpresa']);
                setCPF(data['dados'][1][0]['cpf']);
                setDepartamento(data['dados'][1][0]['departamento']);
                setSupervisor(data['dados'][1][0]['gestor']);
                setCodFunc(data['dados'][1][0]['chapa']);
                setAprovador(data['dados'][1][0]['ultimaAtualizacao']);
                setTotal(data['dados'][1][0]['SomaTotalDosValores']);

                setTable(data['dados'][0]);







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






    const targetRef = useRef();

    const personalizacao = {
        // Baixar/Salvar = save / Abrir no navegador = open
        method: 'open',
        page: {
            // Definir a margem: SMALL ou MEDIUM
            margin: Margin.SMALL,
            // Formato da página: A4 ou letter
            format: 'A4',
            // Orientação do arquivo: portrait ou landscape
            orientation: 'landscape',
        },
    }

    const handleClick = () => {
        generatePDF(recuperarConteudoParaPDF, personalizacao);
    };

    if (timeout) {
        return (
            <>

                <div id="Conteudo" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', minHeight: '100vh' }}>
                    <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
                        <div class="row mb-5" style={{ minWidth: '200vh' }}>
                            <div class="row">
                                <div class="col-4 d-flex justify-content-center align-items-center">
                                    <img src={icons} alt="Descrição da imagem" style={{ width: '500px', height: 'auto' }} />
                                </div>
                                <div class="col-4 d-flex flex-column justify-content-center align-items-center">
                                    <div></div>
                                    <div>
                                        <h3 style={{ textAlign: 'center' }}>Relatório de Despesa</h3>
                                    </div>
                                    <div></div>
                                </div>
                                <div class="col-4 d-flex flex-column justify-content-center align-items-center">
                                    <div></div>
                                    <div>
                                        {(() => {
                                            // Obtém a data de hoje
                                            const hoje = new Date();

                                            // Formata a data para o formato desejado (dd/mm/aaaa)
                                            const dataFormatada = hoje.getDate() + '/' + (hoje.getMonth() + 1) + '/' + hoje.getFullYear();

                                            // Retorna a data formatada para ser renderizada dentro do JSX
                                            return <p style={{ textAlign: 'center', margin: '0' }}>{dataFormatada}</p>;
                                        })()}
                                    </div>
                                    <div></div>
                                </div>
                            </div>

                        </div>
                        <div class="m-5">
                            <div class="row">
                                <Input obrigatorio={false} etiqueta={'Objetivo'} desativado={true} input={Objetivo} setinput={setObjetivo} tipo={'text'} subtitulo={'Objetivo'} />
                                <Input obrigatorio={false} etiqueta={'Empresa'} desativado={true} input={Empresa} setinput={setEmpresa} tipo={'text'} subtitulo={'Empresa'} />
                            </div>
                            <div class="row">
                                <Input obrigatorio={false} etiqueta={'Obra'} desativado={true} input={Obra} setinput={setObra} tipo={'text'} subtitulo={'Obra'} />
                                <Input obrigatorio={false} etiqueta={'Periodo da despesa'} desativado={true} input={PeriodoDaDespesa} setinput={setPeriodoDaDespesa} tipo={'date'} subtitulo={'Periodo da despesa'} />
                                <Input obrigatorio={false} etiqueta={'Até'} desativado={true} input={Ate} setinput={setAte} tipo={'date'} subtitulo={'Ate'} />
                                <Input obrigatorio={false} etiqueta={'Autor'} desativado={true} input={Name} setinput={setName} tipo={'text'} subtitulo={'Autor'} />
                                <Input obrigatorio={false} etiqueta={'CPF'} desativado={true} input={CPF} setinput={setCPF} tipo={'text'} subtitulo={'CPF'} />
                                <Input obrigatorio={false} etiqueta={'Departamento'} desativado={true} input={Departamento} setinput={setDepartamento} tipo={'text'} subtitulo={'Departamento'} />
                                <Input obrigatorio={false} etiqueta={''} desativado={true} input={Supervisor} setinput={setSupervisor} tipo={'text'} subtitulo={'Gerente / Supervisor'} />
                                <Input obrigatorio={false} etiqueta={'Chapa'} desativado={true} input={CodFunc} setinput={setCodFunc} tipo={'text'} subtitulo={'Chapa'} />
                                <Input obrigatorio={false} etiqueta={'Solicitante'} desativado={true} input={Solicitante} setinput={setSolicitante} tipo={'text'} subtitulo={'Solicitante'} />
                            </div>
                            <div class='row'>
                                <div class="table-responsive">
                                    <table class="table table-bordered table-hover">
                                        <thead class="thead-dark">
                                            <tr>
                                                <th scope="col">ID</th>
                                                <th scope="col">Data</th>
                                                <th scope="col">Despesa</th>
                                                <th scope="col">Descricao</th>
                                                <th scope="col">Tipo de pagamento</th>
                                                <th scope="col">Quantidade</th>
                                                <th scope="col">Valor</th>
                                                <th scope="col">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {table.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index}</td>
                                                    <td>{item.data}</td>
                                                    <td>{item.despesa}</td>
                                                    <td>{item.descricao}</td>
                                                    <td>{item.tipoDePagamento}</td>
                                                    <td>{item.quantidade}</td>
                                                    <td>{item.itsdolar ? `$${item.valor}` : `R$${item.valor}`}</td>
                                                    <td>{item.itsdolar ? `$${item.total}` : `R$${item.total}`}</td>
                                                </tr>
                                            ))}

                                        </tbody>
                                        { }
                                    </table>
                                </div>
                            </div>
                            <div class="row">
                                <Input obrigatorio={false} etiqueta={'Aprovador'} desativado={true} input={Aprovador} setinput={setAprovador} tipo={'text'} subtitulo={'Aprovador'} />
                                <Input obrigatorio={false} etiqueta={'Anotações'} desativado={true} input={Anotacoes} setinput={setAnotacoes} tipo={'text'} subtitulo={'Anotações'} />
                                <Input obrigatorio={false} etiqueta={'Total'} desativado={true} input={Total} setinput={setTotal} tipo={'text'} subtitulo={'Total'} />
                            </div>
                        </div>
                    </div>
                </div>



                <div className="row mt-3">
                    <div className="col text-center">
                        <Button className="btn" onClick={handleClick} style={{ backgroundColor: "#00ff1e" }}>
                            Imprimir
                        </Button>
                    </div>
                </div>


                <div className="row mt-3">
                    <div className="col text-center">
                        <Link to="/Consulta">
                            <Button className="btn" style={{ backgroundColor: "#285C72" }}>
                                Voltar
                            </Button>
                        </Link>
                    </div>
                </div>
            </>
        );

    } else {
        encaminhar('/Login')
    }
}

export default PDF;
