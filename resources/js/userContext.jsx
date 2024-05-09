import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useCookies } from 'react-cookie';

// Crie o contexto
const UserContext = createContext();

// Crie um componente provedor para envolver sua aplicação
export const UserProvider = ({ children }) => {
    const [cookies, setCookie] = useCookies(['user']);
    const [domain, setDomain] = useState('http://162.240.102.146:5170/');


    // Verificar se cookies é uma array antes de desestruturar
    const user = Array.isArray(cookies) ? cookies[0] : null;

    return (
        <UserContext.Provider
            value={{
                setCookie,
                domain,
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
