import React, { useEffect } from 'react'
import InputField from '../shared/InputField';
import { useForm } from 'react-hook-form';
import { FaAddressCard } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Spinners from '../shared/Spinners';
import toast from 'react-hot-toast';

const AddAddressForm = () => {
    const dispatch = useDispatch();
    const { btnLoader } = useSelector((state) => state.errors);

    const {
            register,
            handleSubmit,
            reset,
            setValue,
            formState: {errors},
        } = useForm({
            mode: "onTouched",
        });

        const onSaveAddressHandler = async (data) => {
            console.log("Done");
        }


  return (
    <div className="">


      <form className="" onSubmit={handleSubmit(onSaveAddressHandler)}>


        <div className="flex justify-center items-center mb-4 font-semibold text-2xl text-slate-800 py-2 px-4">
          <FaAddressCard className="mr-2 text-2xl" />
          <span>Add Address</span>
        </div>

         <div className="flex flex-col gap-4">
                <InputField
                    label="Building Name"
                    required
                    id="buildingName"
                    type="text"
                    message="*Building Name is required"
                    placeholder="Enter Building Name"
                    register={register}
                    errors={errors}
                    />

                <InputField
                    label="City"
                    required
                    id="city"
                    type="text"
                    message="*City is required"
                    placeholder="Enter City"
                    register={register}
                    errors={errors}
                    />

                <InputField
                    label="State"
                    required
                    id="state"
                    type="text"
                    message="*State is required"
                    placeholder="Enter State"
                    register={register}
                    errors={errors}
                    />

                <InputField
                    label="Pincode"
                    required
                    id="pincode"
                    type="text"
                    message="*Pincode is required"
                    placeholder="Enter Pincode"
                    register={register}
                    errors={errors}
                    />    
                <InputField
                    label="Street"
                    required
                    id="street"
                    type="text"
                    message="*Street is required"
                    placeholder="Enter Street"
                    register={register}
                    errors={errors}
                    />   

                <InputField
                    label="Country"
                    required
                    id="country"
                    type="text"
                    message="*Country is required"
                    placeholder="Enter Country"
                    register={register}
                    errors={errors}
                    />        
            </div>

        <button 
          disabled={btnLoader} 
          className={`bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex gap-2 items-center justify-center font-semibold text-white w-full py-3 mt-7 rounded-lg shadow-md hover:scale-[1.03] transition-transform duration-150 ${btnLoader ? "opacity-60 cursor-not-allowed" : "hover:brightness-90"}`}
          type="submit"
        >
          {btnLoader ? (
            <>
              <Spinners /> Loading...
            </>
          ) : (
            <>Add Address</> 
          )}
        </button>
      </form>
    </div>
  );
};

export default AddAddressForm;
