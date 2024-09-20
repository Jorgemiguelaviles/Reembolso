import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import uploadIcon from "../../js/assets/icons/upload.png";
import pranchetaIcon from "../../js/assets/icons/prancheta.png";
import apoioSuporteIcon from "../../js/assets/icons/apoio-suporte.png";
import gerenciamento from "../../js/assets/icons/gerenciamento.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { useUser } from '../userContext'
import useEncaminhar from '../hooks/functions/encaminhar/useEncaminhar'
import NavbarReembolso from "../Components/NavbarReembolso";
import { useCookies } from 'react-cookie';
import verificarInatividade from '../hooks/functions/verificaCookies/index';

const Mainpage = () => {
    const [cookies] = useCookies(['status', 'Nome', 'Chapa', 'Departamento', 'Gestor', 'Acesso', 'CPF']);

    const timeout = verificarInatividade(cookies)

    const status = cookies['status'];
    const nome = cookies['Nome'];
    const chapa = cookies['Chapa'];
    const departamento = cookies['Departamento'];
    const gestor = cookies['Gestor'];
    const acesso = cookies['Acesso'];
    const cpf = cookies['CPF'];



    const encaminhar = useEncaminhar();
    const [userData, setUserData] = useState({ name: "", chapa: "" });
    const [itsVersionament, setItsVersionament] = useState('Desktop');


    // Simulando a obtenção dos dados do usuário ao fazer o login
    useEffect(() => {
        setUserData({ name: nome, chapa: chapa });
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

        // Adiciona um listener de resize para ajustar o state conforme a mudança do tamanho da tela
        window.addEventListener('resize', handleResize);

        // Define o estado inicial baseado no tamanho da tela quando o componente montar
        handleResize();

        // Remove o listener de resize quando o componente desmontar
        return () => window.removeEventListener('resize', handleResize);

    }, []);


    if (timeout) {
        return (
            <>
                <NavbarReembolso titulo={'Gerenciamento de reembolso'} Nome={userData.name} Chapa={userData.chapa} />
                {itsVersionament === 'Desktop' ? (
                    <div className="container d-flex flex-row justify-content-center align-items-center mt-5 ">
                        <div className="box bg-white d-flex align-items-center " style={{ maxWidth: '20vw', borderRadius: '5vw', textAlign: 'center', margin: '20px' }}>
                            <Link to="/solicitacao">
                                <Button variant="transparent">
                                    <img src={uploadIcon} alt="Upload Icon" className="img-fluid" style={{ width: '30%', margin: '5vw auto' }} />
                                    <p style={{ fontWeight: 'bold', fontSize: '1.2vw' }}>Solicitação de Reembolso</p>
                                </Button>
                            </Link>
                        </div>

                        <div className="box bg-white d-flex align-items-center " style={{ maxWidth: '20vw', borderRadius: '5vw', textAlign: 'center', margin: '20px' }}>
                            <Link to="/consulta">
                                <Button variant="transparent">
                                    <img src={pranchetaIcon} alt="Prancheta Icon" className="img-fluid" style={{ width: '30%', margin: '5vw auto' }} />
                                    <p style={{ fontWeight: 'bold', fontSize: '1.2vw' }}>Consulta de reembolso</p>
                                </Button>
                            </Link>
                        </div>

                        <div className="box bg-white d-flex align-items-center" style={{ maxWidth: '20vw', borderRadius: '5vw', textAlign: 'center', margin: '20px' }}>
                            <a href="https://alpina.verdanadesk.com/" target="_blank" rel="noopener noreferrer">
                                <Button variant="transparent">
                                    <img src={apoioSuporteIcon} alt="Apoio e Suporte Icon" className="img-fluid" style={{ width: '30%', margin: '5vw auto' }} />
                                    <p style={{ fontWeight: 'bold', fontSize: '1.2vw' }}>Suporte</p>
                                </Button>
                            </a>
                        </div>

                        {(acesso === 'AdministracaoRembolso' || acesso === 'ContabilidadeRembolso') && (
                            <div className="box bg-white d-flex align-items-center" style={{ maxWidth: '20vw', borderRadius: '5vw', textAlign: 'center', margin: '20px' }}>
                                <Link to="/Gerenciamento">
                                    <Button variant="transparent">
                                        <img src={gerenciamento} alt="Apoio e Suporte Icon" className="img-fluid" style={{ width: '30%', margin: '5vw auto' }} />
                                        <p style={{ fontWeight: 'bold', fontSize: '1.2vw' }}>Gerenciamento de Despesas</p>
                                    </Button>
                                </Link>
                            </div>)}
                    </div>
                ) : (
                    <div className="container d-flex flex-column justify-content-center align-items-center mt-5 ">
                        <div className="box bg-white d-flex align-items-center" style={{ height: 'auto', maxWidth: '50vw', borderRadius: '5vw', textAlign: 'center', position: 'relative', margin: '20px', maxHeight: '50vw' }}>
                            <Link to="/solicitacao">
                                <Button variant="transparent">
                                    <img src={uploadIcon} alt="Upload Icon" className="img-fluid" style={{ width: '30%', height: 'auto', margin: '5vw auto', display: 'block' }} />
                                    <p style={{ fontWeight: 'bold', fontSize: '3.5vw' }}>Solicitação de Reembolso</p>
                                </Button>
                            </Link>
                        </div>

                        <div className="box bg-white d-flex align-items-center" style={{ height: 'auto', maxWidth: '50vw', borderRadius: '5vw', textAlign: 'center', position: 'relative', margin: '20px', maxHeight: '50vw' }}>
                            <Link to="/consulta">
                                <Button variant="transparent">
                                    <img src={pranchetaIcon} alt="Prancheta Icon" className="img-fluid" style={{ width: '30%', height: 'auto', margin: '5vw auto', display: 'block' }} />
                                    <p style={{ fontWeight: 'bold', fontSize: '3.5vw' }}>Consulta de reembolso</p>
                                </Button>
                            </Link>
                        </div>

                        <div className="box bg-white d-flex align-items-center" style={{ height: 'auto', maxWidth: '50vw', borderRadius: '5vw', textAlign: 'center', position: 'relative', margin: '20px', maxHeight: '50vw' }}>
                            <a href="https://alpina.verdanadesk.com/" target="_blank" rel="noopener noreferrer">
                                <Button variant="transparent">
                                    <img src={apoioSuporteIcon} alt="Apoio e Suporte Icon" className="img-fluid" style={{ width: '30%', height: 'auto', margin: '5vw auto', display: 'block' }} />
                                    <p style={{ fontWeight: 'bold', fontSize: '3.5vw' }}>Suporte</p>
                                </Button>
                            </a>
                        </div>

                        {(acesso === 'AdministracaoRembolso' || acesso === 'ContabilidadeRembolso') && (
                            <div className="box bg-white d-flex align-items-center" style={{ height: 'auto', maxWidth: '50vw', borderRadius: '5vw', textAlign: 'center', position: 'relative', margin: '20px', maxHeight: '50vw' }}>
                                <Link to="/Gerenciamento">
                                    <Button variant="transparent">
                                        <img src={gerenciamento} alt="Apoio e Suporte Icon" className="img-fluid" style={{ width: '30%', height: 'auto', margin: '5vw auto', display: 'block' }} />
                                        <p style={{ fontWeight: 'bold', fontSize: '3.5vw' }}>Gerenciamento de Despesas</p>
                                    </Button>
                                </Link>
                            </div>)}
                    </div>
                )}
                <div className="container d-flex flex-row justify-content-center align-items-center mt-5">
                    <Link to="/login">
                        <Button variant="success" className="px-4 py-2 btn" style={{ marginBottom: "1rem" }} >
                            Sair
                        </Button>
                    </Link>
                </div>
            </>
        );
    } else {
        encaminhar('/login')
    }


};

export default Mainpage;
