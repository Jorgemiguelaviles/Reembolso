import { useUser } from '../../../userContext';

const verificarInatividade = (cookies) => {
    const { setCookie } = useUser();

    const ultimaAtividade = cookies['ultimaAtividade'];
    if (ultimaAtividade) {
        const tempoAtual = new Date().getTime();
        const tempoInativo = tempoAtual - parseInt(ultimaAtividade);
        const InatividadeTimeout = 60000 * 30;

        if (tempoInativo > InatividadeTimeout) {
            // Calcular o tempo inativo em minutos e segundos
            const minutosInativos = Math.floor(tempoInativo / 60000);
            const segundosInativos = Math.floor((tempoInativo % 60000) / 1000);

            console.log(`Tempo inativo: ${minutosInativos} minutos e ${segundosInativos} segundos`);


            return false
        } else {
            // Reatualizar o valor de ultimaAtividade para a data atual
            setCookie('ultimaAtividade', tempoAtual.toString(), { path: '/' });

            return true
        }
    }
};

export default verificarInatividade;
