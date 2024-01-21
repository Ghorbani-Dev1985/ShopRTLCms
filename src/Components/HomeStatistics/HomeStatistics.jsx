import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Toman from '../../assets/Images/svgs/toman-black.svg'
import useFetch from '../../Hooks/useFetch';
import { LocalShipping, MonetizationOn, Payment, ShowChart } from '@mui/icons-material';

function HomeStatistics() {
    const {datas : homeStatistics} = useFetch("homeStatistics/all", "")

   console.log(homeStatistics)
    return (
        <Box className="grid grid-cols-1 md:grid-cols-4 gap-12">
        {
          homeStatistics.map(({totalPrice , totalSale , totalShipping , totalIncome , pricePercent ,salePercent ,shippingPercent , incomePercent}) => {
            return(
              <>
              <HomeStatistic icon={<MonetizationOn />} title="قیمت" number={totalPrice} percent={pricePercent} />
              <HomeStatistic icon={<ShowChart />} title="فروش" number={totalSale} percent={salePercent} />
              <HomeStatistic icon={<Payment />} title="درآمد" number={totalIncome} percent={incomePercent} />
              <HomeStatistic icon={<LocalShipping />} title="هزینه ارسال" number={totalShipping} percent={shippingPercent} />
              </>
            )
          })
        }
    </Box>
  )
}

export default HomeStatistics


const HomeStatistic = ({icon,  title , number , percent  }) => {
  console.log( number)
    return(
      <Box className="bg-emerald-50/50 shadow-round rounded-3xl p-2 relative">
        <p className='absolute flex-center text-white bg-orange-400 size-12 rounded-full left-3 -top-6'>{icon}</p>
      <p className='font-MorabbaBold text-xl text-zinc-700 mb-2'>{title}</p>
      <Box className="w-full flex-between my-3">
       <span className='flex items-center font-DanaBold dir-ltr'>  
       {percent}
        {
            +percent > 0 ?  <ArrowUpwardIcon className='text-emerald-500'/> : <ArrowDownwardIcon className='text-rose-500'/>
        }
       </span>
       <span className='flex-center gap-1 font-DanaBold text-xl'> {number} <img src={Toman} alt='ghorbani-dev.ir' className='size-5' /></span>
      </Box>
      <p className='text-gray-400 text-center'>مقایسه با ماه گذشته</p>
      </Box>
    )
}

export {HomeStatistic}