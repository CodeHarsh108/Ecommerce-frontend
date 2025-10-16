import { Step, StepLabel, Stepper } from '@mui/material'
import React, { act, use, useEffect, useState } from 'react'
import AddressInfo from './AddressInfo';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAddresses } from '../../store/actions';
import { Button } from '@mui/material';
import toast from 'react-hot-toast';
import Skeleton from '../shared/Skeleton';


const Checkout = () => {
  const steps = ["Address", "Payment Method", "Order Summary", "Payment" ];

  const [activeStep, setActiveStep] = useState(0); 

  const { isLoading, errorMessage } = useSelector((state) => state.errors);

  const {address, selectedUserCheckoutAddress} = useSelector((state) => state.auth);

  const paymentMethod = false;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAddresses());
  }, [dispatch]);



  const handleBack = () => {
    if(activeStep === 0) return;
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = () => {
        if(activeStep === 0 && !selectedUserCheckoutAddress) {
            toast.error("Please select checkout address before proceeding.");
            return;
        }

        if(activeStep === 1 && (!selectedUserCheckoutAddress || !paymentMethod)) {
            toast.error("Please select payment address before proceeding.");
            return;
        }
        
        setActiveStep((prevStep) => prevStep + 1);
    };


  return (
    <div className='py-14 min-h-[calc(100vh-100px)]'>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {isLoading ? (
        <div className='lg:w-[80%] mx-auto py-5'>
          <Skeleton/>
        </div>
      ) : (
        <div className='mt-10'>
        {activeStep === 0 && <AddressInfo address={address}/>}
      </div>

      )}

      

      <div className='flex justify-between items-center px-4 fixed z-50 h-17 bottom-0 bg-white left-0 w-full py-4 border-slate-200' style={{boxShadow: "0 -2px 4px rgba(100, 100, 100, 0.15 )"}}>
      <Button variant="outlined" disabled={activeStep === 0} onClick={handleBack} >Back</Button>  
      {activeStep !== steps.length - 1 && (
        <button disabled={
          errorMessage || (
            (activeStep === 0 ? !selectedUserCheckoutAddress : activeStep === 1 ? !paymentMethod : false)
          )
        }
        className={`bg-custom-blue font-semibold px-6 h-10 rounded-md text-white ${errorMessage || (activeStep === 0 && !selectedUserCheckoutAddress) || (activeStep === 1 && !paymentMethod) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600' }`}
        onClick={handleNext}
        >
          Proceed
        </button>
      )}
      </div>
      
    </div>
  )
}

export default Checkout;