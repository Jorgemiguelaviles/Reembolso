import { Checkbox } from '../index';
import React, { useEffect } from 'react';

const Gerenciamento = ({
    Engenharia,
    engenharia,
    ComumEngenharia,
    AdministracaoRH,
    RH,
    TI,
    TITOOLS,
    rembolso,
    comumRembolso,
    gestorRembolso,
    contabilidade,
    administradorrembolso,


    setEngenharia,
    setengenharia,
    setComumEngenharia,
    setAdministracaoRH,
    setRH,
    setTI,
    setTITOOLS,

    setrembolso,
    setcomumRembolso,
    setgestorRembolso,
    setcontabilidade,
    setadministradorrembolso,

    imageEngenharia,
    imageengenharia,
    imageComum,
    imageAdministracaoRH,
    imageRH,
    imageTI,
    imageTITOOLS,
    imagerembolso,
    imagecomumRembolso,
    imagegestorRembolso,
    imagecontabilidade,
    imageadministradorrembolso,




    setimageEngenharia,
    setimageengenharia,
    setimageComum,
    setimageAdministracaoRH,
    setimageTI,
    setimageRH,
    setimageTITOOLS,
    setimagerembolso,
    setimagecomumRembolso,
    setimagegestorRembolso,
    setimagecontabilidade,
    setimageadministradorrembolso,


    imagestatusEngenharia,
    imagestatusengenharia,
    imagestatusComum,
    imagestatusAdministracaoRH,
    imagestatusTI,
    imagestatusRH,
    imagestatusTITOOLS,
    imagestatusrembolso,
    imagestatuscomumRembolso,
    imagestatusgestorRembolso,
    imagestatuscontabilidade,
    imagestatusadministradorrembolso,



    setimagestatusEngenharia,
    setimagestatusengenharia,
    setimagestatusComum,
    setimagestatusAdministracaoRH,
    setimagestatusTI,
    setimagestatusRH,
    setimagestatusTITOOLS,
    setimagestatusrembolso,
    setimagestatuscomumRembolso,
    setimagestatusgestorRembolso,
    setimagestatuscontabilidade,
    setimagestatusadministradorrembolso,


}) => {

    const imageStatusStatesEnegnharia = [Engenharia];
    useEffect(() => {

        if (Engenharia) {
            setengenharia(true);
            setComumEngenharia(true);
        }

        if (engenharia && ComumEngenharia) {
            setEngenharia(true)
        }


    }, [Engenharia]);

    const imageStatusStatesengenharia = [engenharia];

    useEffect(() => {

        if (engenharia && ComumEngenharia) {
            setEngenharia(true)
        }


        if (!engenharia || !ComumEngenharia) {
            setEngenharia(false)
        }


    }, [engenharia]);

    const imageStatusStatescomumengenharia = [ComumEngenharia];

    useEffect(() => {

        if (engenharia && ComumEngenharia) {
            setEngenharia(true)
        }


        if (!engenharia || !ComumEngenharia) {
            setEngenharia(false)
        }


    }, [ComumEngenharia]);

    const imageStatusStatesRH = [RH];
    useEffect(() => {

        if (RH) {
            setAdministracaoRH(true);
        }

        if (AdministracaoRH) {
            setRH(true)
        }


    }, [RH]);

    const imageStatusAdministracaoRH = [AdministracaoRH];

    useEffect(() => {

        if (AdministracaoRH) {
            setRH(true)
        }


        if (!AdministracaoRH) {
            setRH(false)
        }


    }, [AdministracaoRH]);

    const imageStatusStatesTITOOLS = [TITOOLS];
    useEffect(() => {

        if (TITOOLS) {
            setTI(true);

        }

        if (TI) {
            setTITOOLS(true)
        }


    }, [TITOOLS]);

    const imageStatusStatesTI = [TI];

    useEffect(() => {

        if (TI) {
            setTITOOLS(true)
        }


        if (!TI) {
            setTITOOLS(false)
        }

    }, [TI]);

    useEffect(() => {

        if (rembolso) {
            setcomumRembolso(true);
            setgestorRembolso(true);
            setcontabilidade(true);
            setadministradorrembolso(true);
        }

        if (comumRembolso  && gestorRembolso && contabilidade && administradorrembolso) {
            setrembolso(true)
        }


    }, [rembolso]);


    const imageStatusStatescomumRembolso = [engenharia];

    useEffect(() => {

        if (comumRembolso  && gestorRembolso && contabilidade && administradorrembolso) {
            setrembolso(true)
        }


        if (!comumRembolso  || !gestorRembolso || !contabilidade || !administradorrembolso) {
            setrembolso(false)
        }


    }, [comumRembolso]);

    const imageStatusStatesgestorRembolso = [ComumEngenharia];

    useEffect(() => {

        if (comumRembolso  && gestorRembolso && contabilidade && administradorrembolso) {
            setrembolso(true)
        }


        if (!comumRembolso  || !gestorRembolso || !contabilidade || !administradorrembolso) {
            setrembolso(false)
        }


    }, [gestorRembolso]);

    const imageStatusStatescontabilidade = [engenharia];

    useEffect(() => {

         if (comumRembolso  && gestorRembolso && contabilidade && administradorrembolso) {
            setrembolso(true)
        }


        if (!comumRembolso  || !gestorRembolso || !contabilidade || !administradorrembolso) {
            setrembolso(false)
        }


    }, [contabilidade]);

    const imageStatusStatesadministradorrembolso = [ComumEngenharia];

    useEffect(() => {

         if (comumRembolso  && gestorRembolso && contabilidade && administradorrembolso) {
            setrembolso(true)
        }


        if (!comumRembolso  || !gestorRembolso || !contabilidade || !administradorrembolso) {
            setrembolso(false)
        }

    }, [administradorrembolso]);

    return (
        <>
            <div style={{ marginBottom: '1rem' }}>
                <Checkbox value={Engenharia} setvalue={setEngenharia} etiqueta={'Enegnharia'} setimage={setimageEngenharia} image={imageEngenharia} setimagestatus={setimagestatusEngenharia} interligacao={'Enegnharia'} />

                {imagestatusEngenharia && (
                    <div style={{ marginLeft: '4rem' }}>
                        <Checkbox value={engenharia} setvalue={setengenharia} etiqueta={'Comum engenharia'} interligacao={'Comumengeenharia'} />
                    </div>
                )}

                {imagestatusEngenharia && (
                    <div style={{ marginLeft: '4rem' }}>
                        <Checkbox value={ComumEngenharia} setvalue={setComumEngenharia} etiqueta={'engenharia'} interligacao={'engenharia'} />
                    </div>
                )}
            </div>

            <div style={{ marginBottom: '1rem' }}>
                <Checkbox value={RH} setvalue={setRH} etiqueta={'Ouvidoria'} setimage={setimageRH} image={imageRH} setimagestatus={setimagestatusRH} interligacao={'RH'} />

                {imagestatusRH && (
                    <div style={{ marginLeft: '4rem' }}>
                        <Checkbox value={AdministracaoRH} setvalue={setAdministracaoRH} etiqueta={'Administração RH'} interligacao={'AdministracaoRH'} />
                    </div>
                )}
            </div>


            <div style={{ marginBottom: '1rem' }}>
                <Checkbox value={TITOOLS} setvalue={setTITOOLS} etiqueta={'TITOOLS'} setimage={setimageTITOOLS} image={imageTITOOLS} setimagestatus={setimagestatusTITOOLS} interligacao={'TITOOLS'} />

                {imagestatusTITOOLS && (
                    <div style={{ marginLeft: '4rem' }}>
                        <Checkbox value={TI} setvalue={setTI} etiqueta={'TI'} interligacao={'TI'} />
                    </div>
                )}

            </div>

            <div style={{ marginBottom: '1rem' }}>
                <Checkbox value={rembolso} setvalue={setrembolso} etiqueta={'Rembolso'} setimage={setimagerembolso} image={imagerembolso} setimagestatus={setimagestatusrembolso} interligacao={'rembolso'} />

                {imagestatusrembolso && (
                    <div style={{ marginLeft: '4rem' }}>
                        <Checkbox value={comumRembolso} setvalue={setcomumRembolso} etiqueta={'Comum'} interligacao={'comumRembolso'} />
                    </div>
                )}

                {imagestatusrembolso && (
                    <div style={{ marginLeft: '4rem' }}>
                        <Checkbox value={gestorRembolso} setvalue={setgestorRembolso} etiqueta={'Gestor'} interligacao={'gestorRembolso'} />
                    </div>
                )}

                {imagestatusrembolso && (
                    <div style={{ marginLeft: '4rem' }}>
                        <Checkbox value={contabilidade} setvalue={setcontabilidade} etiqueta={'Contabilidade'} interligacao={'contabilidade'} />
                    </div>
                )}

                {imagestatusrembolso && (
                    <div style={{ marginLeft: '4rem' }}>
                        <Checkbox value={administradorrembolso} setvalue={setadministradorrembolso} etiqueta={'administração'} interligacao={'administradorrembolso'} />
                    </div>
                )}

            </div>
        </>
    );

};

export default Gerenciamento;
