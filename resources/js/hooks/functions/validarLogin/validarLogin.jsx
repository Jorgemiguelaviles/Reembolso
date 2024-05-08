export const validarLogin = async (dados) => {
    const mensagens = {
        usuario: 'O usuário precisa ser preenchido',
        senha: 'A senha precisa ser preenchida',
    };

    const listmsg = [];

    if (!dados.email) {
        listmsg.push(mensagens.usuario);
    }
    if (!dados.password) {
        listmsg.push(mensagens.senha);
    }

    // Retornar ou lidar com as mensagens de erro conforme necessário
    return {
        sucesso: listmsg.length === 0,
        message: listmsg
    };
};

export default validarLogin;
