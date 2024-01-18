import React from 'react'
import { DataGrid ,faIR} from '@mui/x-data-grid';
import { DeleteOutlineOutlined, Edit, FindInPage } from '@mui/icons-material';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { useDetailsModal } from '../../Contexts/DetailsModalContext';
import DetailsModal from '../DetailsModal/DetailsModal';
import { useEditModal } from '../../Contexts/EditModalContext';
import EditModal from '../EditModal/EditModal'




function ProductsTable() {
  const {showDetailsModal , setShowDetailsModal} = useDetailsModal()
  const {showEditModal , setShowEditModal} = useEditModal()
  console.log(showEditModal)
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
    { field: 'showDetails', headerName: '  مشاهده جزییات', width: 150 , 
    renderCell: (product) => {
      return (
        <Button onClick={() => setShowDetailsModal(true)} className='text-emerald-500'>
                <FindInPage />
                </Button>
      );
    }
    },
    {
      field: "editAction",
      headerName: "ویرایش",
      width: 90,
      renderCell: (product) => {
        return (
          <div
            onClick={() => setShowEditModal(true)}
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
  
  const deleteProductHandler = (productID) => {
    console.log(productID);
    Swal.fire({
      title: "برای حذف محصول مطمعن هستید؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f43f5e",
      cancelButtonColor: "#0ea5e9",
      confirmButtonText: "تایید",
      cancelButtonText: "انصراف",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${BaseURL}products/delete`, {
            headers: {
              authorization: productID,
            },
          })
          .then((response) => {
            toast.success("محصول مورد نظر با موفقیت حذف گردید");
            setGetProductsData((prev) => !prev);
            console.log(response);
          })
          .catch((error) => {
            toast.error("حذف محصول انجام نشد");
            console.log(error);
          });
      }
    });
  };
  
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
  return (
    <>
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
  <DetailsModal rows={rows}/>
   <EditModal>
    sdds
    </EditModal>
      </>
  )
}

export default ProductsTable
