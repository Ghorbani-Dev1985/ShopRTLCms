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
        to: "/d",
        linkText: " محصولات",
        linkIcon: <Inventory />,
    },
    {
        id: 3,
        to: "/d",
        linkText: " کامنت‌ها",
        linkIcon: <Comment />,
    },
    {
        id: 4,
        to: "/d",
        linkText: " کاربر‌ها",
        linkIcon: <People />,
    },
    {
        id: 5,
        to: "/d",
        linkText: " سفارش‌ها",
        linkIcon: <AddShoppingCart />,
    },
    {
        id: 6,
        to: "/d",
        linkText: " تخفیف‌ها",
        linkIcon: <Percent />,
    }
]





function Sidebar() {
  return (
    <aside className='sticky top-14 py-4 h-[calc(100vh-50px)] min-h-screen'>
     <Box className="flex flex-col gap-4">
        {
        SidebarMenuItems.map(({id , to , linkText , linkIcon}) => {
        return (
            <React.Fragment key={id}>
            <NavLink to={to} className={({isActive}) => ["flex items-center gap-1 w-full py-1 px-2" , isActive ? "border-r-4 border-0 border-r-white border-solid font-DanaBold" : "bg-transparent font-Dana text-zinc-500" ].join(" ")}>
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
