const { getAllCustomers, addCustomer, getCustomerByPhonenumber } = require("../model/customer.model")
const validator = require('validator')

const getAllCustomerService = async () => {
  const result = await getAllCustomers();
  return result;
}

const getCustomerByPhonenumberService = async (phonenumber) => {
  const result = await getCustomerByPhonenumber(phonenumber);
  return result;
}

const addCustomerService = async (customer) => {
  const { name, email, phonenumber, address } = customer;
  if(!name || !email || !phonenumber || !address) {
    const error = new Error('Hãy cung cấp đủ thông tin');
    error.code = 'INPUT_MISSING';
    throw error;
  }

  if(!validator.isEmail(email)) {
    const error = new Error('Email không hợp lệ');
    error.code = 'INVALID_EMAIL';
    throw error;
  }

  const result = await addCustomer(customer);
  return result;
}

module.exports = {
  getAllCustomerService,
  addCustomerService,
  getCustomerByPhonenumberService
}