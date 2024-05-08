import React from 'react';
import { Link } from 'react-router-dom'; // Importa o componente Link
import { PropTypes } from 'prop-types';
import classnames from 'classnames'; // Importa a biblioteca classnames


function Steppers2passos({ rota1, rota2, ativo1, ativo2 }) {
  return (
    <nav aria-label="...">
      <ul className="pagination pagination-lg">
        <li className={classnames( { 'active': ativo1 })}>
          <Link className="page-link" to={rota1}>Sistemas</Link>
        </li>
        <li className={classnames( { 'active': ativo2 })}>
          <Link className="page-link" to={rota2}>Setores</Link>
        </li>
      </ul>
    </nav>
  );
}

function Steppers3passos({ rota1, rota2, rota3, ativo1, ativo2, ativo3 }) {
  return (
    <nav aria-label="..." className='w-100 row'>
      <ul className="pagination d-flex justify-content-between">
        <li className={classnames( { 'active': ativo1 })} style={{ borderRadius: '10px', borderColor: '#555' }}>
          <Link
            style={{
              background: '#333',
              borderColor: '#555',
              color: 'white',
              padding: '15px',
              borderRadius: '8px 0px 0px 8px',
              textDecoration: 'none'
            }}
            to={rota1}
          >
            Sistemas
          </Link>
        </li>
        <li className={classnames( { 'active': ativo2 })} style={{ borderRadius: '10px', borderColor: '#555' }}>
          <Link
            style={{
              background: '#333',
              borderColor: '#555',
              color: 'white',
              padding: '15px',
              textDecoration: 'none'
            }}
            to={rota2}
          >
            Grupo
          </Link>
        </li>
        <li className={classnames( { 'active': ativo3 })} style={{ borderRadius: '10px', borderColor: '#555' }}>
          <Link
            style={{
              background: '#333',
              borderColor: '#555',
              color: 'white',
              padding: '15px',
              borderRadius: '0px 8px 8px 0px',
              textDecoration: 'none'
            }}
            to={rota3}
          >
            Usuários
          </Link>
        </li>
      </ul>
    </nav>
  );
}

Steppers2passos.propTypes = {
  rota1: PropTypes.string.isRequired,
  rota2: PropTypes.string.isRequired,
  ativo1: PropTypes.bool.isRequired,
  ativo2: PropTypes.bool.isRequired,
};

Steppers3passos.propTypes = {
  rota1: PropTypes.string.isRequired,
  rota2: PropTypes.string.isRequired,
  rota3: PropTypes.string.isRequired,
  ativo1: PropTypes.bool.isRequired,
  ativo2: PropTypes.bool.isRequired,
  ativo3: PropTypes.bool.isRequired,
};

export { Steppers2passos, Steppers3passos };
