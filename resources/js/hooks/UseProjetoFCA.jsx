import { useState } from 'react'

const useEnviarDadosParaBackend = () => {
  const [erro, setErro] = useState(null)

  const enviarDados = async (dados) => {
    try {
      const response = await fetch('URL_DO_SEU_BACKEND', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Adicione qualquer outro cabeçalho necessário aqui
        },
        body: JSON.stringify(dados),
      })

      if (!response.ok) {
        throw new Error('Erro ao enviar dados para o backend')
      }

      const responseData = await response.json()
      console.log('Resposta do backend:', responseData)

      // Faça qualquer outra coisa após o envio bem-sucedido, se necessário
    } catch (error) {
      console.error('Erro ao enviar dados para o backend:', error.message)
      setErro(error.message)
      // Lide com o erro da maneira que preferir
    }
  }

  return { enviarDados, erro }
}

export default useEnviarDadosParaBackend
