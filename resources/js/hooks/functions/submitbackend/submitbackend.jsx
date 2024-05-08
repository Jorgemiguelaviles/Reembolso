import axios from 'axios';

// Função para obter o token CSRF
const obterCSRFToken = async () => {
    try {
        const response = await axios.get('/csrf-token');
        return response.data.token;
    } catch (error) {
        console.error('Erro ao obter o token CSRF:', error);
        throw error;
    }
};

const enviarDadosParaBackend = async (rotaBack, dados, domain, file = null) => {
    console.log('teste');
    try {
        // Obtém o token CSRF
        const csrfToken = await obterCSRFToken();

        // Configuração da solicitação Axios
        const config = {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken, // Inclui o token CSRF no cabeçalho da solicitação
            },
        };

        // Faz a solicitação POST para a rotaBack
        const response = await axios.post(rotaBack, dados, config);

        return response.data;
    } catch (error) {
        console.error('Erro durante a solicitação:', error);
        throw error;
    }
};

export default enviarDadosParaBackend;
