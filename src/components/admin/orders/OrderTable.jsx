import { DataGrid } from '@mui/x-data-grid'
import { adminOrderTableColumn } from '../../helper/tableColumn';
import { useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Modal from '../../shared/Modal';
import UpdateOrderForm from './UpdateOrderForm';

const OrderTable = ({ adminOrder, pagination }) => {
  const [updateOpenModal, setUpdateOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(
    pagination?.pageNumber + 1 || 1
  );

  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;

  const tableRecords = adminOrder?.map((item) => {
    return {
      id: item.orderId,
      email: item.email,
      totalAmount: item.totalAmount,
      status: item.orderStatus,
      date: item.orderDate,
    }
  });

  const handlePaginationChange = (paginationModel) => {
    const page = paginationModel.page + 1;
    setCurrentPage(page);
    params.set("page", page.toString());
    navigate(`${pathname}?${params}`)
  }

  const handleEdit = (order) => {
    setSelectedItem(order);
    setUpdateOpenModal(true);
  }

  return (
    <div className="p-4">
      <h1 className='text-slate-800 text-3xl text-center font-bold pb-6 uppercase'>
        All Orders ({pagination?.totalElements || 0})
      </h1>

      <div style={{ height: 600, width: '100%' }}>
         <DataGrid
            rows={tableRecords || []}
            columns={adminOrderTableColumn(handleEdit)}
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

      <Modal
        open={updateOpenModal}
        setOpen={setUpdateOpenModal}
        title='Update Order Status'>
          <UpdateOrderForm
            setOpen={setUpdateOpenModal}
            loader={loader}
            setLoader={setLoader}
            selectedId={selectedItem?.id}
            selectedItem={selectedItem}
            />
      </Modal>
    </div>
  )
}

export default OrderTable