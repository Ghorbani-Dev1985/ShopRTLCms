import React from 'react'
import { DataGrid ,faIR} from '@mui/x-data-grid';
import { DeleteOutlineOutlined, Edit } from '@mui/icons-material';

const columns = [
  { field: 'id', headerName: 'ردیف', width: 10 },
  { field: 'firstName', headerName: ' عکس', width: 180 },
  { field: 'lastName', headerName: ' نام محصول', width: 260 },
  {
    field: 'fullName',
    headerName: 'قیمت ',
    width: 90,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'fdf',
    headerName: ' موجودی',
    width: 70,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  { field: 'lastNdsasasasaadame', headerName: '  ', width: 100 },
  {
    field: "editAction",
    headerName: "ویرایش",
    width: 90,
    renderCell: (product) => {
      return (
        <div
          onClick={() => {
            setShowUpdateProductDialog(true);
            setProductID(product.id);
          }}
          className="flex-center cursor-pointer text-sky-500"
        >
          <Edit />
        </div>
      );
    },
  },
  {
    field: "deleteAction",
    headerName: "حذف",
    width: 90,
    renderCell: (product) => {
      return (
        <div
          onClick={() => {
            deleteProductHandler(product.id);
          }}
          className="flex-center cursor-pointer text-rose-500"
        >
          <DeleteOutlineOutlined />
        </div>
      );
    },
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];


function ProductsTable() {
  return (
    <div style={{ width: '100%' }}>
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      localeText={faIR.components.MuiDataGrid.defaultProps.localeText}
      pageSizeOptions={[5, 10 , 25, 100 , 200]}
      checkboxSelection
    />
  </div>
  )
}

export default ProductsTable
