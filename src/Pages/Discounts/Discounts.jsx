import { Alert } from '@mui/material'
import React from 'react'
import ComponentsTitle from '../../Components/common/ComponentTitle/ComponentsTitle'
import DiscountsTable from '../../Components/DiscountsTable/DiscountsTable'

function Discounts() {
  return (
    <div>
         <ComponentsTitle titleText=" تخفیف‌ها"/>
         <DiscountsTable />
    </div>
  )
}

export default Discounts
