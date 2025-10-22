import React, { useState } from 'react'
import { MdAddShoppingCart } from 'react-icons/md';
import { FaBoxOpen } from 'react-icons/fa';
import { DataGrid } from '@mui/x-data-grid';
import AddProductForm from './AddProductForm.jsx';
import ImageUploadForm from './ImageUploadForm.jsx';
import { DeleteModal } from '../../checkout/DeleteModal.jsx';
import ProductViewModal from '../../shared/ProductViewModal.jsx';
import { adminProductTableColumn } from '../../helper/tableColumn.jsx';
import Modal from '../../shared/Modal';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';


const AdminProducts = () => {
  // Complete dummy data - no API calls
  const dummyProducts = [
    { 
      "productId": 52, 
      "productName": "iPad Pro", 
      "image": "/images/ipad-pro.png", 
      "description": "High-performance Tablet with a 4K display and powerful camera", 
      "quantity": 30, 
      "price": 1800.0, 
      "discount": 43.0, 
      "specialPrice": 1026.0,
      "category": "Electronics"
    }, 
    { 
      "productId": 2, 
      "productName": "iPhone 16 Pro Max", 
      "image": "/images/iphone-16.png", 
      "description": "High-performance phone with a 4K display and powerful camera", 
      "quantity": 19, 
      "price": 1400.0, 
      "discount": 23.0, 
      "specialPrice": 1078.0,
      "category": "Electronics"
    },
    { 
      "productId": 3, 
      "productName": "MacBook Pro", 
      "image": "/images/macbook-pro.png", 
      "description": "Powerful laptop for professionals with M3 chip", 
      "quantity": 15, 
      "price": 2400.0, 
      "discount": 10.0, 
      "specialPrice": 2160.0,
      "category": "Electronics"
    },
    { 
      "productId": 4, 
      "productName": "Wireless Headphones", 
      "image": "/images/headphones.png", 
      "description": "Premium noise-cancelling wireless headphones", 
      "quantity": 45, 
      "price": 299.0, 
      "discount": 15.0, 
      "specialPrice": 254.15,
      "category": "Audio"
    },
    { 
      "productId": 5, 
      "productName": "Smart Watch", 
      "image": "/images/smart-watch.png", 
      "description": "Feature-rich smartwatch with health monitoring", 
      "quantity": 28, 
      "price": 399.0, 
      "discount": 20.0, 
      "specialPrice": 319.20,
      "category": "Wearables"
    },
    { 
      "productId": 6, 
      "productName": "Gaming Console", 
      "image": "/images/gaming-console.png", 
      "description": "Next-gen gaming console with 4K gaming", 
      "quantity": 12, 
      "price": 499.0, 
      "discount": 5.0, 
      "specialPrice": 474.05,
      "category": "Gaming"
    },
    { 
      "productId": 7, 
      "productName": "Digital Camera", 
      "image": "/images/camera.png", 
      "description": "Professional DSLR camera with 4K video", 
      "quantity": 8, 
      "price": 1200.0, 
      "discount": 12.0, 
      "specialPrice": 1056.0,
      "category": "Photography"
    },
    { 
      "productId": 8, 
      "productName": "Bluetooth Speaker", 
      "image": "/images/speaker.png", 
      "description": "Portable Bluetooth speaker with premium sound", 
      "quantity": 35, 
      "price": 149.0, 
      "discount": 25.0, 
      "specialPrice": 111.75,
      "category": "Audio"
    }
  ];
  
  const dummyPagination = { 
    pageNumber: 0, 
    pageSize: 10, 
    totalElements: dummyProducts.length, 
    totalPages: Math.ceil(dummyProducts.length / 10), 
    lastPage: true 
  };

  // Use only dummy data - no Redux state
  const [products, setProducts] = useState(dummyProducts);
  const [pagination, setPagination] = useState(dummyPagination);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openProductViewModal, setOpenProductViewModal] = useState(false);
  const [openImageUploadModal, setOpenImageUploadModal] = useState(false);
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;

  // Dummy user data
  const user = { roles: ["ROLE_ADMIN"] };
  const isAdmin = true;

  const tableRecords = products?.map((item) => {
    return {
      id: item.productId,
      productName: item.productName,
      description: item.description,
      discount: item.discount,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
      specialPrice: item.specialPrice,
      category: item.category
    }
  });

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpenUpdateModal(true);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setOpenDeleteModal(true);
  };

  const handleImageUpload = (product) => {
    setSelectedProduct(product);
    setOpenImageUploadModal(true);
  };

  const handleProductView = (product) => {
    setSelectedProduct(product);
    setOpenProductViewModal(true);
  };

  const handlePaginationChange = (paginationModel) => {
    const page = paginationModel.page + 1;
    setCurrentPage(page);
    params.set("page", page.toString());
    navigate(`${pathname}?${params}`);
  };

  // Local delete handler - no API calls
  const onDeleteHandler = () => {
    setLoader(true);
    
    // Simulate API delay
    setTimeout(() => {
      const updatedProducts = products.filter(product => product.productId !== selectedProduct?.id);
      setProducts(updatedProducts);
      setPagination({
        ...pagination,
        totalElements: updatedProducts.length,
        totalPages: Math.ceil(updatedProducts.length / 10)
      });
      
      toast.success("Product deleted successfully!");
      setOpenDeleteModal(false);
      setLoader(false);
    }, 1000);
  };

  // Local add product handler
  const handleAddProduct = (productData) => {
    setLoader(true);
    
    // Simulate API delay
    setTimeout(() => {
      const newProduct = {
        productId: Date.now(), // Generate unique ID
        ...productData,
        image: "/images/default-product.png",
        category: "Electronics" // Default category
      };
      
      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);
      setPagination({
        ...pagination,
        totalElements: updatedProducts.length,
        totalPages: Math.ceil(updatedProducts.length / 10)
      });
      
      toast.success("Product created successfully!");
      setOpenAddModal(false);
      setLoader(false);
    }, 1000);
  };

  // Local update product handler
  const handleUpdateProduct = (productData) => {
    setLoader(true);
    
    // Simulate API delay
    setTimeout(() => {
      const updatedProducts = products.map(product =>
        product.productId === selectedProduct?.id
          ? { ...product, ...productData }
          : product
      );
      
      setProducts(updatedProducts);
      toast.success("Product updated successfully!");
      setOpenUpdateModal(false);
      setLoader(false);
    }, 1000);
  };

  // Local image upload handler
  const handleImageUploadSubmit = (formData) => {
    setLoader(true);
    
    // Simulate API delay
    setTimeout(() => {
      const updatedProducts = products.map(product =>
        product.productId === selectedProduct?.id
          ? { ...product, image: "/images/updated-product.png" }
          : product
      );
      
      setProducts(updatedProducts);
      toast.success("Image uploaded successfully!");
      setOpenImageUploadModal(false);
      setLoader(false);
    }, 1000);
  };

  const emptyProduct = !products || products?.length === 0;

  return (
    <div className="p-4">
      <div className='pt-6 pb-10 flex justify-between items-center'>
        <h1 className='text-slate-800 text-3xl font-bold uppercase'>
          Product Management ({products.length} products)
        </h1>
        <button
          onClick={() => setOpenAddModal(true)}
          className='bg-custom-blue hover:bg-blue-800 text-white font-semibold py-2 px-4 flex items-center gap-2 rounded-md shadow-md transition-colors hover:text-slate-300 duration-300'>
          <MdAddShoppingCart className='text-xl' />
          Add Product
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {emptyProduct ? (
            <div className='flex flex-col items-center justify-center text-gray-600 py-10'>
              <FaBoxOpen size={50} className='mb-3'/>
              <h2 className='text-2xl font-semibold'>
                No products created yet  
              </h2>
              <p className='text-gray-500 mt-2'>Click "Add Product" to create your first product.</p>
            </div>
          ) : (
            <div className='max-w-full' style={{ height: 600 }}>
              <DataGrid
                rows={tableRecords}
                columns={adminProductTableColumn(
                  handleEdit,
                  handleDelete,
                  handleImageUpload,
                  handleProductView
                )}
                paginationMode='server'
                rowCount={pagination?.totalElements || 0}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: pagination?.pageSize || 10,
                      page: currentPage - 1,
                    },
                  },
                }}
                onPaginationModelChange={handlePaginationChange}
                disableRowSelectionOnClick
                disableColumnResize
                pageSizeOptions={[10, 25, 50]}
                pagination
              />
            </div>
          )}
        </>
      )}

      {/* Add/Update Product Modal */}
      <Modal
        open={openUpdateModal || openAddModal}
        setOpen={openUpdateModal ? setOpenUpdateModal : setOpenAddModal}
        title={openUpdateModal ? "Update Product" : "Add Product"}>
        <AddProductForm
          setOpen={openUpdateModal ? setOpenUpdateModal : setOpenAddModal}
          product={selectedProduct}
          update={openUpdateModal}
          onSubmit={openUpdateModal ? handleUpdateProduct : handleAddProduct}
          loader={loader}
        />
      </Modal>

      {/* Image Upload Modal */}
      <Modal
        open={openImageUploadModal}
        setOpen={setOpenImageUploadModal}
        title="Add Product Image">
        <ImageUploadForm
          setOpen={setOpenImageUploadModal}
          product={selectedProduct}
          onSubmit={handleImageUploadSubmit}
          loader={loader}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        loader={loader}
        title="Delete Product"
        onDeleteHandler={onDeleteHandler}
      />

      {/* Product View Modal */}
      <ProductViewModal
        open={openProductViewModal}
        setOpen={setOpenProductViewModal}
        product={selectedProduct}
      />

      {/* Demo Notice */}
      <div className='mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg'>
        <div className='flex items-center'>
          <div className='flex-shrink-0'>
            <span className='text-blue-500'>💡</span>
          </div>
          <div className='ml-3'>
            <h3 className='text-sm font-medium text-blue-800'>
              Demo Mode Active - Local Data
            </h3>
            <div className='mt-1 text-sm text-blue-700'>
              <p>
                All product data is stored locally. Changes will persist only during this session.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminProducts