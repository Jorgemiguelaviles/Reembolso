import React from 'react'
import { CAvatar } from '@coreui/react'
import PropTypes from 'prop-types'

const Usuario = ({ src }) => {
  return (
    <CAvatar src={src} className="align-items-center" style={{ width: '100px', height: '100px' }} />
  )
}

Usuario.propTypes = {
  src: PropTypes.string.isRequired,
}

export default Usuario
