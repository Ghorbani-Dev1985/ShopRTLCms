import React, { useEffect, useState } from "react";
import { DataGrid, faIR } from "@mui/x-data-grid";
import {
  DeleteOutlineOutlined,
  Edit,
  FindInPage,
  HideSource,
  TaskAlt,
} from "@mui/icons-material";
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

function UsersTable() {
  const pageTitle = useTitle("کاربر‌ها");
  const { showDetailsModal, setShowDetailsModal } = useDetailsModal();
  const { showEditModal, setShowEditModal } = useEditModal();
  const { showRealtimeDatas, setShowRealTimeDatas } = useShowRealtimeDatas();
  const { isShowLoading, setIsShowLoading } = useShowLoading();
  const [showCommentDetails, setShowCommentDetails] = useState({});
  const [updateUserID, setUpdateUserID] = useState();
  const [commentBody, setCommentBody] = useState();
  const [isAcceptComment, setIsAcceptComment] = useState(false);
  const { datas: users } = useFetch("users/all", "");
  const columns = [
    {
      field: "id",
      headerName: "ردیف",
      width: 10,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "firstName",
      headerName: " نام",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "lastName",
      headerName: "نام خانوادگی",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "userName",
      headerName: "نام کاربری",
      width: 160,
      headerAlign: "center",
      align: "center",
    }, 
    {
      field: "phoneNumber",
      headerName: "تلفن همراه ",
      width: 160,
      headerAlign: "center",
      align: "center",
    }, 
    {
      field: "email",
      headerName: " ایمیل ",
      width: 160,
      headerAlign: "center",
      align: "center",
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
              setShowDetailsModal(true);
              setShowCommentDetails(comment.row);
              setShowRealTimeDatas((prev) => !prev);
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
      renderCell: (comment) => {
        return (
          <div
            onClick={() => {
              setShowEditModal(true);
              setUpdateUserID(comment.id);
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
    let filterUpdateUser = users.find((user) => user._id === updateUserID);
    if (filterUpdateUser) {
      setCommentBody(filterUpdateUser.commentBody);
    }
  }, [updateUserID]);
  const updateCommentHandler = (event) => {
    event.preventDefault();

    if (commentBody) {
      let updateCommentInfo = { commentBody };
      const Update = useUpdate(
        "comments/update",
        updateCommentInfo,
        updateUserID
      );
      setShowRealTimeDatas((prev) => !prev);
      setShowEditModal(false);
      setCommentBody("");
    } else {
      toast.error("لطفا فرم را تکمیل نمایید");
    }
  };
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
        const deleteHook = useDelete("comments/delete", commentID);
        setShowRealTimeDatas((prev) => !prev);
      }
    });
  };
  return (
    <>
      {isShowLoading ? (
        <UserSkeleton listsToRender={5} />
      ) : (
        <>
          <div style={{ width: "100%" }}>
            <h2 className="font-DanaBold my-8 text-2xl">لیست کاربر‌ها</h2>
            {users.length > 1 ? (
              <DataGrid
                rows={users.reverse().map((user, index) => {
                  return { id: index + 1, ...user };
                })}
                getRowId={(user) => user._id}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                localeText={faIR.components.MuiDataGrid.defaultProps.localeText}
                pageSizeOptions={[5, 10, 25, 100, 200]}
              />
            ) : (
              <Alert severity="info">هیچ کاربری تاکنون ثبت نگردیده است</Alert>
            )}
          </div>
        </>
      )}

      {/* Modals */}
      <DetailsModal>{showCommentDetails.commentBody}</DetailsModal>
      <EditModal>
        <RtlProvider>
          <form
            onSubmit={(event) => updateCommentHandler(event)}
            className="relative z-20"
          >
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

export default UsersTable;
