import React from 'react'
import { Alert, AlertTitle } from '@mui/material'

const StripPayment = () => {
  return (
    <div className='h-96 flex justify-center items-center'>
            <Alert severity='warning' variant='filled' style={{maxWidth: "400px"}}>
                <AlertTitle>Stripe Unavailable</AlertTitle>
                Stripe payment gateway is currently unavailable. Please try again later or choose an alternative payment method.
            </Alert>
        </div>
  )
}

export default StripPayment