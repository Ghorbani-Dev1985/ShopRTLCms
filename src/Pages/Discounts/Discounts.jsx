import { Alert } from '@mui/material'
import React from 'react'
import ComponentsTitle from '../../Components/common/ComponentTitle/ComponentsTitle'

function Discounts() {
  return (
    <div>
         <ComponentsTitle titleText=" تخفیف‌ها"/>
      <Alert severity="info">هیچ کد تخفیفی تاکنون تعریف نگردیده است</Alert>
    </div>
  )
}

export default Discounts
