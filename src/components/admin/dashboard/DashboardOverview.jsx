import React from 'react'

const DashboardOverview = ({ title, amount, Icon, revenue = false, description }) => {
  
  const displayAmount = revenue ? `$${amount}` : amount;

  return (
    <div className='bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow'>
      <div className='flex items-center justify-between mb-4'>
        <div>
          <h3 className='text-lg font-semibold text-gray-700'>{title}</h3>
          {description && (
            <p className='text-sm text-gray-500 mt-1'>{description}</p>
          )}
        </div>
        <div className='p-3 bg-blue-50 rounded-full'>
          <Icon className='text-blue-600 text-xl' />
        </div>
      </div>
      
      <h1 className='text-3xl font-bold text-gray-900'>
        {displayAmount}
      </h1>
      
      {/* Optional trend indicator */}
      <div className='mt-3 flex items-center text-sm'>
        <span className='text-green-600 font-medium'>↑ 5.2%</span>
        <span className='text-gray-500 ml-2'>from last month</span>
      </div>
    </div>
  )
}

export default DashboardOverview