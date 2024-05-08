import React from 'react'
import { Link } from 'react-router-dom'
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody } from '@coreui/react'
import PropTypes from 'prop-types'
import Editar from '../../assets/images/editar.png'
import Visualizar from '../../assets/images/lupa.png'
import Imagens from '../Imagens'

function TableFilter({ Dados, Name }) {
  const TorresComponent = () => {
    return (
      <>
        {Dados.data.map((torre, index) => (
          <CTableRow
            key={index}
            className={`d-flex justify-content-around align-items-center w-100 ${
              torre['ativado'] ? '' : 'bg-danger'
            }`}
            style={{ fontSize: '1vw' }}
          >
            <CTableHeaderCell
              scope="row"
              className="d-flex justify-content-around align-items-center w-25"
              style={{ fontSize: '1vw' }}
            >
              {torre['id']}
            </CTableHeaderCell>
            <CTableHeaderCell
              className="d-flex justify-content-around align-items-center w-25"
              style={{ fontSize: '1vw' }}
            >
              {torre['nome']}
            </CTableHeaderCell>
            <CTableHeaderCell className="d-flex justify-content-around align-items-center w-25">
              <Link to={`/vizualizartorresFCA/${encodeURIComponent(JSON.stringify(index + 1))}`}>
                <Imagens src={Visualizar} altura={'1vw'} />
              </Link>
            </CTableHeaderCell>
            <CTableHeaderCell className="d-flex justify-content-around align-items-center w-25">
              <Link to={`/editartorresFCA/${encodeURIComponent(JSON.stringify(index + 1))}`}>
                <Imagens src={Editar} altura={'1vw'} />
              </Link>
            </CTableHeaderCell>
          </CTableRow>
        ))}
      </>
    )
  }

  return (
    <div
      className="table-responsive mt-5"
      style={{
        border: '1px solid black',
        borderRadius: '10px',
        width: '100%',
        maxHeight: '400px',
        overflowY: 'auto',
      }}
    >
      <CTable
        className="table-responsive mt-3"
        style={{ border: '1px solid black', borderRadius: '10px', width: '100%' }}
      >
        <CTableHead>
          <CTableRow className="d-flex justify-content-around align-items-center w-100">
            <CTableHeaderCell
              className="d-flex justify-content-around align-items-center w-25"
              scope="col"
              style={{ fontSize: '1vw' }}
            >
              ID
            </CTableHeaderCell>
            <CTableHeaderCell
              className="d-flex justify-content-around align-items-center w-25"
              scope="col"
              style={{ fontSize: '1vw' }}
            >
              {Name}
            </CTableHeaderCell>
            <CTableHeaderCell
              className="d-flex justify-content-around align-items-center w-25"
              scope="col"
              style={{ fontSize: '1vw' }}
            >
              Visualizar
            </CTableHeaderCell>
            <CTableHeaderCell
              className="d-flex justify-content-around align-items-center w-25"
              scope="col"
              style={{ fontSize: '1vw' }}
            >
              Editar
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody className="d-flex flex-wrap">
          {Dados && Dados.data.length > 0 ? (
            <TorresComponent />
          ) : (
            // Renderiza algo quando Dados não é um objeto válido ou não contém torres
            <p>Nenhum dado de torre disponível</p>
          )}
        </CTableBody>
      </CTable>
    </div>
  )
}

