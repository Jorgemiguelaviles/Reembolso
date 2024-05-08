import useEncaminhar from './functions/encaminhar/useEncaminhar'
import { useCookies } from 'react-cookie';


const useDeslogin = () => {
    const encaminharPara = useEncaminhar()
    const [cookies, setCookie] = useCookies(['user', 'nome', 'rotaDasFotos']);

    function deslogar(rota) {
        setCookie('user', undefined);
        setCookie('nome', undefined);
        setCookie('rotaDasFotos', undefined);

        encaminharPara(rota)
    }
    return { deslogar }
}

export default useDeslogin
