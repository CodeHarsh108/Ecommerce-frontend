import React, { useEffect } from 'react'
import DashboardOverview from './DashboardOverview';
import { FaBoxOpen, FaDollarSign, FaShoppingCart, FaUsers, FaChartLine } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { analyticsAction } from '../../../store/actions';
import Loader from '../../shared/Loader';
import ErrorPage from '../../shared/ErrorPage';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const adminState = useSelector((state) => state.admin) || {};
  const analytics = adminState.analytics || {};
  
  // Dummy data as fallback
  const dummyData = {
    productCount: "156",
    totalOrders: "1,234",
    totalRevenue: "45,678.90",
    totalCustomers: "892",
    growthRate: "12.5"
  };
  
  // Use real data if available, otherwise use dummy data
  const productCount = analytics.productCount || dummyData.productCount;
  const totalOrders = analytics.totalOrders || dummyData.totalOrders;
  const totalRevenue = analytics.totalRevenue || dummyData.totalRevenue;
  const totalCustomers = analytics.totalCustomers || dummyData.totalCustomers;
  const growthRate = analytics.growthRate || dummyData.growthRate;

  useEffect(() => {
    // Still try to fetch real data, but we have fallback
    dispatch(analyticsAction());
  }, [dispatch]);

  // Show loader only if actually loading and no data exists
  if (isLoading && !analytics.productCount) {
    return <Loader text="Loading dashboard data..." />
  }

  // Show error only if there's an error and no data exists
  if (errorMessage && !analytics.productCount) {
    return (
      <div>
        <ErrorPage message={errorMessage}/>
        {/* Still show the dashboard with dummy data */}
        <div className='mt-4'>
          <DashboardContent 
            productCount={productCount}
            totalOrders={totalOrders}
            totalRevenue={totalRevenue}
            totalCustomers={totalCustomers}
            growthRate={growthRate}
            isUsingDummyData={!analytics.productCount}
          />
        </div>
      </div>
    );
  }

  return (
    <DashboardContent 
      productCount={productCount}
      totalOrders={totalOrders}
      totalRevenue={totalRevenue}
      totalCustomers={totalCustomers}
      growthRate={growthRate}
      isUsingDummyData={!analytics.productCount}
    />
  );
};

// Separate component for the dashboard content
const DashboardContent = ({ 
  productCount, 
  totalOrders, 
  totalRevenue, 
  totalCustomers, 
  growthRate, 
  isUsingDummyData 
}) => {
  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <DashboardOverview 
          title="Total Products"
          amount={productCount}
          Icon={FaBoxOpen}
          description="Active products in store"
        />

        <DashboardOverview 
          title="Total Orders"
          amount={totalOrders}
          Icon={FaShoppingCart}
          description="Completed orders"
        />

        <DashboardOverview 
          title="Total Revenue"
          amount={totalRevenue}
          Icon={FaDollarSign}
          revenue
          description="Total sales revenue"
        />

        <DashboardOverview 
          title="Total Customers"
          amount={totalCustomers}
          Icon={FaUsers}
          description="Registered customers"
        />
      </div>

      {/* Growth Rate Card */}
      <div className='bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg p-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h3 className='text-xl font-semibold text-green-800'>Growth Rate</h3>
            <p className='text-green-600'>This month</p>
          </div>
          <div className='text-right'>
            <div className='flex items-center gap-2'>
              <FaChartLine className='text-green-600 text-2xl' />
              <span className='text-3xl font-bold text-green-800'>{growthRate}%</span>
            </div>
            <p className='text-green-600 text-sm'>Compared to last month</p>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className='bg-white rounded-lg shadow-md p-6'>
        <h2 className='text-2xl font-bold text-gray-800 mb-4'>Recent Activity</h2>
        <div className='space-y-3'>
          <ActivityItem 
            type="order"
            message="New order #ORD-0012 received"
            time="2 hours ago"
            status="success"
          />
          <ActivityItem 
            type="product"
            message="Product 'Wireless Headphones' is low in stock"
            time="5 hours ago"
            status="warning"
          />
          <ActivityItem 
            type="user"
            message="New customer registered: john.doe@email.com"
            time="1 day ago"
            status="info"
          />
          <ActivityItem 
            type="order"
            message="Order #ORD-0011 shipped successfully"
            time="1 day ago"
            status="success"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className='bg-white rounded-lg shadow-md p-6'>
        <h2 className='text-2xl font-bold text-gray-800 mb-4'>Quick Actions</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          <QuickActionCard 
            title="Add Product"
            description="Create new product listing"
            icon="➕"
            action={() => console.log("Add product clicked")}
          />
          <QuickActionCard 
            title="View Orders"
            description="Manage customer orders"
            icon="📦"
            action={() => console.log("View orders clicked")}
          />
          <QuickActionCard 
            title="Analytics"
            description="View detailed reports"
            icon="📊"
            action={() => console.log("Analytics clicked")}
          />
          <QuickActionCard 
            title="Settings"
            description="Manage store settings"
            icon="⚙️"
            action={() => console.log("Settings clicked")}
          />
        </div>
      </div>

      {/* Dummy Data Notice */}
      {isUsingDummyData && (
        <div className='p-4 bg-blue-50 border border-blue-200 rounded-lg'>
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
                  Currently displaying sample data. Real analytics will appear automatically when backend connectivity is established.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Activity Item Component
const ActivityItem = ({ type, message, time, status }) => {
  const statusColors = {
    success: 'text-green-800 bg-green-100',
    warning: 'text-yellow-800 bg-yellow-100',
    info: 'text-blue-800 bg-blue-100',
    error: 'text-red-800 bg-red-100'
  };

  const typeIcons = {
    order: '📦',
    product: '🏷️',
    user: '👤',
    system: '⚙️'
  };

  return (
    <div className='flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'>
      <div className='flex items-center space-x-3'>
        <span className='text-xl'>{typeIcons[type]}</span>
        <div>
          <p className='font-medium text-gray-800'>{message}</p>
          <p className='text-sm text-gray-500'>{time}</p>
        </div>
      </div>
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
        {status}
      </span>
    </div>
  );
};

// Quick Action Card Component
const QuickActionCard = ({ title, description, icon, action }) => {
  return (
    <button
      onClick={action}
      className='p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all text-left'
    >
      <div className='flex items-center space-x-3'>
        <span className='text-2xl'>{icon}</span>
        <div>
          <h3 className='font-semibold text-gray-800'>{title}</h3>
          <p className='text-sm text-gray-600'>{description}</p>
        </div>
      </div>
    </button>
  );
};

export default Dashboard;