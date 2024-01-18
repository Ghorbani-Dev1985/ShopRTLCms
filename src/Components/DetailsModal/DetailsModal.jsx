import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useDetailsModal } from '../../Contexts/DetailsModalContext';
import { Close } from '@mui/icons-material';



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function DetailsModal() {
    const {showDetailsModal , setShowDetailsModal} = useDetailsModal()
    console.log(showDetailsModal)
  return (
    <Dialog
    open={showDetailsModal}
    TransitionComponent={Transition}
    keepMounted
    onClose={() => setShowDetailsModal(false)}
    aria-describedby="alert-dialog-slide-description"
  >
    <DialogTitle className='flex-between bg-slate-100 mb-6'>
            <p className='flex flex-1 justify-center font-DanaBold'>مشاهده جزییات محصول</p>
           <p onClick={() => setShowDetailsModal(false)} className='text-rose-500 cursor-pointer'><Close /></p> 
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-slide-description">
        Let Google help apps determine location. This means sending anonymous
        location data to Google, even when no apps are running.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
     
    </DialogActions>
  </Dialog>
  )
}

export default DetailsModal
