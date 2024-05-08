import React, { useState } from 'react';
import Usuarios from '../Usuarios';
import Login from '../Loginpage';
import Main from '../Main';
import Solicitacao from '@/Layouts/Solicitacao';
import Consulta from '@/Layouts/Consulta';
import Acompanhamento from '@/Layouts/Acompanhamento';
import SolicitacaoEditPages from '@/Layouts/SolicitacaoEdit';
import Portal from '@/Layouts/Portal';
import PDF from '@/Layouts/PDF';
import ErroAoLogar from '@/Layouts/ErroAoLogar';

const useRoutes = () => {
    const [routes, setRoutes] = useState([
        {
            path: '/login',
            element: <Login />,
        },
        {
            path: '/PDF',
            element: <PDF />,
        },
        {
            path: '/main',
            element: <Main />,
        },
        {
            path: '/solicitacao',
            element: <Solicitacao />,
        },
        {
            path: '/solicitacaoEdit',
            element: <SolicitacaoEditPages />,
        },
        {
            path: '/consulta',
            element: <Consulta />,
        },
        {
            path: '/Usuarios',
            element: <Usuarios />,
        },
        {
            path: '/acompanhamento',
            element: <Acompanhamento />,
        },

        {
            path: '/gerenciamento',
            element: <Portal />,
        },

        {
            path: '/ErroAoLogar',
            element: <ErroAoLogar />,
        },


        // Adicione mais rotas conforme necessário
    ]);

    return { routes, setRoutes };
};

export default useRoutes;
