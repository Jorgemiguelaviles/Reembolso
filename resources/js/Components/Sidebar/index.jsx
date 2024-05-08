import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Imagens } from '../index';
import { useUser } from '../../userContext';
import { Link } from 'react-router-dom';


export default function Sidebar(open) {
  const [sidebar, setSidebar] = useState(true);
  const [sidebar2, setSidebar2] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [projeto, setProjeto] = useState(false);
  const [torres, setTorres] = useState(false);
  const { user } = useUser();

  const toggleSidebar = () => {
    setSidebar((prevState) => !prevState);
    setSidebar2((prevState) => !prevState);
  };

  const toggleProjeto = () => {
    setProjeto((prevState) => !prevState);
  };

  const toggleTorres = () => {
    setTorres((prevState) => !prevState);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {sidebar && (
        <div
          className={`d-flex flex-column justify-content-start align-items-center ${isMobile ? 'w-50' : 'w-25'
            }`}
          style={{
            background: '#333',
            position: 'fixed',
            left: '0',
            top: '0',
            zIndex: 5,
            padding: '3rem', // Convertido de pixels para rem
            height: '100%',
          }}
        >
          <Button
            onClick={toggleSidebar}
            style={{
              backgroundColor: '#333', // Cor mais escura
              borderColor: '#333', // Cor mais escura
              color: '#fff',
              height: '4.375rem', // Convertido de pixels para rem
              width: '4.375rem', // Convertido de pixels para rem
              position: 'absolute',
              top: '0',
              left: '0',
              zIndex: -10,
            }}
          >
            <Imagens src={retorno} altura="2rem" />
          </Button>
          <Imagens src={Logo} altura={'8rem'} largura={'8rem'} />
          <div style={{ padding: '2rem 0' }}>
            <p style={{ color: 'white' }}>Nome: (Nome dinâmico)</p>
            <p style={{ color: 'white' }}>Tipo de usuário: (Tipo de usuário dinâmico)</p>
          </div>
          <div className="d-flex flex-column align-items-center justify-content-center" style={{ overflowY: 'auto', marginTop: '1rem' }}>
            <h5 style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.2rem', margin: '1rem 0' }}>Funções</h5>
            <Button
              onClick={toggleProjeto}
              style={{
                backgroundColor: '#222', // Cor mais escura
                borderColor: '#222', // Cor mais escura
                color: '#fff',
                margin: '0.3125rem 0',
                padding: '2rem ',
              }}
            >
              Controle de acesso
            </Button>
            {projeto && (
              <>
                <Link to="/Sistemas" className="nav-link" style={{ color: 'white', margin: '0.125rem 0' }}>
                  Interno
                </Link>
              </>
            )}
          </div>
        </div>
      )}
      {sidebar2 && (
        <div
          style={{
            background: '#333', // Cor mais escura
            width: '4.375rem', // Convertido de pixels para rem
            display: 'flex',
            justifyContent: 'center',
            height: '4.375rem', // Convertido de pixels para rem
            zIndex: 10,
            position: 'fixed',
            left: '0',
            top: '0',
          }}
        >
          <Button
            onClick={toggleSidebar}
            style={{
              backgroundColor: '#333', // Cor mais escura
              borderColor: '#333', // Cor mais escura
              color: '#fff',
              height: '5rem', // Convertido de pixels para rem
              width: '5rem', // Convertido de pixels para rem
            }}
          >
            <Imagens src={Image} altura="2rem" />
          </Button>
        </div>
      )}
    </>
  );
}
