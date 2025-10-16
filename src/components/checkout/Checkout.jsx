import { Step, StepLabel, Stepper } from '@mui/material'
import React, { use, useEffect, useState } from 'react'
import AddressInfo from './AddressInfo';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAddresses } from '../../store/actions';

const Checkout = () => {
  const steps = ["Address", "Payment Method", "Order Summary", "Payment" ];

  const [activeStep, setActiveStep] = useState(0); 

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAddresses());
  }, [dispatch]);


  const { address } = useSelector((state) => state.auth);


  return (
    <div className='py-14 min-h-[calc(100vh-100px)]'>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div className='mt-10'>
        {activeStep === 0 && <AddressInfo address={address}/>}
      </div>
    </div>
  )
}

export default Checkout;