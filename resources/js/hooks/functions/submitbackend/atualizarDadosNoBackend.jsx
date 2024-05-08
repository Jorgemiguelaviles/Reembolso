import axios from 'axios';


const obterCSRFToken = async () => {
    try {
        const response = await axios.get('/csrf-token');
        return response.data.token;
    } catch (error) {
        console.error('Erro ao obter o token CSRF:', error);
        throw error;
    }
};


const atualizarDadosNoBackend = async (rotaBack, dados) => {
    try {

        const csrfToken = await obterCSRFToken();


        console.log()
        const response = await axios.post(rotaBack, dados, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken,
            },
        });
        return response.data; // Retorna os dados do backend
    } catch (error) {
        console.error('Erro durante a solicitação:', error);
        throw error;
    }
};

export default atualizarDadosNoBackend;
