import { AddBox } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Features from "../../Components/Features/Features";
import Chart from "../../Components/common/Chart/Chart";
import {BaseURL} from '../../Utils/Utils'
import NewMemberInfos from "../../Components/NewMemberInfos/NewMemberInfos";
import LastTransactions from '../../Components/LastTransactions/LastTransactions'
import axios from "axios";

function HomePage() {
  const [xAxiosData , setXAxiosData] = useState([])
  useEffect(() => {
  axios
  .get(`${BaseURL}xAxiosData/all`)
  .then(response => setXAxiosData(response.data))
  } , []);
  return (
    <>
    
     <Features />
    <Chart grid title="فروش ماهانه" key={xAxiosData} data={xAxiosData} dataKey="sale" />
    <Box className="flex justify-normal gap-4">
    <NewMemberInfos />
    <LastTransactions />
    </Box>
    </>
  );
}

export default HomePage;
