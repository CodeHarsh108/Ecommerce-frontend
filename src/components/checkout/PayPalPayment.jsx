import { Alert, AlertTitle } from '@mui/material'
import React from 'react'

const PayPalPayment = () => {
  return (
    <div className='h-96 flex justify-center items-center'>
        <Alert severity='warning' variant='filled' style={{maxWidth: "400px"}}>
            <AlertTitle>PayPal Unavailable</AlertTitle>
            PayPal payment gateway is currently unavailable. Please try again later or choose an alternative payment method.
        </Alert>
    </div>
  )
}

export default PayPalPayment