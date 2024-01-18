import React from 'react'
import { DetailsModalProvider } from '../../Contexts/DetailsModalContext'

function MainProvider({children}) {
  return (
    <DetailsModalProvider>
         {children}
    </DetailsModalProvider>
  )
}

export default MainProvider