function Table({ Dados, Name }) {
  const TorresComponent = () => {
    return (
      <>
        {Dados[0].map((torre, index) => (
          <CTableRow
            key={index}
            className={`d-flex justify-content-around align-items-center w-100 ${
              torre.fca.ativado ? '' : 'bg-danger'
            }`}
            style={{ fontSize: '1vw' }}
          >
            <CTableHeaderCell
              scope="row"
              className="d-flex justify-content-around align-items-center w-25"
              style={{ fontSize: '1vw' }}
            >
              {index + 1}
            </CTableHeaderCell>
            <CTableHeaderCell
              className="d-flex justify-content-around align-items-center w-25"
              style={{ fontSize: '1vw' }}
            >
              {torre.fca.nome}
            </CTableHeaderCell>
            <CTableHeaderCell className="d-flex justify-content-around align-items-center w-25">
              <Link to={`/vizualizartorresFCA/${encodeURIComponent(JSON.stringify(index + 1))}`}>
                <Imagens src={Visualizar} altura={'1vw'} />
              </Link>
            </CTableHeaderCell>
            <CTableHeaderCell className="d-flex justify-content-around align-items-center w-25">
              <Link to={`/editartorresFCA/${encodeURIComponent(JSON.stringify(index + 1))}`}>
                <Imagens src={Editar} altura={'1vw'} />
              </Link>
            </CTableHeaderCell>
          </CTableRow>
        ))}
      </>
    )
  }

  return (
    <div
      className="table-responsive mt-5"
      style={{
        border: '1px solid black',
        borderRadius: '10px',
        width: '100%',
        maxHeight: '400px',
        overflowY: 'auto',
      }}
    >
      <CTable
        className="table-responsive mt-3"
        style={{ border: '1px solid black', borderRadius: '10px', width: '100%' }}
      >
        <CTableHead>
          <CTableRow className="d-flex justify-content-around align-items-center w-100">
            <CTableHeaderCell
              className="d-flex justify-content-around align-items-center w-25"
              scope="col"
              style={{ fontSize: '1vw' }}
            >
              ID
            </CTableHeaderCell>
            <CTableHeaderCell
              className="d-flex justify-content-around align-items-center w-25"
              scope="col"
              style={{ fontSize: '1vw' }}
            >
              {Name}
            </CTableHeaderCell>
            <CTableHeaderCell
              className="d-flex justify-content-around align-items-center w-25"
              scope="col"
              style={{ fontSize: '1vw' }}
            >
              Visualizar
            </CTableHeaderCell>
            <CTableHeaderCell
              className="d-flex justify-content-around align-items-center w-25"
              scope="col"
              style={{ fontSize: '1vw' }}
            >
              Editar
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody className="d-flex flex-wrap">
          {Dados && Dados.length > 0 ? (
            <TorresComponent />
          ) : (
            // Renderiza algo quando Dados não é um objeto válido ou não contém torres
            <p>Nenhum dado de torre disponível</p>
          )}
        </CTableBody>
      </CTable>
    </div>
  )
}

function Table1({ Dados, Name }) {
  // Chame a função exportToExcel quando quiser exportar os dados para Excel

  return (
    <div
      className="table-responsive"
      style={{ border: '1px solid black', borderRadius: '10px', width: '100%' }}
    >
      <CTable
        className="mt-5 table"
        style={{ border: '1px solid black', borderRadius: '10px', width: '100%' }}
      >
        <CTableHead>
          <CTableRow className="d-flex justify-content-around align-items-center w-100">
            <CTableHeaderCell scope="col" className="w-50" style={{ fontSize: '1.5vw' }}>
              ID
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="w-50" style={{ fontSize: '1.5vw' }}>
              {Name}
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {Dados.map((item) => (
            <CTableRow
              className="d-flex justify-content-around align-items-center w-100"
              key={item.id}
              style={{ fontSize: '1.5vw' }}
            >
              <CTableHeaderCell scope="row" className="w-75" style={{ fontSize: '1.5vw' }}>
                {item.id}
              </CTableHeaderCell>
              <CTableHeaderCell className="w-75">{item.nome}</CTableHeaderCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>
  )
}

Table.propTypes = {
  Dados: PropTypes.node.isRequired,
  Name: PropTypes.string.isRequired,
  Rota1: PropTypes.string.isRequired,
  Rota2: PropTypes.string.isRequired,
}

TableFilter.propTypes = {
  Dados: PropTypes.node.isRequired,
  Name: PropTypes.string.isRequired,
  Rota1: PropTypes.string.isRequired,
  Rota2: PropTypes.string.isRequired,
}

Table1.propTypes = {
  Dados: PropTypes.node.isRequired,
  Name: PropTypes.string.isRequired,
  Rota1: PropTypes.string.isRequired,
  Rota2: PropTypes.string.isRequired,
}

export { Table, Table1, TableFilter }
