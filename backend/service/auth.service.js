const { getUserByEmail } = require('../model/user.model');
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require('../util/hash.util');

const JWT_SECRET = process.env.JWT_SECRET || "khoadeptraivl";
const loginService = async (email, password) => {
  if(!email || !password) {
    const error = new Error('Email and password are required');
    error.code = 'INVALID_INPUT'; 
    throw error;
  }

  const account = await getUserByEmail(email);
  if(!account) {
    const error = new Error('Account not found');
    error.code = 'ACCOUNT_NOT_FOUND'; 
    throw error;
  }

  const isMatched = await comparePassword(password, account.password);
  if(!isMatched) {
    const error = new Error('Invalid password');
    error.code = 'INVALID_PASSWORD'; 
    throw error;
  }

  if(account.is_locked) {
    const error = new Error('Tài khoản đã bị khóa. Vui lòng liên hệ admin để biết thêm');
    error.code = 'ACCOUNT_LOCKED';
    throw error;
  }

  delete account.password;
  delete account.is_locked;
  delete account.created_at;

  return account;
}

module.exports = { loginService }