import React from 'react'
import PropTypes from 'prop-types'

const DateInput = ({ etiqueta, campo, setCampo, desativado, input, setinput }) => {
  return (
    <div className="form-group">
      <label htmlFor={campo} className="form-label">
        {etiqueta}
      </label>
      <input
        type="date"
        id={campo}
        name={campo}
        className="form-control"
        disabled={desativado}
        value={input}
        onChange={(e) => setinput(e.target.value)}
      />
    </div>
  )
}

DateInput.propTypes = {
  etiqueta: PropTypes.string.isRequired,
  campo: PropTypes.string.isRequired,
  setCampo: PropTypes.func.isRequired,
  desativado: PropTypes.bool.isRequired,
  input: PropTypes.string.isRequired,
  setinput: PropTypes.func.isRequired,
}

export default DateInput
