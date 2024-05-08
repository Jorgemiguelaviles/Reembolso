import submitbackend from './functions/submitbackend/submitbackend';
import validarLogin from './functions/validarLogin/validarLogin';
import { useUser } from '../userContext';

const useLogin = () => {
    const { setUser } = useUser();

    const login = async (rota1, dados) => {
        const resultadoValidacao = await validarLogin(dados);


        if (resultadoValidacao.sucesso) {

            const respostaBackend = await submitbackend(rota1, dados);
            console.log('respostaBackend',respostaBackend)
            if (respostaBackend.data) {
                if (respostaBackend.data.TI !== undefined && respostaBackend.data.TI) {
                    return respostaBackend;
                } else if (respostaBackend.data.status !== undefined && respostaBackend.data.status) {
                    return {
                        successo: false,
                        message: 'Usuário ou senha incorretos',
                    };
                }
            }

            return {
                successo: false,
                message: 'Usuário ou senha incorretos',
            };




        } else {
            // Lógica de falha no backend aqui
            return {
                successo: resultadoValidacao.sucesso,
                message: resultadoValidacao.message,
            };
        }
    };

    // Lógica de falha na validação aqui
    return { login };
};

export default useLogin;
