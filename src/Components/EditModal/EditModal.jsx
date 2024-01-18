import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useEditModal } from '../../Contexts/EditModalContext';
import { Close } from '@mui/icons-material';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function EditModal({children}) {
    const {showEditModal , setShowEditModal} = useEditModal()
  return (
    <Dialog
    open={showEditModal}
    TransitionComponent={Transition}
    keepMounted
    onClose={() => setShowEditModal(false)}
    aria-describedby="alert-dialog-slide-description"
  >
    <DialogTitle className='flex-between bg-slate-100 mb-6'>
            <p className='flex flex-1 justify-center font-DanaBold'> ویرایش </p>
           <p onClick={() => setShowEditModal(false)} className='text-rose-500 cursor-pointer flex-center'><Close /></p> 
    </DialogTitle>
    <DialogContent>
       {children}
    </DialogContent>
  </Dialog>
  )
}

export default EditModal
