import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useCookies } from 'react-cookie';

// Crie o contexto
const UserContext = createContext();

// Crie um componente provedor para envolver sua aplicação
export const UserProvider = ({ children }) => {
    const [cookies, setCookie] = useCookies(['user']);
    const [domain, setDomain] = useState('http://alpinacloud.com.br:5170/');
    const [filtros, setFiltros] = useState({
        filtroNumero: "",
        filtroAbertoEm: "",
        filtroAte: "",
        filtroNumero: "",
        filtroCentroDeCusto: "",
        filtroStatus: ""
    });

    // Verificar se cookies é uma array antes de desestruturar
    const user = Array.isArray(cookies) ? cookies[0] : null;

    return (
        <UserContext.Provider
            value={{
                setCookie,
                domain,
                filtros,
                setFiltros,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

// Crie um hook para acessar o contexto em componentes
export const useUser = () => useContext(UserContext);

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
