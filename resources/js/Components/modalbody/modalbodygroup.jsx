import { Input, Textarea, Gerenciamento } from '../index';
import React, { useState } from 'react';


export const Modalbodygroup = ({ setVisible, visible }) => {



    const [msg, setmsg] = useState('');
    const [nomeDoGrupo, setnomeDoGrupo] = useState('');
    const [descricaoDoGrupo, setdescricaoDoGrupo] = useState('');


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

    const { validarGroup, enviarDadosParaBackend  } = useCreate();
    const handleSave = async () => {
        try {
            const result = await validarGroup(nomeDoGrupo)

            if (result.sucesso) {
                let dados={
                    nomeDoGrupo:nomeDoGrupo,
                    descricaoDoGrupo:descricaoDoGrupo,
                    Engenharia:Engenharia,
                    engenharia:engenharia,
                    ComumEngenharia:ComumEngenharia,
                    RH:RH,
                    AdministracaoRH:AdministracaoRH,
                    TITOOLS:TITOOLS,
                    TI:TI,
                    imageEngenharia:imageEngenharia,
                    imageengenharia:imageengenharia,
                    imageComum:imageComum,
                    imageAdministracaoRH:imageAdministracaoRH,
                    imageRH:imageRH,
                    imageTITOOLS:imageTITOOLS,
                    imageTI:imageTI,
                    imagestatusEngenharia:imagestatusEngenharia,
                    imagestatusengenharia:imagestatusengenharia,
                    imagestatusComum:imagestatusComum,
                    imagestatusRH:imagestatusRH,
                    imagestatusAdministracaoRH:imagestatusAdministracaoRH,
                    imagestatusTITOOLS:imagestatusTITOOLS,
                    imagestatusTI:imagestatusTI,
                }
                let rota='http://127.0.0.1:8000/CreateGroup'
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


    const handleCancel = () => {
        setVisible(!visible); // Altera a visibilidade do modal
    };


    return (
        <>
            <div style={{ overflowY: 'auto', maxHeight: '80vh', padding: '1rem' }}>
                <Input etiqueta={'Digite o nome do novo grupo'} desativado={false} input={nomeDoGrupo} setinput={setnomeDoGrupo} tipo={'text'} personalizacao={'Novo grupo'} subtitulo={'Novo grupo'} obrigatorio={true} />
                <Textarea etiqueta={'Descreva o grupo'} input={descricaoDoGrupo} setInput={setdescricaoDoGrupo} />
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
            </div>

            {msg && (
                <div className="alert alert-danger" role="alert">
                    {msg}
                </div>
            )}

            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
                <button type="button" className="btn btn-primary" onClick={handleSave}>Salvar</button>
            </div>
        </>
    );
};

export default Modalbodygroup;
