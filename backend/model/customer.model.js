
const db = require('../database/db.js');

const getAllCustomers = async () => {
  const [result] = await db.query('SELECT * FROM customer ORDER BY created_at DESC');
  return result;
}

const getCustomerByPhonenumber = async (phonenumber) => {
  const [result] = await db.query('SELECT * FROM customer WHERE phonenumber = ?', [phonenumber]);
  return result[0];
}

const addCustomer = async (customer) => {
  const { name, email, phonenumber, address } = customer;
  const [result] = await db.query('INSERT INTO customer(name, email, phonenumber, address) VALUES (?, ?, ?, ?)', [name, email, phonenumber, address]);
  return result;
}

module.exports = {
  getAllCustomers, 
  addCustomer,
  getCustomerByPhonenumber
}