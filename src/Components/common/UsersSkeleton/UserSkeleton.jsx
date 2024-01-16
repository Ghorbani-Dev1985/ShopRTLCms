import { Avatar, Skeleton } from '@mui/material'
import React from 'react'

function UserSkeleton({listsToRender}) {
  return (
      <>
      {
        Array(listsToRender)
        .fill(1)
        .map((card, index) => (
          <React.Fragment key={index}> 
            <div className='w-full flex-center gap-1 my-1'>
            <Skeleton variant="circular">
            <Avatar />
          </Skeleton> <Skeleton animation="wave" className='w-full h-6'/>
                 </div>
            </React.Fragment>
          ))
        }
        </>
  )
}

export default UserSkeleton

