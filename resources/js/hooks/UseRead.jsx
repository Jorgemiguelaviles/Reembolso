import axios from 'axios'

const chamado = async (url, data) => {
  try {
    await axios.post(url, data)
    console.log('Requisição POST concluída com sucesso.') // Opcional, para verificação no console
    // verifica a resposta se sera igual a True iu igual a False para verificar se podera passar para as proximas etapas
  } catch (error) {
    console.error('Erro ao realizar o chamado:', error)
    return false
  }
}

export default chamado
