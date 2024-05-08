import React, { useState } from 'react';
import { Input, Dropdown, ModalWebCam, Gerenciamento } from '../index';
import useCreate from '../../hooks/UseCreate'

const Modalbodyusers = ({ setVisible, visible }) => {
    const [msg, setmsg] = useState('');

    const [nome, setnome] = useState('');
    const [chapa, setchapa] = useState('');
    const [horarioDoAlmoco, sethorarioDoAlmoco] = useState('');
    const [usuario, setusuario] = useState('');
    const [senha, setsenha] = useState('');
    const [gestorResponsavel, setgestorResponsavel] = useState('');
    const [CPF, setCPF] = useState('');



    const [Engenharia, setEngenharia] = useState(false);
    const [engenharia, setengenharia] = useState(false);
    const [ComumEngenharia, setComumEngenharia] = useState(false);
    const [RH, setRH] = useState(false);
    const [AdministracaoRH, setAdministracaoRH] = useState(false);
    const [TITOOLS, setTITOOLS] = useState(false);
    const [TI, setTI] = useState(false);
    const [rembolso, setrembolso] = useState(false);
    const [comumRembolso, setcomumRembolso] = useState(false);
    const [gestorRembolso, setgestorRembolso] = useState(false);
    const [contabilidade, setcontabilidade] = useState(false);
    const [administradorrembolso, setadministradorrembolso] = useState(false);

    const [imageEngenharia, setimageEngenharia] = useState(seta_baixo);
    const [imageengenharia, setimageengenharia] = useState(seta_baixo);
    const [imageComum, setimageComum] = useState(seta_baixo);
    const [imageAdministracaoRH, setimageAdministracaoRH] = useState(seta_baixo);
    const [imageRH, setimageRH] = useState(seta_baixo);
    const [imageTITOOLS, setimageTITOOLS] = useState(seta_baixo);
    const [imageTI, setimageTI] = useState(seta_baixo);
    const [imagerembolso, setimagerembolso] = useState(seta_baixo);
    const [imagecomumRembolso, setimagecomumRembolso] = useState(seta_baixo);
    const [imagegestorRembolso, setimagegestorRembolso] = useState(seta_baixo);
    const [imagecontabilidade, setimagecontabilidade] = useState(seta_baixo);
    const [imageadministradorrembolso, setimageadministradorrembolso] = useState(seta_baixo);

    const [imagestatusEngenharia, setimagestatusEngenharia] = useState(false);
    const [imagestatusengenharia, setimagestatusengenharia] = useState(false);
    const [imagestatusComum, setimagestatusComum] = useState(false);
    const [imagestatusRH, setimagestatusRH] = useState(false);
    const [imagestatusAdministracaoRH, setimagestatusAdministracaoRH] = useState(false);
    const [imagestatusTITOOLS, setimagestatusTITOOLS] = useState(false);
    const [imagestatusTI, setimagestatusTI] = useState(false);
    const [imagestatusrembolso, setimagestatusrembolso] = useState(false);
    const [imagestatuscomumRembolso, setimagestatuscomumRembolso] = useState(false);
    const [imagestatusgestorRembolso, setimagestatusgestorRembolso] = useState(false);
    const [imagestatuscontabilidade, setimagestatuscontabilidade] = useState(false);
    const [imagestatusadministradorrembolso, setimagestatusadministradorrembolso] = useState(false);



    const [grupo, setGrupo] = useState('');
    const [photo, setPhoto] = useState(null);

    const valoresExemplo = ['Opção 1', 'Opção 2', 'Opção 3', 'Opção 4', 'Opção 5'];
    const Gestores = ['Eduardo', 'Opção 2', 'Opção 3', 'Opção 4', 'Opção 5'];


    const { validarUsers, enviarDadosParaBackend } = useCreate();

    const handleCancel = () => {
        setVisible(!visible); // Altera a visibilidade do modal
    };

    const handleSave = async () => {
        try {
            const result = await validarUsers(
                nome,
                chapa,
                horarioDoAlmoco,
                grupo,
                usuario,
                senha,
                gestorResponsavel,
                CPF,
            );

            if (result.sucesso) {
                let dados = {
                    nome: nome,
                    chapa: chapa,
                    horarioDoAlmoco: horarioDoAlmoco,
                    usuario: usuario,
                    senha: senha,
                    gestorResponsavel: gestorResponsavel,
                    CPF: CPF,
                    Departamento: Departamento,
                    centroDeCustos: centroDeCustos,



                    Engenharia: Engenharia,
                    engenharia: engenharia,
                    ComumEngenharia: ComumEngenharia,
                    RH: RH,
                    AdministracaoRH: AdministracaoRH,
                    TITOOLS: TITOOLS,
                    TI: TI,
                    imageEngenharia: imageEngenharia,
                    imageengenharia: imageengenharia,
                    imageComum: imageComum,
                    imageAdministracaoRH: imageAdministracaoRH,
                    imageRH: imageRH,
                    imageTITOOLS: imageTITOOLS,
                    imageTI: imageTI,
                    imagestatusEngenharia: imagestatusEngenharia,
                    imagestatusengenharia: imagestatusengenharia,
                    imagestatusComum: imagestatusComum,
                    imagestatusRH: imagestatusRH,
                    imagestatusAdministracaoRH: imagestatusAdministracaoRH,
                    imagestatusTITOOLS: imagestatusTITOOLS,
                    imagestatusTI: imagestatusTI,
                    grupo: grupo,
                    photo: photo,
                }
                let rota = 'http://127.0.0.1:8000/CreateUsers'
                // Lógica para tratamento de sucesso
                enviarDadosParaBackend(rota, dados)
            } else {
                // Lógica para tratar as mensagens de erro
                setmsg('Falha na validação: ' + result.mensagens.join(', '));
            }
        } catch (error) {
            // Lógica para tratar erros durante a validação
            console.error('Erro durante a validação:', error);
        }
    };





    return (
        <div style={{ overflowY: 'auto', maxHeight: '80vh', padding: '1rem' }}>
            <div style={{ background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ModalWebCam
                    descricao={
                        photo ? (
                            <img
                                src={URL.createObjectURL(photo)}
                                style={{ marginBottom: '2rem', borderRadius: '50%', border: '2px solid black', height: '5rem', width: '5rem', cursor: 'pointer' }}
                                className="rounded mx-auto d-block"
                                alt="foto capturada"
                            />
                        ) : (
                            <img
                                src={user}
                                style={{ marginBottom: '2rem', borderRadius: '50%', border: '2px solid black', height: '5rem', width: '5rem', cursor: 'pointer' }}
                                className="rounded mx-auto d-block"
                                alt="ícone original"
                            />
                        )
                    }
                    titulo={'retire a sua foto'}
                    setPhoto={(capturedPhoto) => setPhoto(capturedPhoto)}
                />
            </div>

            <Input etiqueta={'Digite o nome do usuário'} desativado={false} input={nome} setinput={setnome} tipo={'text'} personalizacao={'Nome'} subtitulo={'Nome '} obrigatorio={true} />
            <Input etiqueta={'Digite a chapa do usuário'} desativado={false} input={chapa} setinput={setchapa} tipo={'number'} personalizacao={'Chapa'} subtitulo={'Chapa '} obrigatorio={true} />
            <Input etiqueta={'Digite o horário de almoço'} desativado={false} input={horarioDoAlmoco} setinput={sethorarioDoAlmoco} tipo={'time'} personalizacao={'Horário'} subtitulo={'Horário do almoço '} obrigatorio={true} />

            <Dropdown selectedOption={grupo} setSelectedOption={setGrupo} optionsData={valoresExemplo} etiqueta={'Selecione o grupo'} desativado={false} personalizacao={'Grupo'} subtitulo={'Grupo '} obrigatorio={true} />
            <Dropdown selectedOption={gestorResponsavel} setSelectedOption={setgestorResponsavel} optionsData={Gestores} etiqueta={'Selecione o gestor'} desativado={false} personalizacao={'Gestor'} subtitulo={'Gestor '} obrigatorio={true} />

            <Input etiqueta={'Digite o CPF'} desativado={false} input={CPF} setinput={setCPF} tipo={'text'} personalizacao={'CPF'} subtitulo={'CPF '} obrigatorio={true} />
            <Input etiqueta={'Digite o usuário para acessar os sistemas'} desativado={false} input={usuario} setinput={setusuario} tipo={'text'} personalizacao={'Usuário'} subtitulo={'Usuário'} />
            <Input etiqueta={'Digite a senha para acessar os sistemas'} desativado={false} input={senha} setinput={setsenha} tipo={'text'} personalizacao={'Senha'} subtitulo={'Senha'} />

            <Gerenciamento
                Engenharia={Engenharia}
                engenharia={engenharia}
                ComumEngenharia={ComumEngenharia}
                RH={RH}
                AdministracaoRH={AdministracaoRH}
                TITOOLS={TITOOLS}
                TI={TI}
                rembolso={rembolso}
                comumRembolso={comumRembolso}
                gestorRembolso={gestorRembolso}
                contabilidade={contabilidade}
                administradorrembolso={administradorrembolso}


                setEngenharia={setEngenharia}
                setengenharia={setengenharia}
                setComumEngenharia={setComumEngenharia}
                setRH={setRH}
                setAdministracaoRH={setAdministracaoRH}
                setTI={setTI}
                setTITOOLS={setTITOOLS}

                setrembolso={setrembolso}
                setcomumRembolso={setcomumRembolso}
                setgestorRembolso={setgestorRembolso}
                setcontabilidade={setcontabilidade}
                setadministradorrembolso={setadministradorrembolso}


                imageEngenharia={imageEngenharia}
                imageengenharia={imageengenharia}
                imageComum={imageComum}
                imageRH={imageRH}
                imageAdministracaoRH={imageAdministracaoRH}
                imageTI={imageTI}
                imageTITOOLS={imageTITOOLS}


                imagerembolso={imagerembolso}
                imagecomumRembolso={imagecomumRembolso}
                imagegestorRembolso={imagegestorRembolso}
                imagecontabilidade={imagecontabilidade}
                imageadministradorrembolso={imageadministradorrembolso}


                setimageEngenharia={setimageEngenharia}
                setimageengenharia={setimageengenharia}
                setimageComum={setimageComum}
                setimageAdministracaoRH={setimageAdministracaoRH}
                setimageRH={setimageRH}
                setimageTI={setimageTI}
                setimageTITOOLS={setimageTITOOLS}

                setimagerembolso={setimagerembolso}
                setimagecomumRembolso={setimagecomumRembolso}
                setimagegestorRembolso={setimagegestorRembolso}
                setimagecontabilidade={setimagecontabilidade}
                setimageadministradorrembolso={setimageadministradorrembolso}





                imagestatusEngenharia={imagestatusEngenharia}
                imagestatusengenharia={imagestatusengenharia}
                imagestatusComum={imagestatusComum}
                imagestatusAdministracaoRH={imagestatusAdministracaoRH}
                imagestatusRH={imagestatusRH}
                imagestatusTI={imagestatusTI}
                imagestatusTITOOLS={imagestatusTITOOLS}

                imagestatusrembolso={imagestatusrembolso}
                imagestatuscomumRembolso={imagestatuscomumRembolso}
                imagestatusgestorRembolso={imagestatusgestorRembolso}
                imagestatuscontabilidade={imagestatuscontabilidade}
                imagestatusadministradorrembolso={imagestatusadministradorrembolso}




                setimagestatusEngenharia={setimagestatusEngenharia}
                setimagestatusengenharia={setimagestatusengenharia}
                setimagestatusComum={setimagestatusComum}
                setimagestatusAdministracaoRH={setimagestatusAdministracaoRH}
                setimagestatusTI={setimagestatusTI}
                setimagestatusTITOOLS={setimagestatusTITOOLS}
                setimagestatusRH={setimagestatusRH}

                setimagestatusrembolso={setimagestatusrembolso}
                setimagestatuscomumRembolso={setimagestatuscomumRembolso}
                setimagestatusgestorRembolso={setimagestatusgestorRembolso}
                setimagestatuscontabilidade={setimagestatuscontabilidade}
                setimagestatusadministradorrembolso={setimagestatusadministradorrembolso}


            />
            {msg && (
                <div className="alert alert-danger" role="alert">
                    {msg}
                </div>
            )}

            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
                <button type="button" className="btn btn-primary" onClick={handleSave}>Salvar</button>
            </div>
        </div>

    );
};

export default Modalbodyusers;
