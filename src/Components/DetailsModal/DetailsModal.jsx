import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useDetailsModal } from '../../Contexts/DetailsModalContext';
import { Close } from '@mui/icons-material';
import { DataGrid , faIR} from '@mui/x-data-grid';

const columns = [
    { field: 'lastName', headerName: ' نام محصول', width: 260 },
    {
      field: 'fullName',
      headerName: 'قیمت ',
      width: 90,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'fdf',
      headerName: ' محبوبیت',
      width: 70,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
   
  ];

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function DetailsModal({rows}) {
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
    <div style={{ width: '100%' }}>
    <DataGrid
      rows={rows}
      columns={columns}
      localeText={faIR.components.MuiDataGrid.defaultProps.localeText}
      hideFooterPagination
      hideFooter
      />
  </div>
    </DialogContent>
  </Dialog>
  )
}

export default DetailsModal
