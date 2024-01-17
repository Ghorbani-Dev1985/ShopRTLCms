import React from 'react'
import ComponentsTitle from '../../Components/common/ComponentTitle/ComponentsTitle'
import AddNewProduct from '../../Components/AddNewProduct/AddNewProduct'
import { Alert } from '@mui/material'
import ProductsTable from '../../Components/ProductsTable/ProductsTable'

function Products() {
  return (
    <div className='space-y-5'>
       <ComponentsTitle titleText=" محصولات"/>
       <AddNewProduct />
       <Alert severity="info">هیچ محصولی تاکنون تعریف نگردیده است</Alert>
       <ProductsTable />
    </div>
  )
}

export default Products
