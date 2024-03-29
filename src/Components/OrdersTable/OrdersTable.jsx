import React, { useEffect, useState } from "react";
import { DataGrid, faIR } from "@mui/x-data-grid";
import { DeleteOutlineOutlined, Edit, FindInPage, HideSource, TaskAlt } from "@mui/icons-material";
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
import useUpdate from "../../Hooks/useUpdate";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



function OrdersTable() {
  const pageTitle = useTitle("سفارش‌ها")
  const {showDetailsModal, setShowDetailsModal } = useDetailsModal();
  const {showEditModal, setShowEditModal } = useEditModal();
  const {showRealtimeDatas , setShowRealTimeDatas} = useShowRealtimeDatas()
  const {isShowLoading , setIsShowLoading} = useShowLoading()
  const [showOrderDetails , setShowOrderDetails] = useState({})
  const [updateOrderID , setUpdateOrderID] = useState("")
  const [popularity , setPopularity] = useState("")
  const [price , setPrice] = useState("")
  const [sale , setSale] = useState("")
  const [saleCount , setSaleCount] = useState("")
  const { datas: orders } = useFetch("orders/all", "");
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
    { field: "CREATED_HOUR", headerName: " ساعت ایجاد", width: 100 , headerAlign: "center",
    align: "center",},
    { field: "orderPrice", headerName: "   مبلغ(تومان)", width: 100 , headerAlign: "center",
    align: "center",
    renderCell: (order) => {
      return order.row.price && order.row.price.toLocaleString()
    },
  },
    { field: "discountStatus", headerName: "  میزان تخفیف", width: 100 , headerAlign: "center",
    align: "center",
    renderCell: (order) => {
      return order.row.discount > 0 ? order.row.discount : "بدون تخفیف" 
    },
   },
    {
      field: "status",
      headerName: "  وضعیت",
      width: 120,
      headerAlign: "center",
      align: "center",
      renderCell: (order) => {
        return order.row.isActive ? <p className="bg-emerald-100 text-emerald-500 rounded-lg px-2 py-1">  موفق</p> : <p className="bg-amber-50 text-amber-500 px-2 py-1 rounded-lg"> پرداخت نشده</p>
      },
    },
    {
      field: "showDetails",
      headerName: "  جزییات",
      width: 80,
      headerAlign: "center",
      align: "center",
      renderCell: (order) => {
        return (
          <Button
            onClick={() => {
              setShowDetailsModal(true)
              setShowOrderDetails(order.row)
              setShowRealTimeDatas((prev) => !prev)
            }}
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
      renderCell: (order) => {
        return (
          <div
            onClick={() => {
              setShowEditModal(true)
             setUpdateOrderID(order.id)
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
      width: 80,
      headerAlign: "center",
      align: "center",
      renderCell: (order) => {
        return (
          <div
            onClick={() => {
              deleteOrderHandler(order.id);
            }}
            className="flex-center cursor-pointer text-rose-500"
          >
            <DeleteOutlineOutlined />
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    let filterUpdateOrder = orders.find((order) => order._id === updateOrderID);
    if(filterUpdateOrder){
      setPopularity(filterUpdateOrder.popularity)
      setPrice(filterUpdateOrder.price)
      setSale(filterUpdateOrder.sale)
      setSaleCount(filterUpdateOrder.saleCount)
    }
  } , [updateOrderID])
  const updateOrderHandler = (event) => {
    event.preventDefault()
    if(popularity && price && sale && saleCount){
      let updateOrderInfo = {
        popularity,
        price,
        sale,
        saleCount
      }
      const Update = useUpdate("orders/update" , updateOrderInfo ,updateOrderID)
      setShowRealTimeDatas((prev) => !prev)
      setShowEditModal(false)
      setPopularity("")
      setPrice("")
      setSale("")
      setSaleCount("")
    }else{
      toast.error("لطفا فرم را تکمیل نمایید")
    }

  }
  const deleteOrderHandler = (orderID) => {
    Swal.fire({
      title: "برای حذف سفارش مطمعن هستید؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f43f5e",
      cancelButtonColor: "#0ea5e9",
      confirmButtonText: "تایید",
      cancelButtonText: "انصراف",
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteHook = useDelete("orders/delete" , orderID)
        setShowRealTimeDatas((prev) => !prev)
      }
    });
  };
  return (
    <>
        
      {
        isShowLoading ? <UserSkeleton listsToRender={5}/> : 
        <>
      <div style={{ width: "100%" }}>
          <h2 className="font-DanaBold my-8 text-2xl">لیست سفارش‌ها</h2>
          {
            orders.length > 1 ?  <DataGrid
          rows={orders.reverse().map((order, index) => {
            return { id: index + 1, ...order };
          })}
          getRowId={(order) => order._id}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 7 },
            },
          }}
          localeText={faIR.components.MuiDataGrid.defaultProps.localeText}
          pageSizeOptions={[5, 10, 25, 100, 200]}
        />:  <Alert severity="info">هیچ سفارشی تاکنون ثبت نگردیده است</Alert>
          }
         
          </div> 
        </>
      }
  
      {/* Modals */}
      <DetailsModal> 
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 1 , borderColor: "#e7e7e7" } }}>
            <TableCell align="center">محبوبیت</TableCell>
            <TableCell align="center">دفعات خرید </TableCell>
            <TableCell align="center">مجموع(تومان) </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 1 , borderColor: "#e7e7e7" } }}
            >
              <TableCell align="center">{showOrderDetails.popularity}</TableCell>
              <TableCell align="center">{showOrderDetails.saleCount}</TableCell>
              <TableCell align="center">{showOrderDetails.sale && showOrderDetails.sale.toLocaleString()}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
      </DetailsModal> 
      <EditModal>
        <RtlProvider>
          <form onSubmit={(event) => updateOrderHandler(event)} className="relative z-20">
            <Box className="flex flex-wrap justify-between gap-5">
              <TextField
                autoComplete="off"
                value={popularity}
                type="number"
                onChange={(event) => setPopularity(event.target.value)}
                label={
                  <span>
                     محبوبیت <span className="text-rose-500 text-sm">*</span>
                  </span>
                }
                variant="outlined"
                size="small"
              />
              <TextField
                autoComplete="off"
                value={price}
                type="number"
                onChange={(event) => setPrice(event.target.value)}
                label={
                  <span>
                     مبلغ <span className="text-rose-500 text-sm">*</span>
                  </span>
                }
                variant="outlined"
                size="small"
              />
              <TextField
                autoComplete="off"
                value={sale}
                type="number"
                onChange={(event) => setSale(event.target.value)}
                label={
                  <span>
                     مجموع خرید <span className="text-rose-500 text-sm">*</span>
                  </span>
                }
                variant="outlined"
                size="small"
              />
              <TextField
                autoComplete="off"
                value={saleCount}
                type="number"
                onChange={(event) => setSaleCount(event.target.value)}
                label={
                  <span>
                     دفعات خرید <span className="text-rose-500 text-sm">*</span>
                  </span>
                }
                variant="outlined"
                size="small"
              />
            </Box>
            <Box className="w-full flex justify-end items-center my-4">
              <Button type="submit" variant="contained" startIcon={<Edit />}>
                ثبت اطلاعات جدید
              </Button>
            </Box>
          </form>
        </RtlProvider>
      </EditModal>
    </>
  );
}

export default OrdersTable;
