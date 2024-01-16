import { Box, Divider } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { AddShoppingCart, Home, Inventory, People, Comment ,  Percent } from '@mui/icons-material';

let SidebarMenuItems = [
    {
        id: 1,
        to: "/",
        linkText: "نمای کلی",
        linkIcon: <Home />,
    },
    {
        id: 2,
        to: "/products",
        linkText: " محصولات",
        linkIcon: <Inventory />,
    },
    {
        id: 3,
        to: "/comments",
        linkText: " کامنت‌ها",
        linkIcon: <Comment />,
    },
    {
        id: 4,
        to: "/users",
        linkText: " کاربر‌ها",
        linkIcon: <People />,
    },
    {
        id: 5,
        to: "/orders",
        linkText: " سفارش‌ها",
        linkIcon: <AddShoppingCart />,
    },
    {
        id: 6,
        to: "/discounts",
        linkText: " تخفیف‌ها",
        linkIcon: <Percent />,
    }
]





function Sidebar() {
  return (
    <aside className='sticky top-14 py-4 h-[calc(100vh-50px)] min-h-screen'>
     <Box className="flex flex-col gap-4">
        <Box className="flex flex-col items-center gap-5 mt-5">
            <img src='../../src/assets/Images/github.png' alt='ghorbani-dev.ir' className='object-fill rounded-3xl size-20' />
            <h1 className='text-white font-DanaBold text-xl'>محمد قربانی</h1>
            <p className='text-gray-400'>توسعه دهنده فرانت اند</p>
        </Box>
        <Divider className='border-white mx-3 mb-4'/>
        {
        SidebarMenuItems.map(({id , to , linkText , linkIcon}) => {
        return (
            <React.Fragment key={id}>
            <NavLink to={to} className={({isActive}) => ["flex items-center gap-1 w-full py-1 px-6" , isActive ? "border-r-4 border-0 border-r-white border-solid font-DanaBold" : "bg-transparent font-Dana text-zinc-500" ].join(" ")}>
           {linkIcon}
            <span>  {linkText}</span>
        </NavLink>
            </React.Fragment>
        )
        }) 
    
        }
       </Box>
    </aside>
  )
}

export default Sidebar
