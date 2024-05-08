import React from 'react'
import { CFormCheck } from '@coreui/react'
import PropTypes from 'prop-types'

const Radios = ({ nome, ativo, etiqueta, desativado }) => {
  return (
    <div>
      <div>
        <CFormCheck
          type="radio"
          name={nome}
          id="flexRadioDefault2"
          label={etiqueta}
          defaultChecked={ativo}
          disabled={desativado}
        />
      </div>
    </div>
  )
}

Radios.propTypes = {
  nome: PropTypes.string.isRequired,
  ativo: PropTypes.bool.isRequired,
  desativado: PropTypes.bool.isRequired,
  etiqueta: PropTypes.string.isRequired,
}

export default Radios
