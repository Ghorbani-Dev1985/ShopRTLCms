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
import { useProducts } from "../../Contexts/ProductsContext";

function CommentsTable() {
  const pageTitle = useTitle("کامنت‌ها")
  const {showDetailsModal, setShowDetailsModal } = useDetailsModal();
  const {showEditModal, setShowEditModal } = useEditModal();
  const {showRealtimeDatas , setShowRealTimeDatas} = useShowRealtimeDatas()
  const {isShowLoading , setIsShowLoading} = useShowLoading()
  const [showCommentDetails , setShowCommentDetails] = useState({})
  const [updateCommentID , setUpdateCommentID] = useState()
  const [commentBody , setCommentBody] = useState()
  const [isAcceptComment , setIsAcceptComment] = useState(false)
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
      field: "acceptAction",
      headerName: "تایید",
      width: 80,
      headerAlign: "center",
      align: "center",
      renderCell: (comment) => {
        return (
          comment.row.isAccept ? <TaskAlt className="text-gray-400 opacity-45"/> :  <div
           onClick={() => {         
              acceptCommentHandler(comment.id , comment.row.isAccept);
              setIsAcceptComment(true)
            }}
            className="flex-center cursor-pointer text-emerald-500"
          >
            <TaskAlt />
          </div>
         
        );
      },
    },
    {
      field: "rejectAction",
      headerName: "رد کامنت",
      width: 80,
      headerAlign: "center",
      align: "center",
      renderCell: (comment) => {
        return (
          comment.row.isAccept ? <div
            onClick={() => {         
              rejectCommentHandler(comment.id , comment.row.isAccept);

            }}
            className="flex-center cursor-pointer text-rose-500"
          >
            <HideSource />
          </div>
         : <HideSource className="text-gray-400 opacity-45"/>
        );
      },
    },
    {
      field: "editAction",
      headerName: "ویرایش",
      width: 80,
      headerAlign: "center",
      align: "center",
      renderCell: (comment) => {
        return (
          <div
            onClick={() => {
              setShowEditModal(true)
              setUpdateCommentID(comment.id)
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
      renderCell: (comment) => {
        return (
          <div
            onClick={() => {
              deleteCommentHandler(comment.id);
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
    let filterUpdateComment = comments.find((comment) => comment._id === updateCommentID);
    if(filterUpdateComment){
      setCommentBody(filterUpdateComment.commentBody)
    }
  } , [updateCommentID])
  const updateCommentHandler = (event) => {
    event.preventDefault()

    if(commentBody){
      let updateCommentInfo = {commentBody}
      const Update = useUpdate("comments/update" , updateCommentInfo ,updateCommentID)
      setShowRealTimeDatas((prev) => !prev)
      setShowEditModal(false)
      setCommentBody("")
    }else{
      toast.error("لطفا فرم را تکمیل نمایید")
    }

  }
  const rejectCommentHandler = (commentID , isAccept) => {
    console.log(isAccept)
    Swal.fire({
      title: "برای رد کامنت مطمعن هستید؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f43f5e",
      cancelButtonColor: "#0ea5e9",
      confirmButtonText: "تایید",
      cancelButtonText: "انصراف",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsAcceptComment(!isAccept)
        console.log(isAcceptComment)
        let rejectComment = {isAcceptComment}
        const update = useUpdate("comments/reject" , false ,commentID)
        setShowRealTimeDatas((prev) => !prev)
      }
    });
  }
  const acceptCommentHandler = (commentID , isAccept) => {
    console.log(isAcceptComment)
   Swal.fire({
      title: "برای تایید کامنت مطمعن هستید؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f43f5e",
      cancelButtonColor: "#0ea5e9",
      confirmButtonText: "تایید",
      cancelButtonText: "انصراف",
    }).then((result) => {
      if (result.isConfirmed) {
        const update = useUpdate("comments/accept" , true , commentID)
        setShowRealTimeDatas((prev) => !prev)
      }
    });
  }
  const deleteCommentHandler = (commentID) => {
    Swal.fire({
      title: "برای حذف کامنت مطمعن هستید؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f43f5e",
      cancelButtonColor: "#0ea5e9",
      confirmButtonText: "تایید",
      cancelButtonText: "انصراف",
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteHook = useDelete("comments/delete" , commentID)
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
          <form onSubmit={(event) => updateCommentHandler(event)} className="relative z-20">
            <Box className="flex flex-wrap justify-between gap-5">
              <TextField
                autoComplete="off"
                value={commentBody}
                multiline
                onChange={(event) => setCommentBody(event.target.value)}
                label={
                  <span>
                    متن کامنت <span className="text-rose-500 text-sm">*</span>
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
