const { v4: uuidv4 } = require('uuid');
const { addOrderService, getAllOrdersService, getOrderStatusService, updateOrderStatusService, getRevenueByMonthService, getPendingOrderQuantityService, getTop5ProductsSoldService, getOrderByIdService } = require('../service/order.service');
const { addCustomerService, getCustomerByPhonenumberService } = require('../service/customer.service');
// const { getCustomerByPhonenumber } = require('../model/customer.model');

const getAllOrders = async (req, res) => {
  try {
    const orders = await getAllOrdersService();
    res.status(200).json({
      status: 'success',
      message: 'Lấy đơn thành công',
      data: orders
    })
  }
  catch(err) {
    console.error(err.message);
    res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    })
  }
}

const addOrder = async (req, res) => {
  try {
    const { name, email, phonenumber, total_quantity, total_price, address, payment_method, products } = req.body;
    const id = uuidv4();
    
    const newOrder = {
      id,
      name,
      email,
      phonenumber,
      total_quantity,
      total_price,
      address,
      payment_method,
      products
    };

    const customer = await getCustomerByPhonenumberService(phonenumber);
    
   
    // if(!customer) {
    //   const newCustomer = {
    //     name,
    //     email,
    //     phonenumber,
    //     address
    //   };
    //   await addCustomerService(newCustomer);
    // }
    // else {
    //   // if(email != customer.email) {
    //   //   return res.status(400).json({
    //   //     status: 'fail',
    //   //     message: 'Email đã được sử dụng. Vui lòng dùng email khác',
    //   //   })
    //   // }

    //   if(phonenumber != customer.phonenumber) {
    //     return res.status(400).json({
    //       status: 'fail',
    //       message: 'Số điện thoại đã được sử dụng. Vui lòng dùng số khác',
    //     })
    //   }
    // }
    
    await addOrderService(newOrder);
    return res.status(201).json({
      status: 'success',
      message: 'Đặt đơn thành công',
      data: newOrder
    })
  }
  catch(err) {
    console.error(err.message);
    return res.status(500).json({
      status: 'fail',
      message: err.message || 'Internal server error',
    })
  }
}

const getOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getOrderStatusService(id);
    console.log(result);
    res.status(200).json({
      status: 'success',
      message: 'Lấy trạng thái thành công',
      data: result
    })
  }
  catch(err) {
    console.error(err.message);
    res.status(500).json({
      status: 'fail',
      message: err.message || 'Internal server error'
    })
  }
}

const getRevenueByMonth = async (req, res) => {
  try {
    const result = await getRevenueByMonthService();
    res.status(200).json({
      status: 'success',
      data: result
    })
  }
  catch(err) {
    console.error(err.message);
    res.status(500).json({
      status: 'fail',
      message: 'Internal server error'
    })
  }
}

const getPendingOrderQuantity = async (req, res) => {
  try {
    const result = await getPendingOrderQuantityService();
    res.status(200).json({
      status: 'success',
      data: result
    })
  }
  catch(err) {
    console.error(err);
    res.status(500).json({
      status: 'fail',
      memessage: 'Internal server error'
    })
  }
}

const getTop5ProductsSold = async (req, res) => {
  try {
    const result = await getTop5ProductsSoldService();
    res.status(200).json({
      status: 'success',
      data: result
    })
  }
  catch(err) {
    console.error(err);
    res.status(500).json({
      status: 'fail',
      memessage: 'Internal server error'
    })
  }
}

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { newStatus } = req.body;
    const result = await updateOrderStatusService(id, newStatus);
    console.log(result);
    res.status(200).json({
      status: 'success',
      message: 'Cập nhật trạng thái thành công',
      data: result
    })
  }
  catch(err) {
    console.error(err.message);
    res.status(500).json({
      status: 'fail',
      message: err.message || 'Internal server error'
    })
  }
}

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getOrderByIdService(id);
    res.status(200).json({
      status: 'success',
      data: result
    })
  }
  catch(err) {
    console.error(err.message);
    res.status(500).json({
      status: 'fail',
      message: err.message || 'Internal server error'
    })
  }
}

module.exports = {
  addOrder,
  getAllOrders,
  getOrderStatus,
  updateOrderStatus,
  getRevenueByMonth,
  getPendingOrderQuantity,
  getTop5ProductsSold,
  getOrderById
}