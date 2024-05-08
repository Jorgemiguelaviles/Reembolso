import React, { useState } from 'react';
import { Steppers3passos, ModalSelectCorpos, Modalbodygroup } from '../index';

const Setores = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="d-flex flex-column align-items-center w-100">
      <div className="mb-4">
        <Steppers3passos rota1={'/Sistemas'} rota2={'/Grupo'} rota3={'/Usuarios'} ativo1={false} ativo2={true} ativo3={false} />
      </div>
      <div className="w-75">
        <ModalSelectCorpos setVisible={setVisible} visible={visible} descricao={'Criar um novo grupo'} titulo={'Cadastro de novos grupos'} corpomodal={<Modalbodygroup setVisible={setVisible} visible={visible} />} />
      </div>
    </div>
  );
}

export default Setores;
