import React from 'react'
import Skeleton from '../shared/Skeleton';
import { FaAddressBook } from 'react-icons/fa';

const AddressInfo = () => {
    const noAddressExist = true;
    const isLoading = false;
  return (
    <div className='pt-4'>
        {noAddressExist ? (
            <div className='p-6 rounded-lg max-w-md mx-auto flex flex-col items-center justify-center gap-6'>
                <FaAddressBook size={50} className='text-gray-500 mb-4 '/>
                <h1 className='text-slate-900 mb-2 text-center font-semibold text-2xl'>No Address Selected Yet!!</h1>
                <p className='mb-6 text-slate-800 text-center'>Please Add Your Address To Complete The Purchase</p>

            </div>
        ) : (
            <div className='relative p-6 rounded-lg max-w-md mx-auto'>
                <h1 className='text-slate-800 text-center font-bold text-2xl'>Select Address</h1>
                {isLoading ? (
                    <div className='py-4 px-8'>
                        <Skeleton/>
                    </div>
                ) : (
                    <div className='mt-6 space-y-4'>
                        <p>Address List here</p>
                    </div>
                )}
            </div>
        )}
    </div>
  )
}

export default AddressInfo;