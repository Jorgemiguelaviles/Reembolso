import React, { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios" // Importe a biblioteca Axios
import icons from "../../js/assets/icons/grupoalpina_logo.jpg"
import "bootstrap/dist/css/bootstrap.min.css"
import { useUser } from '../userContext'
import useEncaminhar from '../hooks/functions/encaminhar/useEncaminhar'
import enviarDadosParaBackend from '../hooks/functions/submitbackend/submitbackend'
import ReCAPTCHA from "react-google-recaptcha"
import { Submit } from '../Components/index'

const Loginpage = ({ imageMaxWidth = "200px", imageMaxHeight = "160px" }) => {
    const [Usuario, setUsuario] = useState("")
    const [Senha, setSenha] = useState("")
    const [msg, setmsg] = useState("")
    const [captcha, setCaptcha] = useState(false)

    const {
        setCookie,
        setNome,
        setChapa,
        setDepartamento,
        setGestor,
        setAcesso,
        setCPF,
        domain
    } = useUser()

    const encaminhar = useEncaminhar()

    const onChangeCaptcha = (value) => {
        setCaptcha(value)
    }

    const handleUsuarioChange = (e) => {
        setUsuario(e.target.value)
    }

    const handleSenhaChange = (e) => {
        setSenha(e.target.value)
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        setmsg("")


        // Verifica se os campos estão preenchidos
        if (!Usuario || !Senha) {
            setmsg("Por favor, preencha o usuário e senha.")
            return
        }

        // Verifica se o captcha foi preenchido
        /*if (!captcha) {
            setmsg("Por favor, preencha o captcha")
            return
        }*/

        // Se todos os campos estiverem preenchidos, continue com o envio
        try {
            const response = await enviarDadosParaBackend(`${domain}datalogin`, { Usuario, Senha, captcha })



            if (response && response.data && response.data.length > 1 && response.data[1]['status']) {
                var list_id_setor_not_gestor = []
                var list_id_setor_gestor = []
                response.data[1].aprovadores.forEach(element => {
                    if (element.isAprovador == 0) {
                        list_id_setor_not_gestor.push(element.setor_id)
                    } else {
                        list_id_setor_gestor.push(element.setor_id)
                    }
                })
                setCookie('token', response.data.token, { path: '/' })
                setCookie('list_id_setor_not_gestor', list_id_setor_not_gestor, { path: '/' })
                setCookie('list_id_setor_gestor', list_id_setor_gestor, { path: '/' })
                setCookie('myId', response.data[1]['id'], { path: '/' })
                setCookie('isGestor', response.data[1]['GestorCheck'], { path: '/' })
                setCookie('status', response.data[1]['status'], { path: '/' })
                setCookie('Nome', response.data[1].Nome, { path: '/' })
                setCookie('Chapa', response.data[1].Chapa, { path: '/' })
                setCookie('Departamento', response.data[1].Departamento, { path: '/' })
                setCookie('Gestor', response.data[1].Gestor, { path: '/' })
                setCookie('Acesso', response.data[0], { path: '/' })
                setCookie('CPF', response.data[1].CPF, { path: '/' })
                setCookie('ultimaAtividade', new Date().getTime(), { path: '/' })

                console.log('Acesso', response.data[0])
		encaminhar('/main')
            } else {
                encaminhar('/ErroAoLogar')
            }
        } catch (error) {
            console.error("Erro ao fazer login:", error)
            setmsg("Ocorreu um erro ao tentar fazer login.")
        }
    }

    return (
        <>
            <nav className="navbar" style={{ background: "#f6f5f5", marginBottom: 0, paddingBottom: 0, display: 'flex', flexDirection: 'column' }}>
                <div className="container d-flex justify-content-center w-100">
                    <a className="navbar-brand" href="#">
                        <img src={icons} alt="Logo" className="img-fluid" style={{ maxWidth: imageMaxWidth, maxHeight: imageMaxHeight, alignSelf: 'flex-start', borderRadius: 10 }} />
                    </a>
                </div>
            </nav>
            <div className="container-fluid" style={{ backgroundColor: "#DeDeDe" }}>
                <div className="container text-center h-100">
                    <div className="row justify-content-center mt-md-5">
                        <div className="col-md-6 col-sm-8">
                            <div className="row" style={{ marginTop: '5rem' }}>
                                <p className="text-center mb-md-5" style={{ fontSize: '2rem' }}>
                                    Plataforma de
                                    <br />
                                    Reembolso
                                </p>
                                <p className="text-center mb-2"></p>
                            </div>
                            <form onSubmit={handleFormSubmit}> {/* Corrigido para handleFormSubmit */}
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Usuário</span>
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="floatingInputGroup1" placeholder="Username" value={Usuario} onChange={handleUsuarioChange} />
                                        <label htmlFor="floatingInputGroup1">Digite seu usuário de acesso</label>
                                    </div>
                                </div>
                                <div className="input-group mb-2">
                                    <span className="input-group-text">Senha</span>
                                    <div className="form-floating">
                                        <input type="password" className="form-control" id="floatingInputGroup2" placeholder="Password" value={Senha} onChange={handleSenhaChange} />
                                        <label htmlFor="floatingInputGroup2">Digite a sua senha</label>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <ReCAPTCHA
                                        sitekey="6LfyLccpAAAAANyipAsBoNUzKonrlySyj0JNVcD0"
                                        onChange={onChangeCaptcha}
                                    />
                                </div>
                                <div className='row mt-0 text-start'>
                                    <Link to="https://alpina.verdanadesk.com/" className="btn">
                                        Esqueceu sua senha?
                                    </Link>
                                </div>
                                <Submit descricao={'Acessar'} funcao={handleFormSubmit} />
                                {msg && (
                                    <p className="text-danger">{msg}</p>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Loginpage
