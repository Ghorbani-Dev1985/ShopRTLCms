import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { BaseURL } from '../Utils/Utils';

function useFetch(url , endPoint , dependency) {
  const [datas , setDatas] = useState([])
  console.log(dependency)
  useEffect(() => {
    axios.get(`${BaseURL}${url}${endPoint ? endPoint : ''}`)
    .then(response => setDatas(response.data))
    .catch(error => {
        console.log(error)
    })
    } , [url , dependency]);
  return {datas }
}

export default useFetch
