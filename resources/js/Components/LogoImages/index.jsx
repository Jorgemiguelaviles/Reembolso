import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const LogoImage = ({ src, altura }) => {
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((rotation) => rotation + 1)
    }, 10) // Defina aqui a velocidade da rotação (quanto menor o valor, mais rápida será a rotação)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <img
      src={src}
      alt="Imagem"
      height={altura}
      style={{
        animation: 'clockwise 1s infinite linear',
        transformOrigin: 'center center',
        transform: `rotate(${rotation}deg)`,
        width: '427px',
      }}
    />
  )
}

LogoImage.propTypes = {
  src: PropTypes.string.isRequired,
  altura: PropTypes.string.isRequired,
}

export default LogoImage
