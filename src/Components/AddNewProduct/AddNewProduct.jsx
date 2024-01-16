import { Box, TextField } from '@mui/material'
import React from 'react'

function AddNewProduct() {
  return (
    <div>
      <h3 className='font-DanaBold text-xl my-6'>افزودن محصول جدید</h3>
      <form>
        <Box>
        <TextField
                    value={firstName}
                    onChange={(event) => firstNameInputHandler(event)}
                    autoComplete='off'
                    label={
                      <span>
                        نام <span className="text-rose-500 text-sm">*</span>
                      </span>
                    }
                    
                    variant="outlined"
                    size="small"
                  />
        </Box>
      </form>
    </div>
  )
}

export default AddNewProduct
