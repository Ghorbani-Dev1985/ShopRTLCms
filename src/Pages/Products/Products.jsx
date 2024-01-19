import React from 'react'
import ComponentsTitle from '../../Components/common/ComponentTitle/ComponentsTitle'
import AddNewProduct from '../../Components/AddNewProduct/AddNewProduct'
import ProductsTable from '../../Components/ProductsTable/ProductsTable'

function Products() {
  return (
    <div className='space-y-5'>
       <ComponentsTitle titleText=" محصولات"/>
       <AddNewProduct />
       <ProductsTable />
    </div>
  )
}

export default Products
