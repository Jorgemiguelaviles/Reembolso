import React, { useState } from 'react';
import { Steppers3passos, ModalSelectCorpos, Modalbodyusers } from '../index'

const Usuarios = () => {
  const [visible, setVisible] = useState(false);


  return (
    <div className="d-flex flex-column align-items-center w-100">
      <div className="mb-4"> {/* Adicionei uma classe 'mb-4' para dar espaço abaixo */}
        <Steppers3passos rota1={'/Sistemas'} rota2={'/Grupo'} rota3={'/Usuarios'} ativo1={false} ativo2={false} ativo3={true} />
      </div>
      <div className="w-75">
        <ModalSelectCorpos setVisible={setVisible} visible={visible} descricao={'Criar um novo usuário'} titulo={'Cadastro de novos usuários'} corpomodal={<Modalbodyusers setVisible={setVisible} visible={visible} />} />
      </div>
    </div>
  )
}


export default Usuarios
