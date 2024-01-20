import React, { useEffect, useState } from "react";
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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useUpdate from "../../Hooks/useUpdate";
import { useProducts } from "../../Contexts/ProductsContext";

function CommentsTable() {
  const pageTitle = useTitle("کامنت‌ها")
  const {showDetailsModal, setShowDetailsModal } = useDetailsModal();
  const {showEditModal, setShowEditModal } = useEditModal();
  const {showRealtimeDatas , setShowRealTimeDatas} = useShowRealtimeDatas()
  const {isShowLoading , setIsShowLoading} = useShowLoading()
  const [showCommentDetails , setShowCommentDetails] = useState({})
  const [updateProductID , setUpdateProductID] = useState()
  const { productTitle , setProductTitle , productImg , setProductImg , price , setPrice , count , setCount , popularity , setPopularity , sale , setSale , colors , setColors , productUrl , setProductUrl } = useProducts()
  const { datas: comments } = useFetch("comments/all", "");
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
    {
      field: "reply",
      headerName: "  وضعیت پاسخ",
      width: 120,
      headerAlign: "center",
      align: "center",
      renderCell: (comment) => {
        return comment.row.isReply ? <p className="bg-emerald-100 text-emerald-500 rounded-lg px-2 py-1">پاسخ داده شده</p> : <p className="bg-amber-50 text-amber-500 px-2 py-1 rounded-lg">بدون پاسخ</p>
      },
    },
    {
      field: "accept",
      headerName: " وضعیت انتشار",
      width: 120,
      headerAlign: "center",
      align: "center",
      renderCell: (comment) => {
        return comment.row.isAccept ? <p className="bg-sky-100 text-sky-500 rounded-lg px-2 py-1">  منتشر شده</p> : <p className="bg-slate-50 text-slate-500 px-2 py-1 rounded-lg"> منتشر نشده</p>
      },
    },
    {
      field: "showDetails",
      headerName: "  جزییات",
      width: 80,
      headerAlign: "center",
      align: "center",
      renderCell: (comment) => {
        return (
          <Button
            onClick={() => {
              setShowDetailsModal(true)
              setShowCommentDetails(comment.row)
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
      renderCell: (product) => {
        return (
          <div
            onClick={() => {
              setShowEditModal(true)
              setUpdateProductID(product.id)
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
  // useEffect(() => {
  //   let filterUpdateProduct = products.find((product) => product._id === updateProductID);
  //   if(filterUpdateProduct){
  //     setProductTitle(filterUpdateProduct.productTitle)
  //       setProductImg(filterUpdateProduct.productImg)
  //       setPrice(filterUpdateProduct.price)
  //       setPopularity(filterUpdateProduct.popularity)
  //       setCount(filterUpdateProduct.count)
  //       setSale(filterUpdateProduct.sale)
  //       setColors(filterUpdateProduct.colors)
  //       setProductUrl(filterUpdateProduct.productUrl)
  //   }
  // } , [updateProductID])
  const updateProductHandler = (event) => {
    event.preventDefault()
    console.log(updateProductID)
    let updateProductInfos = {
      productTitle,
      productImg,
      price,
      count,
      popularity,
      popularity,
      sale,
      colors,
      productUrl
    }
    if(productTitle && productImg && price && count && popularity && sale && colors && productUrl){
      const Update = useUpdate("products/update" , updateProductInfos ,updateProductID)
      setShowRealTimeDatas((prev) => !prev)
      setShowEditModal(false)
      setProductTitle("")
      setProductImg("")
      setPrice("")
      setPopularity("")
      setCount("")
      setSale("")
      setColors("")
      setProductUrl("")
    }else{
      toast.error("لطفا فرم را تکمیل نمایید")
    }

  }
  const deleteProductHandler = (productID) => {
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
        const deleteHook = useDelete("products/delete" , productID)
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
          <h2 className="font-DanaBold my-8 text-2xl">لیست کامنت‌ها</h2>
          {
            comments.length > 1 ?  <DataGrid
          rows={comments.reverse().map((product, index) => {
            return { id: index + 1, ...product };
          })}
          getRowId={(comment) => comment._id}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          localeText={faIR.components.MuiDataGrid.defaultProps.localeText}
          pageSizeOptions={[5, 10, 25, 100, 200]}
          checkboxSelection
        />:  <Alert severity="info">هیچ کامنتی تاکنون تعریف نگردیده است</Alert>
          }
         
          </div> 
        </>
      }
  
      {/* Modals */}
      <DetailsModal> 
       {showCommentDetails.commentBody}
      </DetailsModal> 
      <EditModal>
        <RtlProvider>
          <form onSubmit={(event) => updateProductHandler(event)} className="relative z-20">
            <Box className="flex flex-wrap justify-between gap-5">
              <TextField
                autoComplete="off"
                value={productTitle}
                onChange={(event) => setProductTitle(event.target.value)}
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
                value={price}
                onChange={(event) => setPrice(event.target.value)}
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
                value={count}
                onChange={(event) => setCount(event.target.value)}
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
                value={productImg}
                onChange={(event) => setProductImg(event.target.value)}
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
                value={popularity}
                onChange={(event) => setPopularity(event.target.value)}
                label={
                  <span>
                    میزان محبوبیت
                    <span className="text-rose-500 text-sm">*</span>
                  </span>
                }
                variant="outlined"
                size="small"
              />
              <TextField
                autoComplete="off"
                type="number"
                value={sale}
                onChange={(event) => setSale(event.target.value)}
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
                value={colors}
                onChange={(event) => setColors(event.target.value)}
                label={
                  <span>
                    تعداد رنگ بندی
                    <span className="text-rose-500 text-sm">*</span>
                  </span>
                }
                variant="outlined"
                size="small"
              />
              <TextField
                autoComplete="off"
                value={productUrl}
                onChange={(event) => setProductUrl(event.target.value)}
                label={
                  <span>
                      لینک محصول
                    <span className="text-rose-500 text-sm">*</span>
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

export default CommentsTable;
