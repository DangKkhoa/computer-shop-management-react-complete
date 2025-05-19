const { addOrder, getAllOrders, getOrderStatus, updateOrderStatus, getPendingOrderQuantity, getRevenueByMonth, getTop5ProductsSold, getOrderById } = require("../model/order.model")
const validator = require('validator');

const statusTransitions = {
  PENDING: ['CONFIRMED', 'CANCELLED'],
  CONFIRMED: ['CANCELLED'],
  CANCELLED: []
}

const getAllOrdersService = async () => {
  const result = await getAllOrders();
  return result;
}

const addOrderService = async (order) => {

  if(!order.products) {
    const error = new Error('Hãy chọn sản phẩm trước khi thanh toán');
    error.code = 'NO_PRODUCT_CHOSEN';
    throw error;
  }

  if(order.products.length === 0) {
    const error = new Error('Hãy chọn sản phẩm trước khi thanh toán');
    error.code = 'NO_PRODUCT_CHOSEN';
    throw error;
  }

  if(!order.id) {
    const error = new Error('THIẾU ID ĐƠN HÀNG');
    error.code = 'ID_MISSING';
    throw error;
  }

  if(!order.name) {
    const error = new Error('Hãy cung cấp tên của bạn');
    error.code = 'NAME_MISSING';
    throw error;
  }

  if(!order.email) {
    const error = new Error('Hãy cung cấp email để nhận hóa đơn điện tử');
    error.code = 'EMAIL_MISSING';
    throw error;
  }

  
  if(!validator.isEmail(order.email)) {
    const error = new Error('Email không hợp lệ');
    error.code = 'INVALID_EMAIL';
    throw error;
  }

  if(!order.phonenumber) {
    const error = new Error('Hãy cung cấp số điện thoại');
    error.code = 'PHONENUMBER_MISSING';
    throw error;
  }

  if(!order.payment_method) {
    const error = new Error('Hãy chọn phương thức thanh toán');
    error.code = 'PAYMENT_METHOD_MISSING';
    throw error;
  }

  const result = await addOrder(order);
  return result;
}

const getOrderStatusService = async (id) => {
  if(!id) {
    const error = new Error('Hãy cung cấp ID đơn hàng');
    error.code = 'ID_MISSING';
    throw error;
  }

  const result = await getOrderStatus(id);
  return result;
}

const getPendingOrderQuantityService = async () => {
  const result = await getPendingOrderQuantity();
  return result["COUNT(*)"];
}

const getTop5ProductsSoldService = async () => {
  const result = await getTop5ProductsSold();
  return result;
}

const getRevenueByMonthService = async () => {
  const result = await getRevenueByMonth();
  return result;
}

const updateOrderStatusService = async (id, newStatus) => {
  if(!id) {
    const error = new Error('Thiếu ID đơn hàng');
    error.code = 'ID_MISSING';
    throw error;
  }

  const currStatus = await getOrderStatusService(id);
  if(!currStatus) {
    const error = new Error('Không tìm thấy đơn hàng');
    error.code = 'INVALID_ID';
    throw error;
  }

  if(!newStatus) {
    const error = new Error('Thiếu trạng thái mới ');
    error.code = 'NEW_STATUS_MISSING';
    throw error;
  }

  if(!statusTransitions[currStatus].includes(newStatus)) {
    const error = new Error('Không thể cập nhật trạng thái đơn hàng lúc này');
    error.code = 'INVALID_STATUS';
    throw error;
  }

  const result = await updateOrderStatus(id, newStatus);
  return result;
}

const getOrderByIdService = async (id) => {
  const result = await getOrderById(id);
  return result;
}

module.exports = {
  addOrderService,
  getAllOrdersService,
  getOrderStatusService,
  updateOrderStatusService,
  getPendingOrderQuantityService,
  getRevenueByMonthService,
  getTop5ProductsSoldService,
  getOrderByIdService
}