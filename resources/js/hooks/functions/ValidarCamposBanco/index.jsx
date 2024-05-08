const validarCamposIndividuais = (objetivo, departamento, cpf, gestor, centroCusto, periodo, ate, data, despesa, anexo, descricao) => {
    const campos = [
      { nome: "Objetivo", valor: objetivo },
      { nome: "Departamento", valor: departamento },
      { nome: "CPF", valor: cpf },
      { nome: "Gestor", valor: gestor },
      { nome: "Centro de Custo", valor: centroCusto },
      { nome: "periodo", valor: periodo },
      { nome: "ate", valor: ate },
      { nome: "Data", valor: data },
      { nome: "Despesa", valor: despesa },
      { nome: "Anexo", valor: anexo },
      { nome: "Descrição", valor: descricao },
    ];

    const mensagensErro = [];
    campos.forEach(campo => {
      if (!campo.valor) {
        mensagensErro.push(`O campo ${campo.nome} é obrigatório.`);
      }
    });

    return mensagensErro;
};

// Uso da função combinada
export const validarFormulario = (objetivo, obra, departamento, cpf, gestor, centroCusto,data, periodo,ate, despesa, anexo, descricao) => {
    const mensagensErro = validarCamposIndividuais(
      objetivo,
      obra,
      departamento,
      cpf,
      gestor,
      centroCusto,
      periodo,
      ate,
      data,
      despesa,
      anexo,
      descricao
    );

    const isValid = mensagensErro.length === 0;

    return { isValid, mensagensErro };
};
