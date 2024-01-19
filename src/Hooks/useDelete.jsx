import React, {useState, useEffect } from 'react'
import axios from 'axios';
import { BaseURL } from '../Utils/Utils';
import { useShowLoading } from '../Contexts/ShowLoadingContext';
import toast from 'react-hot-toast';
import { useShowRealtimeDatas } from '../Contexts/ShowRealtimeDatasContext';

function useDelete(url , authorization) {
  const {isShowLoading , setIsShowLoading} = useShowLoading()
  const {showRealtimeDatas , setShowRealTimeDatas} = useShowRealtimeDatas()
    console.log(authorization)
     setIsShowLoading(true)
    axios.delete(`${BaseURL}${url}` , {
      headers: {
        authorization: authorization,
      },
    })
    .then(response => {
      toast.success("حذف با موفقیت انجام گردید");
      setIsShowLoading(false)
      setShowRealTimeDatas((prev) => !prev)
      console.log(showRealtimeDatas)
    })
    .catch(error => {
        console.log(error)
        toast.error("  خطا در اتصال به سرور ");
    })
  return {showRealtimeDatas}
}

export default useDelete
