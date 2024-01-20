import React from 'react'
import ComponentsTitle from '../../Components/common/ComponentTitle/ComponentsTitle'
import CommentsTable from '../../Components/CommentsTable/CommentsTable'

function Comments() {
  return (
    <div className='space-y-5'>
       <ComponentsTitle titleText=" کامنت‌ها"/>
       <CommentsTable />
    </div>
  )
}

export default Comments
