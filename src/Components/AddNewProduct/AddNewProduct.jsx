import { Alert, Box, Button, TextField } from "@mui/material";
import React from "react";
import RtlProvider from "../common/RtlProvider/RtlProvider";
import { DoneAll } from "@mui/icons-material";

function AddNewProduct() {
  return (
    <div className="space-y-9">
        <RtlProvider>
          <fieldset className="border border-gray-200 rounded-lg p-3">
            <legend className="font-DanaBold text-xl my-6 mx-10 px-3">افزودن محصول جدید</legend>
      <form>
          <Box className="flex flex-wrap justify-between gap-5 child:w-49p">
            <TextField
              autoComplete="off"
              label={
                <span>
                  نام محصول <span className="text-rose-500 text-sm">*</span>
                </span>
              }
              variant="outlined"
              size="small"
            />
            <TextField
              autoComplete="off"
              type="number"
              label={
                <span>
                  قیمت <span className="text-rose-500 text-sm">*</span>
                </span>
              }
              variant="outlined"
              size="small"
            />
            <TextField
              autoComplete="off"
              type="number"
              label={
                <span>
                  موجودی <span className="text-rose-500 text-sm">*</span>
                </span>
              }
              variant="outlined"
              size="small"
            />
            <TextField
              autoComplete="off"
              label={
                <span>
                  لینک عکس <span className="text-rose-500 text-sm">*</span>
                </span>
              }
              variant="outlined"
              size="small"
            />
            <TextField
              autoComplete="off"
              type="number"
              label={
                <span>
                  میزان محبوبیت <span className="text-rose-500 text-sm">*</span>
                </span>
              }
              variant="outlined"
              size="small"
            />
            <TextField
              autoComplete="off"
              type="number"
              label={
                <span>
                  میزان فروش <span className="text-rose-500 text-sm">*</span>
                </span>
              }
              variant="outlined"
              size="small"
            />
            <TextField
              autoComplete="off"
              type="number"
              label={
                <span>
                  تعداد رنگ بندی
                  <span className="text-rose-500 text-sm">*</span>
                </span>
              }
              variant="outlined"
              size="small"
            />
          </Box>
            <Box className="w-full flex justify-end items-center my-4">
              <Button variant="contained" startIcon={<DoneAll />}>
                ثبت محصول
              </Button>
            </Box>
      </form>
      </fieldset>
        </RtlProvider>
        <Alert severity="info">هیچ محصولی تاکنون تعریف نگردیده است</Alert>
    </div>
  );
}

export default AddNewProduct;
