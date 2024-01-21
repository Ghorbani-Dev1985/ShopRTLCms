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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function UsersTable() {
  const pageTitle = useTitle("کاربر‌ها");
  const { showDetailsModal, setShowDetailsModal } = useDetailsModal();
  const { showEditModal, setShowEditModal } = useEditModal();
  const { showRealtimeDatas, setShowRealTimeDatas } = useShowRealtimeDatas();
  const { isShowLoading, setIsShowLoading } = useShowLoading();
  const [showUserDetails, setShowUserDetails] = useState({});
  const [updateUserID, setUpdateUserID] = useState("")
  const [firstName , setFirstName] = useState("")
  const [lastName , setLastName] = useState("")
  const [userName , setUserName] = useState("")
  const [password , setPassword] = useState("")
  const [phoneNumber , setPhoneNumber] = useState("")
  const [city , setCity] = useState("")
  const [email , setEmail] = useState("")
  const [address , setAddress] = useState("")
  const [score , setScore] = useState("")
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
      renderCell: (user) => {
        return (
          <Button
            onClick={() => {
              setShowDetailsModal(true);
              setShowUserDetails(user.row);
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
      renderCell: (user) => {
        return (
          <div
            onClick={() => {
              setShowEditModal(true);
              setUpdateUserID(user.id);
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
      renderCell: (user) => {
        return (
          <div
            onClick={() => {
              deleteUserHandler(user.id);
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
      setFirstName(filterUpdateUser.firstName)
      setLastName(filterUpdateUser.lastName)
      setUserName(filterUpdateUser.userName)
      setPassword(filterUpdateUser.password)
      setPhoneNumber(filterUpdateUser.phoneNumber)
      setCity(filterUpdateUser.city)
      setEmail(filterUpdateUser.email)
      setAddress(filterUpdateUser.address)
      setScore(filterUpdateUser.score)
    }
  }, [updateUserID]);

  const updateUserHandler = (event) => {
    event.preventDefault();

    if (firstName && lastName && userName && password && phoneNumber && city && email && address && score) {
      let updateUserInfo = { 
        firstName,
        lastName,
        userName,
        password,
        phoneNumber,
        city,
        email,
        address,
        score 
      };
      const Update = useUpdate("users/update", updateUserInfo, updateUserID );
      setShowRealTimeDatas((prev) => !prev);
      setShowEditModal(false);
      setFirstName("")
      setLastName("")
      setUserName("")
      setPassword("")
      setPhoneNumber("")
      setCity("")
      setEmail("")
      setAddress("")
      setScore("")
    } else {
      toast.error("لطفا فرم را تکمیل نمایید");
    }
  };
  const deleteUserHandler = (userID) => {
    Swal.fire({
      title: "برای حذف کاربر مطمعن هستید؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f43f5e",
      cancelButtonColor: "#0ea5e9",
      confirmButtonText: "تایید",
      cancelButtonText: "انصراف",
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteHook = useDelete("users/delete", userID);
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
      <DetailsModal>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 1 , borderColor: "#e7e7e7" } }}>
            <TableCell align="center">شهر</TableCell>
            <TableCell align="center">آدرس</TableCell>
            <TableCell align="center">امتیاز </TableCell>
            <TableCell align="center">خرید(تومان) </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 1 , borderColor: "#e7e7e7" } }}
            >
              <TableCell align="center">{showUserDetails.city}</TableCell>
              <TableCell align="center">{showUserDetails.address}</TableCell>
              <TableCell align="center">{showUserDetails.score}</TableCell>
              <TableCell align="center">{showUserDetails.buy && showUserDetails.buy.toLocaleString()}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
      </DetailsModal>
      <EditModal>
        <RtlProvider>
          <form
            onSubmit={(event) => updateUserHandler(event)}
            className="relative z-20"
          >
            <Box className="flex flex-wrap justify-between gap-5">
              <TextField
                autoComplete="off"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                label={
                  <span>
                     نام <span className="text-rose-500 text-sm">*</span>
                  </span>
                }
                variant="outlined"
                size="small"
              />
               <TextField
                autoComplete="off"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                label={
                  <span>
                     نام خانوادگی <span className="text-rose-500 text-sm">*</span>
                  </span>
                }
                variant="outlined"
                size="small"
              />
               <TextField
                autoComplete="off"
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
                label={
                  <span>
                     نام کاربری <span className="text-rose-500 text-sm">*</span>
                  </span>
                }
                variant="outlined"
                size="small"
              />
               <TextField
                autoComplete="off"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                label={
                  <span>
                     کلمه عبور <span className="text-rose-500 text-sm">*</span>
                  </span>
                }
                variant="outlined"
                size="small"
              />
               <TextField
                autoComplete="off"
                value={phoneNumber}
                type="number"
                onChange={(event) => setPhoneNumber(event.target.value)}
                label={
                  <span>
                     تلفن همراه <span className="text-rose-500 text-sm">*</span>
                  </span>
                }
                variant="outlined"
                size="small"
              />
               <TextField
                autoComplete="off"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                label={
                  <span>
                    شهر <span className="text-rose-500 text-sm">*</span>
                  </span>
                }
                variant="outlined"
                size="small"
              />
                <TextField
                autoComplete="off"
                multiline
                rows={3}
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                className="w-full"
                label={
                  <span>
                    آدرس <span className="text-rose-500 text-sm">*</span>
                  </span>
                }
                variant="outlined"
                size="small"
              />
               <TextField
                autoComplete="off"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                label={
                  <span>
                     ایمیل <span className="text-rose-500 text-sm">*</span>
                  </span>
                }
                variant="outlined"
                size="small"
              />
               <TextField
                autoComplete="off"
                type="number"
                value={score}
                onChange={(event) => setScore(event.target.value)}
                label={
                  <span>
                     امتیاز <span className="text-rose-500 text-sm">*</span>
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
