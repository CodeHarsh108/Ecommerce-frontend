import React from 'react'
import { formatPriceCalculation } from '../../utils/formatPrice'

const OrderSummary = ({ totalPrice, cart, address, paymentMethod }) => {
  if (!cart || cart.length === 0) {
    return (
      <div className="container mx-auto px-4 mb-8">
        <div className="text-center py-8">
          <h2 className="text-2xl font-semibold text-gray-600">No items in cart</h2>
        </div>
      </div>
    );
  }

  if (!address) {
    return (
      <div className="container mx-auto px-4 mb-8">
        <div className="text-center py-8">
          <h2 className="text-2xl font-semibold text-gray-600">No address selected</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mb-8">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 pr-4">
          <div className="space-y-4">
            <div className="p-4 border rounded-lg shadow-xs">
              <h2 className='text-2xl font-semibold mb-2'>Billing Address</h2>
              <p>
                <strong>Building Name: </strong>
                {address?.buildingName || 'N/A'}
              </p>
              <p>
                <strong>City: </strong>
                {address?.city || 'N/A'}
              </p>
              <p>
                <strong>Street: </strong>
                {address?.street || 'N/A'}
              </p>
              <p>
                <strong>State: </strong>
                {address?.state || 'N/A'}
              </p>
              <p>
                <strong>Pincode: </strong>
                {address?.pincode || 'N/A'}
              </p>
              <p>
                <strong>Country: </strong>
                {address?.country || 'N/A'}
              </p>
            </div>
            
            <div className='p-4 border rounded-lg shadow-xs'>
              <h2 className='text-2xl font-semibold mb-2'>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {paymentMethod || 'Not selected'}
              </p>
            </div>

            <div className='pb-4 border rounded-lg shadow-xs mb-6'>
              <h2 className='text-2xl font-semibold mb-2'>Order Items</h2>
              <div className='space-y-2'>
                {cart.map((item) => (
                  <div key={item?.productId} className='flex items-center gap-3 p-2 border-b'>
                    <img 
                      src={`http://localhost:8080/images/${item?.image}`}
                      alt='Product'
                      className='w-12 h-12 rounded-sm object-cover'
                    />
                    <div className='text-gray-500 flex-1'>
                      <p className="font-medium">{item?.productName}</p>
                      <p>
                        {item?.quantity} x ${item?.specialPrice} = $
                        {formatPriceCalculation(item?.quantity, item?.specialPrice)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-4/12 mt-4 lg:mt-0">
          <div className="border rounded-lg shadow-xs p-4 space-y-4">
            <h2 className="text-2xl font-semibold mb-2">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Products</span>
                <span>${formatPriceCalculation(totalPrice, 1)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (0%)</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t pt-2">
                <span>SubTotal</span>
                <span>${formatPriceCalculation(totalPrice, 1)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary