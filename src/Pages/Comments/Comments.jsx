import { Alert } from '@mui/material'
import React from 'react'
import ComponentsTitle from '../../Components/common/ComponentTitle/ComponentsTitle'

function Comments() {
  return (
    <div>
         <ComponentsTitle titleText=" کامنت‌ها"/>
      <Alert severity="info">هیچ کامنتی تاکنون ثبت نگردیده است</Alert>
    </div>
  )
}

export default Comments
