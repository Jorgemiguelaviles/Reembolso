import validarUsers from './functions/validarUsuarios/validarUsuario'
import validarGroup from './functions/validarGrupo/validarGrupo'
import validarSystems from './functions/validarSistemas/validarSistemas'
import enviarDadosParaBackend from './functions/submitbackend/submitbackend'

const useCreate = () => {

  return { validarUsers, validarGroup, validarSystems, enviarDadosParaBackend }
}

export default useCreate
