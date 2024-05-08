import { useState, useEffect } from 'react'
import encaminharPara from 'functions/useEncaminhar'

const useUpdateValores = (permissionupdate) => {
  useEffect(() => {
    // Verificar se permissioncadastro não está vazio
    if (permissionupdate !== '') {
      // Encaminhar para a rota desejada
      encaminharPara(`../TorreCadastradaComSucesso/${permissionupdate}`)
    }
  }, [permissionupdate])
}

export default useUpdateValores
