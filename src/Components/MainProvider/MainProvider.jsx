import React from 'react'
import { DetailsModalProvider } from '../../Contexts/DetailsModalContext'
import {EditModalProvider} from '../../Contexts/EditModalContext'

function MainProvider({children}) {
  return (
    <DetailsModalProvider>
    <EditModalProvider>
         {children}
    </EditModalProvider>
    </DetailsModalProvider>
  )
}

export default MainProvider
