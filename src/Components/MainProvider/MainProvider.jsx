import React from 'react'
import { DetailsModalProvider } from '../../Contexts/DetailsModalContext'
import {EditModalProvider} from '../../Contexts/EditModalContext'
import { ShowLoadingProvider } from '../../Contexts/ShowLoadingContext'

function MainProvider({children}) {
  return (
    <DetailsModalProvider>
    <EditModalProvider>
      <ShowLoadingProvider>
         {children}
      </ShowLoadingProvider>
    </EditModalProvider>
    </DetailsModalProvider>
  )
}

export default MainProvider
