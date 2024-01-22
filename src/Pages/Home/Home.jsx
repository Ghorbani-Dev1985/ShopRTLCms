import React, { useEffect, useState } from "react";
import HomeStatistics from "../../Components/HomeStatistics/HomeStatistics";
import Chart from "../../Components/common/Chart/Chart";

function HomePage() {
  // const [xAxiosData , setXAxiosData] = useState([])
  // useEffect(() => {
  // axios
  // .get(`${BaseURL}xAxiosData/all`)
  // .then(response => setXAxiosData(response.data))
  // } , []);
  return (
    <>
     <HomeStatistics />
     <Chart grid title="فروش ماهانه" key={xAxiosData} data={xAxiosData} dataKey="sale" />
    </>
  );
}

export default HomePage;
