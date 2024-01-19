import React, {useState, useEffect } from 'react'
import axios from 'axios';
import { BaseURL } from '../Utils/Utils';

function useFetch(url , endPoint , dependency) {
  const [datas , setDatas] = useState([])
  useEffect(() => {
    axios.get(`${BaseURL}${url}${endPoint ? endPoint : ''}`)
    .then(response => setDatas(response.data))
    .catch(error => {
        console.log(error)
    })
    } , [url , dependency]);
  return {datas}
}

export default useFetch
