import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import InputField from '../../shared/InputField';
import { Button } from '@mui/material';
import Spinners from '../../shared/Spinners.jsx';
import SelectTextField from '../../shared/SelectedTextField.jsx';

const AddProductForm = ({ setOpen, product, update = false, onSubmit, loader }) => {
  const [selectedCategory, setSelectedCategory] = useState({ categoryName: "Electronics" });

  // Dummy categories
  const dummyCategories = [
    { categoryId: 1, categoryName: "Electronics" },
    { categoryId: 2, categoryName: "Audio" },
    { categoryId: 3, categoryName: "Wearables" },
    { categoryId: 4, categoryName: "Gaming" },
    { categoryId: 5, categoryName: "Photography" }
  ];

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    mode: "onTouched"
  });

  const saveProductHandler = (data) => {
    onSubmit(data);
  };

  useEffect(() => {
    if (update && product) {
      setValue("productName", product?.productName);
      setValue("price", product?.price);
      setValue("quantity", product?.quantity);
      setValue("discount", product?.discount);
      setValue("specialPrice", product?.specialPrice);
      setValue("description", product?.description);
    }
  }, [update, product, setValue]);

  return (
    <div className='py-5 relative h-full'>
      <form className='space-y-4' onSubmit={handleSubmit(saveProductHandler)}>
        <div className='flex md:flex-row flex-col gap-4 w-full'>
          <InputField 
            label="Product Name"
            required
            id="productName"
            type="text"
            message="This field is required*"
            register={register}
            placeholder="Product Name"
            errors={errors}
          />

          {!update && (
            <SelectTextField
              label="Select Categories"
              select={selectedCategory}
              setSelect={setSelectedCategory}
              lists={dummyCategories}
            />
          )}
        </div>

        <div className='flex md:flex-row flex-col gap-4 w-full'>
          <InputField 
            label="Price"
            required
            id="price"
            type="number"
            message="This field is required*"
            placeholder="Product Price"
            register={register}
            errors={errors}
          />

          <InputField 
            label="Quantity"
            required
            id="quantity"
            type="number"
            message="This field is required*"
            register={register}
            placeholder="Product Quantity"
            errors={errors}
          />
        </div>

        <div className="flex md:flex-row flex-col gap-4 w-full">
          <InputField
            label="Discount"
            id="discount"
            type="number"
            message="This field is required*"
            placeholder="Product Discount"
            register={register}
            errors={errors}
          />
          <InputField
            label="Special Price"
            id="specialPrice"
            type="number"
            message="This field is required*"
            placeholder="Special Price"
            register={register}
            errors={errors}
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor='desc' className='font-semibold text-sm text-slate-800'>
            Description
          </label>
          <textarea
            rows={5}
            placeholder="Add product description...."
            className={`px-4 py-2 w-full border outline-hidden bg-transparent text-slate-800 rounded-md ${
              errors["description"]?.message ? "border-red-500" : "border-slate-700" 
            }`}
            maxLength={255}
            {...register("description", {
              required: {value: true, message:"Description is required"},
            })}
          />
          {errors["description"]?.message && (
            <p className="text-sm font-semibold text-red-600 mt-0">
              {errors["description"]?.message}
            </p>
          )}
        </div>

        <div className='flex w-full justify-between items-center absolute bottom-14'>
          <Button 
            disabled={loader}
            onClick={() => setOpen(false)}
            variant='outlined'
            className='text-white py-[10px] px-4 text-sm font-medium'>
            Cancel
          </Button>

          <Button
            disabled={loader}
            type='submit'
            variant='contained'
            color='primary'
            className='bg-custom-blue text-white py-[10px] px-4 text-sm font-medium'>
            {loader ? (
              <div className='flex gap-2 items-center'>
                <Spinners /> Loading...
              </div>
            ) : (
              update ? "Update" : "Save"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AddProductForm