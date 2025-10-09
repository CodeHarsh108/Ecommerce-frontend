import { Step, StepLabel, Stepper } from '@mui/material'
import React, { useState } from 'react'
import AddressInfo from './AddressInfo';

const Checkout = () => {
  const steps = ["Address", "Payment Method", "Order Summary", "Payment" ];
  const [activeStep, setActiveStep] = useState(0); 
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
        {activeStep === 0 && <AddressInfo/>}
      </div>
    </div>
  )
}

export default Checkout;