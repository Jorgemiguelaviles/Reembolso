export const validarSystems = async (nome) => {
    const mensagens = {
        nome: 'O nome precisa ser preenchido',
        // Adicione outras mensagens conforme necessário
    };

    const listmsg = [];

    if (!nome) {
        listmsg.push(mensagens.nome);
    }

    // Retornar ou lidar com as mensagens de erro conforme necessário
    return {
        sucesso: listmsg.length === 0,
        mensagens: listmsg,
    };
};

export default validarSystems;
