import React, { useEffect, useState } from "react";
import HomeStatistics from "../../Components/HomeStatistics/HomeStatistics";
import Chart from "../../Components/common/Chart/Chart";
import useFetch from "../../Hooks/useFetch";
import { Box } from "@mui/material";
import { useProducts } from "../../Contexts/ProductsContext";
import PieChartCommon from "../../Components/common/PieChartCommon/PieChartCommon";
import useTitle from "../../Hooks/useTitle";

function HomePage() {
  const pageTitle = useTitle("نمای کلی")
  const {datas : yearlyIncome} = useFetch("yearlyIncome/all", "")
  const { datas: products } = useFetch("products/all", "");

  const [data , setData] = useState([])
   useEffect(() => {
        products.map(({productTitle , sale}) => {
          return(
            setData((data) => [...data , {productTitle , sale}])
          )
        })
   }, [products])
   console.log(data)

  return (
    <>
     <HomeStatistics />
     <Box className="mt-16">
     <Chart grid title="فروش ماهانه" key={yearlyIncome._id} data={yearlyIncome} dataKey="sale" />
     </Box>
     <PieChartCommon title="فروش هر محصول"  data={data} dataKey="sale"  />
    </>
  );
}

export default HomePage;
