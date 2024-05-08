import axios from 'axios';

const useCreateTable = () => {
    
    const getBackendData = async (rota) => {
        alert(rota)
        try {
            const response = await axios.get(rota, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                const products = response.data;
                return products;
            } else {
                throw new Error(`Erro ao chamar a API: ${response.status}`);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    return { getBackendData };
};

export default useCreateTable;
