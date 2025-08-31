import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { Divider } from '@mui/material';
import { MdDone, MdClose } from 'react-icons/md';
import Status from '../shared/Status';
import React from 'react';



function ProductViewModal({ open, setOpen, product, isAvailable }) {
  const { productId, productName, image, description, quantity, price, discount, specialPrice } = product || {};

  return (
    <Dialog open={open} as="div" className="relative z-10" onClose={() => setOpen(false)}>
      <DialogBackdrop className="fixed inset-0 bg-gray-500 opacity-75 transition-opacity" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="relative w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all"
          >
            {image && (
              <div className="flex justify-center aspect-[3/2] mb-4">
                <img
                  className="w-full h-full cursor-pointer transition-transform duration-300 transform hover:scale-105"
                  src={image}
                  alt={productName}
                />
              </div>
            )}

            <div className="px-6 pt-10 pb-2">
              <DialogTitle as="h1" className="lg:text-3xl sm:text-2xl text-xl mb-4 font-semibold leading-6 text-gray-900">
                {productName}
              </DialogTitle>
            </div>

            <div className="space-y-2 text-gray-700 pb-4">
              <div className="flex items-center justify-between gap-2">
                {specialPrice ? (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 line-through">${Number(price).toFixed(2)}</span>
                    <span className="sm:text-xl font-semibold text-slate-700">${Number(specialPrice).toFixed(2)}</span>
                  </div>
                ) : (
                  <span className="text-xl font-bold">${Number(price).toFixed(2)}</span>
                )}

                {isAvailable ? (
                  <Status text="In Stock" icon={MdDone} color="text-teal-200" bgColor="bg-teal-600" />
                ) : (
                  <Status text="Out of Stock" icon={MdClose} color="text-rose-200" bgColor="bg-rose-600" />
                )}
              </div>
              <Divider />
              <p>{description}</p>
            </div>
            <div className='px-6 py-4 flex justify-end gap-4'>
                <Button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={() => setOpen(false)}
                >
                    Close
                </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default ProductViewModal;