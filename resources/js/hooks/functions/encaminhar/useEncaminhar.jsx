// useEncaminhar.js
import { useNavigate } from 'react-router-dom'

function useEncaminhar() {
  const navigate = useNavigate()

  const encaminharPara = (url) => {
    navigate(url)
  }

  return encaminharPara
}

export default useEncaminhar
