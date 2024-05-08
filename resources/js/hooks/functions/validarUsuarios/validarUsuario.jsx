// validarUsuario.js

const validarUsers = async (
    nome,
    chapa,
    horarioDoAlmoco,
    grupo,
    usuario,
    senha,
    gestorResponsavel,
    CPF,
) => {
    const mensagens = {
        nome: 'O nome precisa ser preenchido',
        chapa: 'A chapa precisa ser preenchida e pode conter apenas números',
        horarioAlmoco: 'O horário de almoço precisa ser preenchido',
        grupo: 'O grupo precisa ser selecionado',
        usuarioEsenha: 'Se o usuário ser criado ele precisa de uma senha',
        gestorResponsavel: 'O gestor responsavel precisa ser prenchido',
        CPF: 'O CPF precisa ser prenchido',
    };
    const listmsg = [];
    if (!nome) {
        listmsg.push(mensagens.nome);
    }
    if (!chapa) {
        listmsg.push(mensagens.chapa);
    }
    if (!horarioDoAlmoco) {
        listmsg.push(mensagens.horarioAlmoco);
    }
    if (!grupo) {
        listmsg.push(mensagens.grupo);
    }
    if (usuario && !senha) {
        listmsg.push(mensagens.usuarioEsenha);
    }
    if (!gestorResponsavel) {
        listmsg.push(mensagens.gestorResponsavel);
    }
    if (!CPF) {
        listmsg.push(mensagens.CPF);
    }
    // Retornar um objeto consistente
    return {
        sucesso: listmsg.length === 0,
        mensagens: listmsg,
    };
};

export default validarUsers;
