import React from 'react';
import Loginpage from '../Layouts/Login';

const Login = () => {
    // Obt�m a URL atual
    const urlAtual = window.location.href;

    // Verifica se a URL atual � a URL desejada
    if (urlAtual === 'http://162.240.102.146:5170/login') {
        // Redireciona para a nova URL
        window.location.href = "http://alpinacloud.com.br:5170/login";
    } else {
	 // Renderiza a p�gina de login normalmente
    return (
        <>
            <Loginpage />
        </>
    );
}
}

export default Login;
