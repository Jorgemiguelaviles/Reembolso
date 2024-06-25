import React from 'react';
import Loginpage from '../Layouts/Login';

const Login = () => {
    // Obtém a URL atual
    const urlAtual = window.location.href;

    // Verifica se a URL atual é a URL desejada
    if (urlAtual === 'http://162.240.102.146:5170/login') {
        // Redireciona para a nova URL
        window.location.href = "http://alpinacloud.com.br:5170/login";
    } else {
	 // Renderiza a página de login normalmente
    return (
        <>
            <Loginpage />
        </>
    );
}
}

export default Login;
