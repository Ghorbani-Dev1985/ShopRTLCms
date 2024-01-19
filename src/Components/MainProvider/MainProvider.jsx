import React from 'react'
import { DetailsModalProvider } from '../../Contexts/DetailsModalContext'
import {EditModalProvider} from '../../Contexts/EditModalContext'
import { ShowLoadingProvider } from '../../Contexts/ShowLoadingContext'
import { ShowRealtimeDatasProvider } from '../../Contexts/ShowRealtimeDatasContext'

function MainProvider({children}) {
  return (
    <DetailsModalProvider>
    <EditModalProvider>
      <ShowLoadingProvider>
        <ShowRealtimeDatasProvider>
         {children}
        </ShowRealtimeDatasProvider>
      </ShowLoadingProvider>
    </EditModalProvider>
    </DetailsModalProvider>
  )
}

export default MainProvider
