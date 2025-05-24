const { getAllUsers, getUserById, getUserByEmail, getUserByPhoneNumber, getUserByEmailAndPhoneNumber, addUser, deleteUser, setLockUser, updateUser, getUserQuantity, updatePassword, updateToken, getCodeByEmail  } = require('../model/user.model.js');

const path = require('path');
const { comparePassword, hashPassword } = require('../util/hash.util.js');
const { sendEmail } = require('./email.service.js');

const getAllUsersService = async () => {
  const users = await getAllUsers();
  // users.forEach(user => {
  //   user.password = undefined;
  // })
  return users;
}

const getUserByIdService = async (id) => {
  const user = await getUserById(id);
  if (!user) {
    const error = new Error('User not found');
    error.code = 'USER_NOT_FOUND';
    throw error;
  }
  delete user.password;
  // delete user.is_locked;
  // delete user.created_at;

  // const result = {...user, password: undefined, is_locked: undefined, created_at: undefined};
  return user;
}

const getUserByEmailService = async (email) => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
}

const getUserByPhoneNumberService = async (phonenumber) => {
  const user = await getUserByPhoneNumber(phonenumber);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
}

const getUserByEmailOrPhoneNumberService = async (query) => {
  const user = await getUserByEmailAndPhoneNumber(query, query);
  if (!user) {
    const error = new Error('Không tìm thấy user');
    error.code = 'USER_NOT_FOUND';
    throw error;
  }
  
  const result = {...user, password: undefined};
  return result;
}

const getUserQuantityService = async () => {
  const result = await getUserQuantity();
  return result["COUNT(*)"];
}

const addUserService = async (user) => {
  const { firstname, lastname, email, phonenumber, role, gender } = user;

  if(!firstname || !lastname || !email || !phonenumber || !role || !gender) {
    const error = new Error('Hãy điền đầy đủ các thông');
    error.code = 'INPUT_MISSING'; 
    throw error;
  } 
  const existingAccount = await getUserByEmailAndPhoneNumber(email, phonenumber);
  if (existingAccount) {
    const error = new Error('Email hoặc số điện thoại đã được sử dụng');
    error.code = 'ACCOUNT_EXISTS'; 
    throw error;
  }
  
  const mil = new Date().getTime();
  console.log(email.split('@')[0]);
  const password = email.split('@')[0].toLowerCase() + (Math.floor(Math.random() * 9000) + 1000);
  console.log(password);

  const passwordHashed = await hashPassword(password);
  const newAccount = {
    firstname,
    lastname,
    email,
    phonenumber,
    passwordHashed,
    role,
    gender
  }

  await addUser(newAccount);
  return newAccount;
}

const updateUserService = async (id, userToUpdate) => {

  const { firstname, lastname, email, phonenumber, image, role, gender } = userToUpdate;
  const allowedImageTypes = ['.jpg', '.jpeg', '.png', '.webp'];
  if(!id) {
    const error = new Error('Vui lòng cung cấp id để cập nhật');
    error.code = 'ID_MISSING';
    throw error;
  }

  if(!firstname || !lastname || !email || !phonenumber || !role || !gender) {
    const error = new Error('Các thông tin không được để trống. Vui lòng nhập đủ');
    error.code = 'INVALID_INPUT';
    throw error;
  }

  console.log("Hình ảnh: " + path.extname(image || ''));
  if(image) {
    if(!allowedImageTypes.includes(path.extname(image || ''))) {
        
      const error = new Error('Vui lòng cung cấp file hình ảnh');
      error.code = 'INVALID_IMAGE';
      throw error;
  }
  }
  
  
  

  const accountWithEmail = await getUserByEmail(userToUpdate.email);
  if(accountWithEmail && accountWithEmail.id != id) {
    const error = new Error('Email đã được sử dụng bởi tài khoản khác. Vui lòng dùng email khác');
    error.code = 'EMAIL_EXISTS';
    throw error;
  }

  const accountWithPhone = await getUserByPhoneNumber(userToUpdate.phonenumber);
  if(accountWithPhone && accountWithPhone.id != id) {
    const error = new Error('Số điện thoại đã được sử dụng bởi tài khoản khác. Vui lòng dùng số khác');
    error.code = 'PHONENUMBER_EXISTS';
    throw error;
  }
  
  const result = await updateUser(id, userToUpdate);
  return result;

}

const deleteUserService = async (id) => {
  const user = await getUserById(id);
  if (!user) {
    const error = new Error('User not found');
    error.code = 'USER_NOT_FOUND';
    throw error;
  }

  const result = await deleteUser(id);

  return user;
}

const setLockService = async (id, locked) => {
  const user = await getUserById(id);
  if (!user) {
    const error = new Error('User not found');
    error.code = 'USER_NOT_FOUND';
    throw error;
  }

  const result = await setLockUser(id, locked);

  return result;
}

const updatePasswordService = async (password, newPassword, confirmPassword, id) => {
  const account = await getUserById(id);
  if(!account) {
    const error = new Error('Không tìm thấy người dùng');
    error.code = 'USER_NOT_FOUND';
    throw error;
  }

  if(!password || !newPassword || !confirmPassword) {
    const error = new Error('Vui lòng điền hết thông tin');
    error.code = 'INVALID_INPUT';
    throw error;
  }

  if(newPassword.length < 8) {
    const error = new Error('Mật khẩu mới phải có ít nhất 8 ký tự');
    error.code = 'TOO_SHORT_PASSWROD';
    throw error;
  }

  if(newPassword !== confirmPassword) {
    const error = new Error('Mật khẩu xác nhận không khớp');
    error.code = 'PASSWORD_CONFIRM_MISSMATCH';
    throw error;
  }

  const isMatched = await comparePassword(password, account.password);
  if(!isMatched) {
    const error = new Error('Mật khẩu hiện tại chưa chính xác');
    error.code = 'WRONG_PASSWORD';
    throw error;
  }

  if(password === newPassword) {
    const error = new Error('Mật khẩu mới không được trùng mật khẩu cũ');
    error.code = 'SAME_PASSWORD';
    throw error;
  }

  const newHashedPassword = await hashPassword(newPassword);
  const result = await updatePassword(id, newHashedPassword);

  return result
}

const updateTokenService = async (email) => {
  const token =  Math.floor(Math.random() * (999999 - 100000 + 1));
  const result = await updateToken(token, email);

  return token;
}

const getCodeByEmailService = async (email, code) => {
  const accountCode = await getCodeByEmail(email);
   
  if(code == accountCode) {
    return true;
  }
  return false;
}

module.exports = { 
  getAllUsersService, 
  getUserByIdService, 
  getUserByEmailService, 
  getUserByPhoneNumberService, 
  getUserByEmailOrPhoneNumberService, 
  addUserService,
  updateUserService, 
  deleteUserService, 
  setLockService,
  getUserQuantityService,
  updatePasswordService,
  updateTokenService,
  getCodeByEmailService
};