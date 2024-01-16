import { Box, Divider } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import TimelineIcon from '@mui/icons-material/Timeline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import ProductionQuantityLimitsRoundedIcon from '@mui/icons-material/ProductionQuantityLimitsRounded';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import EmailIcon from '@mui/icons-material/Email';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import MessageIcon from '@mui/icons-material/Message';
import TextsmsIcon from '@mui/icons-material/Textsms';
import InsightsIcon from '@mui/icons-material/Insights';
import SummarizeIcon from '@mui/icons-material/Summarize';
import FiberNewIcon from '@mui/icons-material/FiberNew';

let DashboardLinks = [
    {
        id: 1,
        to: "/",
        linkText: "نمای کلی",
        linkIcon: <HomeIcon />,
    },
    {
        id: 2,
        to: "/d",
        linkText: " آنالیزها",
        linkIcon: <TimelineIcon />,
    },
    {
        id: 3,
        to: "/d",
        linkText: " فروش‌",
        linkIcon: <TrendingUpIcon />,
    }
]

let QuickMenuLinks = [
    {
        id: 1,
        to: "/users",
        linkText: " کاربران",
        linkIcon: <PeopleAltIcon />,
    },
    {
        id: 2,
        to: "/newUser",
        linkText: " کاربر جدید",
        linkIcon: <PersonAddAltRoundedIcon />,
    },
    {
        id: 3,
        to: "/products",
        linkText: " محصولات",
        linkIcon: <ProductionQuantityLimitsRoundedIcon />,
    },
    {
        id: 4,
        to: "/newProduct",
        linkText: " محصول جدید",
        linkIcon: <FiberNewIcon />,
    },
    {
        id: 5,
        to: "/r",
        linkText: " تراکنش‌ها",
        linkIcon: <PaidRoundedIcon />,
    }
]


let NotificationLinks = [
    {
        id: 1,
        to: "/s",
        linkText: " ایمیل",
        linkIcon: <EmailIcon />,
    },
    {
        id: 2,
        to: "/d",
        linkText: "  بازخورد",
        linkIcon: <DynamicFeedIcon />,
    },
    {
        id: 3,
        to: "/d",
        linkText: " پیام ها",
        linkIcon: <MessageIcon />,
    },
]

let StaffLinks = [
    {
        id: 1,
        to: "/s",
        linkText: " پیام‌ها",
        linkIcon: <TextsmsIcon />,
    },
    {
        id: 2,
        to: "/d",
        linkText: "  تحلیل‌ها",
        linkIcon: <InsightsIcon />,
    },
    {
        id: 3,
        to: "/d",
        linkText: " گزارش‌ها",
        linkIcon: <SummarizeIcon />,
    },
]
function Sidebar() {
  return (
    <aside className='sticky top-14 bg-gray-50 p-2 h-[calc(100vh-50px)] min-h-screen'>
       {/* Dashboard */}
          <NavItemSection sectionTitle="داشبورد" linkArrayName={DashboardLinks}/>
        {/* Quick Menu */}
        <NavItemSection sectionTitle="دسترسی سریع" linkArrayName={QuickMenuLinks}/>
          {/* Notifications */}
          <NavItemSection sectionTitle=" اعلان‌ها" linkArrayName={NotificationLinks}/>
          {/* Staff */}
          <NavItemSection sectionTitle=" کارکنان" linkArrayName={StaffLinks}/>
    </aside>
  )
}

export default Sidebar

const NavItemSection = ({sectionTitle , linkArrayName}) => {
    return(
     <Box className="flex flex-col gap-2">
        <p className='text-gray-300 my-3'>{sectionTitle}</p>
        {
        linkArrayName.map(({id , to , linkText , linkIcon}) => {
        return (
            <React.Fragment key={id}>
            <NavLink to={to} className={({isActive}) => ["flex items-center gap-1 w-full py-1 px-2 rounded-md" , isActive ? "bg-violet-100 font-DanaBold text-violet-500" : "bg-transparent font-Dana text-zinc-500" ].join(" ")}>
           {linkIcon}
            <span>  {linkText}</span>
        </NavLink>
            </React.Fragment>
        )
        }) 
    
        }
        <Divider />
       </Box>
    )
}

export {NavItemSection};