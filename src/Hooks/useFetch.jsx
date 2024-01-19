import React, {useState, useEffect } from 'react'
import axios from 'axios';
import { BaseURL } from '../Utils/Utils';
import { useShowLoading } from '../Contexts/ShowLoadingContext';
import toast from 'react-hot-toast';

function useFetch(url , endPoint , dependency) {
  const [datas , setDatas] = useState([])
  const {isShowLoading , setIsShowLoading} = useShowLoading()
  useEffect(() => {
     setIsShowLoading(true)
    axios.get(`${BaseURL}${url}${endPoint ? endPoint : ''}`)
    .then(response => {
      setDatas(response.data)
      setIsShowLoading(false)
    })
    .catch(error => {
        console.log(error)
        toast.error("  خطا در اتصال به سرور ");
    })
    } , [url , dependency]);
  return {datas}
}

export default useFetch
