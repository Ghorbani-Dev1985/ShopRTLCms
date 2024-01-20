import { Box, Button, TextField } from "@mui/material";
import React, { useEffect } from "react";
import RtlProvider from "../common/RtlProvider/RtlProvider";
import { DoneAll } from "@mui/icons-material";
import { useProducts } from "../../Contexts/ProductsContext";
import toast from "react-hot-toast";
import useInsert from "../../Hooks/useInsert";
import { useShowRealtimeDatas } from "../../Contexts/ShowRealtimeDatasContext";
import { useEditModal } from "../../Contexts/EditModalContext";

function AddNewProduct() {
  const { productTitle , setProductTitle , productDesc , setProductDesc , productImg , setProductImg , price , setPrice , count , setCount , popularity , setPopularity , sale , setSale , colors , setColors , productUrl , setProductUrl } = useProducts()
  const {showRealtimeDatas , setShowRealTimeDatas} = useShowRealtimeDatas()
  const {showEditModal, setShowEditModal } = useEditModal();
  const insertNewProductHandler = (event) => {
    event.preventDefault()
    if(productTitle && productDesc && productImg && price && count && popularity && sale && colors && productUrl){
      let newProductInfos = {
        productTitle,
        productDesc,
        productImg,
        price,
        count,
        popularity,
        sale,
        colors,
        productUrl
      }
        const insert = useInsert("products/newProduct" , newProductInfos)
        setShowRealTimeDatas(true)
        setProductTitle("")
        setProductDesc("")
        setProductImg("")
        setPrice("")
        setPopularity("")
        setCount("")
        setSale("")
        setColors("")
        setProductUrl("")

    }else{
       toast.error("لطفا فرم را تکمیل نمایید")
    }
  }
  useEffect(() => {
     if(!showEditModal){
      setProductTitle("")
        setProductDesc("")
        setProductImg("")
        setPrice("")
        setPopularity("")
        setCount("")
        setSale("")
        setColors("")
        setProductUrl("")
     }
  } , [showEditModal])
  return (
    <>
    {
      !showEditModal && <RtlProvider>
          <fieldset className="border border-gray-200 rounded-lg p-3">
            <legend className="font-DanaBold text-xl my-6 mx-10 px-3">افزودن محصول جدید</legend>
      <form onSubmit={(event) => insertNewProductHandler(event)}>
          <Box className="flex flex-wrap justify-between gap-5 child:w-48p">
          <TextField
              autoComplete="off"
               value={productTitle}
                onChange={(event) => setProductTitle(event.target.value)}
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
              value={productDesc}
                onChange={(event) => setProductDesc(event.target.value)}
              label={
                <span>
                  توضیح محصول <span className="text-rose-500 text-sm">*</span>
                </span>
              }
              variant="outlined"
              size="small"
            />
            <TextField
              autoComplete="off"
              value={price}
                onChange={(event) => setPrice(event.target.value)}
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
              value={count}
                onChange={(event) => setCount(event.target.value)}
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
              value={productImg}
                onChange={(event) => setProductImg(event.target.value)}
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
              value={popularity}
                onChange={(event) => setPopularity(event.target.value)}
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
              value={sale}
                onChange={(event) => setSale(event.target.value)}
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
              value={colors}
                onChange={(event) => setColors(event.target.value)}
              label={
                <span>
                  تعداد رنگ بندی
                  <span className="text-rose-500 text-sm">*</span>
                </span>
              }
              variant="outlined"
              size="small"
            />
             <TextField
              autoComplete="off"
              value={productUrl}
                onChange={(event) => setProductUrl(event.target.value)}
              label={
                <span>
                    لینک محصول
                  <span className="text-rose-500 text-sm">*</span>
                </span>
              }
              variant="outlined"
              size="small"
            />
          </Box>
            <Box className="w-full flex justify-end items-center my-4">
              <Button type="submit" variant="contained" startIcon={<DoneAll />}>
                ثبت محصول
              </Button>
            </Box>
      </form>
      </fieldset>
        </RtlProvider>
    }
        
    </>
  );
}

export default AddNewProduct;
