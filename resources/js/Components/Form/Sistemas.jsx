import React, { useState } from 'react';
import { Steppers3passos, ModalSelectCorpos, Modalbodysistems } from '../index'

const Sistemas = () => {
  const [visible, setVisible] = useState(false);


  return (
    <div className="d-flex flex-column align-items-center w-100">
      <div className="mb-4"> {/* Adicionei uma classe 'mb-4' para dar espaço abaixo */}
        <Steppers3passos rota1={'/Sistemas'} rota2={'/Grupo'} rota3={'/Usuarios'} ativo1={true} ativo2={false} ativo3={false} />
      </div>
      <div className="w-75">
        <ModalSelectCorpos setVisible={setVisible} visible={visible} descricao={'Criar um novo sistema'} titulo={'Cadastro de novos sistemas'} corpomodal={<Modalbodysistems setVisible={setVisible} visible={visible} />} />
      </div>
    </div>
  )
}


export default Sistemas
