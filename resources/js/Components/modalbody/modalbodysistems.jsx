import { Input, Textarea } from '../index';
import React, { useState, useEffect } from 'react';
import useCreate from '../../hooks/UseCreate';

export const Modalbodysistems = ({ setVisible, visible }) => {
    const [msg, setmsg] = useState('');
    const [nomeDoSistema, setnomeDoSistema] = useState('');
    const [descricaoDoSistema, setdescricaoDoSistema] = useState('');
    const [tiposDeAcesso, setTiposDeAcesso] = useState(['']);  // Estado para armazenar os tipos de acesso
    const { validarSystems, enviarDadosParaBackend } = useCreate();

    const handleCancel = () => {
        setVisible(!visible); // Altera a visibilidade do modal
    };

    const handleSave = async () => {
        try {
            // Valide os dados do formulário
            const result = await validarSystems(nomeDoSistema);

            // Se os dados forem válidos, envie a solicitação
            if (result.sucesso) {
                const dados = {
                    nomeDoSistema: nomeDoSistema,
                    descricaoDoSistema: descricaoDoSistema,
                    tiposDeAcesso: tiposDeAcesso,
                };

                const response = await enviarDadosParaBackend('http://127.0.0.1:8000/CreateSystem', dados);

                // Se a solicitação for bem-sucedida, apresente uma mensagem de sucesso
                if (response.status === 200) {
                    setmsg('Sistema criado com sucesso!');
                }
            } else {
                // Se os dados forem inválidos, apresente uma mensagem de erro
                setmsg('Falha na validação: ' + result.mensagens.join(', '));
            }
        } catch (error) {
            // Se ocorrer um erro, apresente uma mensagem de erro
            console.error('Erro durante a validação:', error);
        }
    };

    const handleAddTipo = () => {
        // Adiciona um novo tipo à lista
        setTiposDeAcesso([...tiposDeAcesso, '']);
    };

    const handleTipoChange = (index, value) => {
        // Atualiza o valor de um tipo específico na lista
        const newTiposDeAcesso = [...tiposDeAcesso];
        newTiposDeAcesso[index] = value;
        setTiposDeAcesso(newTiposDeAcesso);
    };

    const handleRemoveTipo = (index) => {
        // Remove um tipo específico da lista
        const newTiposDeAcesso = tiposDeAcesso.filter((tipo, i) => i !== index);
        setTiposDeAcesso(newTiposDeAcesso);
    };

    return (
        <>
            <Input etiqueta={'Digite o nome do novo sistema'} desativado={false} input={nomeDoSistema} setinput={setnomeDoSistema} tipo={'text'} personalizacao={'Novo sistema'} subtitulo={'Novo sistema'} obrigatorio={true} />
            <Textarea etiqueta={'Descreva o sistema'} input={descricaoDoSistema} setInput={setdescricaoDoSistema} />

            {/* Mapeia a lista de tipos de acesso para renderizar campos de entrada */}
            {tiposDeAcesso.map((tipo, index) => (
                <div key={index}>
                    <Input
                        etiqueta={`Tipo de Acesso ${index + 1}`}
                        desativado={false}
                        input={tipo}
                        setinput={(value) => handleTipoChange(index, value)}
                        tipo={'text'}
                        personalizacao={`Novo sistema ${index + 1}`}
                        subtitulo={`Novo sistema ${index + 1}`}
                        obrigatorio={true}
                    />
                    <button type="button" className="btn btn-danger mb-2" onClick={() => handleRemoveTipo(index)}>
                        Fechar
                    </button>
                </div>
            ))}

            <button type="button" className="btn btn-primary" onClick={handleAddTipo}>
                Novo tipo
            </button>

            {msg && (
                <div className="alert alert-danger" role="alert">
                    {msg}
                </div>
            )}
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                    Cancelar
                </button>
                <button type="button" className="btn btn-success" onClick={handleSave}>
                    Salvar
                </button>
            </div>
        </>
    );
};

export default Modalbodysistems;
