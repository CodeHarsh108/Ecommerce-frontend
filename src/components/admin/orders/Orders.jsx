import React from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import OrderTable from './OrderTable';
import { useSelector } from 'react-redux';
import useOrderFilter from '../../../hooks/useOrderFilter';

const Orders = () => {
  const { adminOrder, pagination } = useSelector((state) => state.order);

  useOrderFilter();

  const emptyOrder = !adminOrder || adminOrder.length === 0;
  
  return (
    <div className='pb-6 pt-6'> {/* Reduced top padding */}
        {emptyOrder ? (
            <div className='flex flex-col items-center justify-center text-gray-600 py-10'>
                <FaShoppingCart size={50} className='mb-3'/>
                <h2 className='text-2xl font-semibold'>No Orders Placed Yet</h2>
                <p className='text-gray-500 mt-2'>Orders will appear here when customers place them.</p>
            </div>
        ) : (
           <OrderTable adminOrder={adminOrder} pagination={pagination}/>
        )}
        
        {/* Demo notice */}
        <div className='mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg'>
            <div className='flex items-center'>
                <div className='flex-shrink-0'>
                    <span className='text-blue-500'>💡</span>
                </div>
                <div className='ml-3'>
                    <h3 className='text-sm font-medium text-blue-800'>
                        Demo Mode Active
                    </h3>
                    <div className='mt-1 text-sm text-blue-700'>
                        <p>
                            Currently displaying sample order data. Real orders will appear when backend connectivity is established.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Orders