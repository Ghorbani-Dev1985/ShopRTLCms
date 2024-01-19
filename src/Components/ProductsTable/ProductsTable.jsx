import React, { useState } from "react";
import { DataGrid, faIR } from "@mui/x-data-grid";
import { DeleteOutlineOutlined, Edit, FindInPage } from "@mui/icons-material";
import { Alert, Box, Button, TextField } from "@mui/material";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useDetailsModal } from "../../Contexts/DetailsModalContext";
import DetailsModal from "../DetailsModal/DetailsModal";
import { useEditModal } from "../../Contexts/EditModalContext";
import EditModal from "../EditModal/EditModal";
import RtlProvider from "../common/RtlProvider/RtlProvider";
import useFetch from "../../Hooks/useFetch";
import useDelete from "../../Hooks/useDelete";
import { useShowLoading } from "../../Contexts/ShowLoadingContext";
import UserSkeleton from "../common/UsersSkeleton/UserSkeleton";
import { useShowRealtimeDatas } from "../../Contexts/ShowRealtimeDatasContext";
import useTitle from "../../Hooks/useTitle";


function ProductsTable() {
  const { showDetailsModal, setShowDetailsModal } = useDetailsModal();
  const { showEditModal, setShowEditModal } = useEditModal();
  const {showRealtimeDatas} = useShowRealtimeDatas()
  const {isShowLoading , setIsShowLoading} = useShowLoading()
  const pageTitle = useTitle("محصولات")
  const [productID , setProductID] = useState("")
  console.log(isShowLoading)
  const { datas: products } = useFetch("products/all", "");
  const columns = [
    {
      field: "id",
      headerName: "ردیف",
      width: 10,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "CREATED_AT",
      headerName: "تاریخ ایجاد",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "img",
      headerName: " عکس",
      width: 80,
      headerAlign: "center",
      align: "center",
      renderCell: (product) => {
        return (
          <img
            src={`src/assets/Images/Products/${product.row.productImg}`}
            className="object-fill h-16 rounded-lg "
            alt="ghorbani-dev.ir"
          />
        );
      },
    },
    { field: "productTitle", headerName: " نام محصول", width: 260 },
    {
      field: "price",
      headerName: "قیمت (تومان)",
      width: 110,
      headerAlign: "center",
      align: "center",
      renderCell: (product) => {
        return product.row.price.toLocaleString();
      },
    },
    {
      field: "countNum",
      headerName: " موجودی",
      width: 70,
      headerAlign: "center",
      align: "center",
      renderCell: (product) => {
        return <p className={`${product.row.count > 2 ? "text-emerald-500" : "text-rose-500"}`}>{product.row.count}</p>;
      },
    },
    {
      field: "showDetails",
      headerName: "  جزییات",
      width: 80,
      headerAlign: "center",
      align: "center",
      renderCell: (product) => {
        return (
          <Button
            onClick={() => setShowDetailsModal(true)}
            className="text-emerald-500"
          >
            <FindInPage />
          </Button>
        );
      },
    },
    {
      field: "editAction",
      headerName: "ویرایش",
      width: 80,
      headerAlign: "center",
      align: "center",
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
      width: 80,
      headerAlign: "center",
      align: "center",
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
  console.log(showRealtimeDatas)
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
        const {showRealtimeDatas} = useDelete("products/delete" , productID)
        console.log(showRealtimeDatas)
      }
    });
  };

  return (
    <>
        
      {
        isShowLoading ? <UserSkeleton listsToRender={5}/> : 
        <>
      <div style={{ width: "100%" }}>
          <h2 className="font-DanaBold my-8 text-2xl">لیست محصولات</h2>
          {
            products.length > 1 ?  <DataGrid
          rows={products.map((product, index) => {
            return { id: index + 1, ...product };
          })}
          getRowId={(product) => product._id}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          localeText={faIR.components.MuiDataGrid.defaultProps.localeText}
          pageSizeOptions={[5, 10, 25, 100, 200]}
          checkboxSelection
        />:  <Alert severity="info">هیچ محصولی تاکنون تعریف نگردیده است</Alert>
          }
         
          </div> 
        </>
      }

      {/* {
        products.length > 1 ?  <div style={{ width: "100%" }}>
          <h2 className="font-DanaBold my-8 text-2xl">لیست محصولات</h2>
          {
            isShowLoading ? <UserSkeleton listsToRender={5}/> : <DataGrid
          rows={products.map((product, index) => {
            return { id: index + 1, ...product };
          })}
          getRowId={(product) => product._id}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          localeText={faIR.components.MuiDataGrid.defaultProps.localeText}
          pageSizeOptions={[5, 10, 25, 100, 200]}
          checkboxSelection
        />
          }
        
      </div> :  <Alert severity="info">هیچ محصولی تاکنون تعریف نگردیده است</Alert>
      } */}
     
      {/* Modals */}
      {/* <DetailsModal rows={products}/> */}
      <EditModal>
        <RtlProvider>
          <form className="relative z-20">
            <Box className="flex flex-wrap justify-between gap-5">
              <TextField
                autoComplete="off"
                label={
                  <span>
                    نام محصول <span className="text-rose-500 text-sm">*</span>
                  </span>
                }
                variant="outlined"
                size="small"
              />
              <TextField
                autoComplete="off"
                type="number"
                label={
                  <span>
                    قیمت <span className="text-rose-500 text-sm">*</span>
                  </span>
                }
                variant="outlined"
                size="small"
              />
              <TextField
                autoComplete="off"
                type="number"
                label={
                  <span>
                    موجودی <span className="text-rose-500 text-sm">*</span>
                  </span>
                }
                variant="outlined"
                size="small"
              />
              <TextField
                autoComplete="off"
                label={
                  <span>
                    لینک عکس <span className="text-rose-500 text-sm">*</span>
                  </span>
                }
                variant="outlined"
                size="small"
              />
              <TextField
                autoComplete="off"
                type="number"
                label={
                  <span>
                    میزان محبوبیت{" "}
                    <span className="text-rose-500 text-sm">*</span>
                  </span>
                }
                variant="outlined"
                size="small"
              />
              <TextField
                autoComplete="off"
                type="number"
                label={
                  <span>
                    میزان فروش <span className="text-rose-500 text-sm">*</span>
                  </span>
                }
                variant="outlined"
                size="small"
              />
              <TextField
                autoComplete="off"
                type="number"
                label={
                  <span>
                    تعداد رنگ بندی
                    <span className="text-rose-500 text-sm">*</span>
                  </span>
                }
                variant="outlined"
                size="small"
              />
            </Box>
            <Box className="w-full flex justify-end items-center my-4">
              <Button variant="contained" startIcon={<Edit />}>
                ثبت اطلاعات جدید
              </Button>
            </Box>
          </form>
        </RtlProvider>
      </EditModal>
    </>
  );
}

export default ProductsTable;
