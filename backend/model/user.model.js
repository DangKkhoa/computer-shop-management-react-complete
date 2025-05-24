
const { is_buffer } = require('openai/internal/qs/utils.mjs');
const pool = require('../database/db.js');

const getAllUsers = async () => {
  const [rows] = await pool.query('SELECT * FROM user WHERE NOT role = ?', ['ADMIN']);
  return rows;
}

const getUserById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM user WHERE id = ?', [id]);
  return rows[0];
}

const getUserByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM user WHERE email = ?', [email]);
  return rows[0];
}
const getUserByPhoneNumber = async (phonenumber) => {
  const [rows] = await pool.query('SELECT * FROM user WHERE phonenumber = ?', [phonenumber]);
  return rows[0];
}

const getUserByEmailAndPhoneNumber = async (email, phonenumber) => {
  const [rows] = await pool.query('SELECT * FROM user WHERE email = ? OR phonenumber = ?', [email, phonenumber]);
  return rows[0];
}

const getUserByEmailAndPassword = async (email, password) => {
  const [rows] = await pool.query('SELECT * FROM user WHERE email = ? AND password = ?', [email, password]);
  return rows[0];
}

const getUserQuantity = async () => {
  const [result] = await pool.query('SELECT COUNT(*) FROM user');
  return result[0];
}

const addUser = async (user) => {
  const { firstname, lastname, email, phonenumber, passwordHashed, role, gender } = user;
  const [result] = await pool.query(
    'INSERT INTO user (firstname, lastname, email, phonenumber, password, role, gender) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [firstname, lastname, email, phonenumber, passwordHashed, role, gender]
  );
  return result;
}

const updateUser = async (id, user) => {
  const { firstname, lastname, email, phonenumber, image, role, gender } = user;
  let sql = 'UPDATE user SET ';
  let update = [];
  let params = [];

  if(firstname) {
    update.push('firstname = ?');
    params.push(firstname);
  }
  if(lastname) {
    update.push('lastname = ?');
    params.push(lastname);
  }
  if(email) {
    update.push('email = ?');
    params.push(email);
  }
  if(phonenumber) {
    update.push('phonenumber = ?');
    params.push(phonenumber);
  }
  if(image) {
    update.push('image = ?');
    params.push(image);
  }
  if(role) {
    update.push('role = ?');
    params.push(role);
  }
  if(gender) {
    update.push('gender = ?');
    params.push(gender);
  }

  
  if(update.length > 0) {
    sql += update.join(', ') + ' WHERE id = ?';
    params.push(id);
  }

  const result = await pool.query(sql, params);

  return result;
}

const deleteUser = async (id) => {
  const [result] = await pool.query('DELETE FROM user WHERE id = ?', [id]);
  return result;
}

const setLockUser = async (id, locked) => {
  const [result] = await pool.query('UPDATE user SET is_locked = ? WHERE id = ?', [locked, id]);
  return result;
}

const updatePassword = async (id, hashedPassword, table=`user`) => {
  const [result] = await pool.query(`UPDATE \`${table}\` SET password = ? WHERE id = ?`, [hashedPassword, id]);
  return result;
}

const updateToken = async (token, email) => {
  const [result] = await pool.query('UPDATE user set code = ? WHERE email = ?', [token, email]);
  return result;
}

const getCodeByEmail = async (email ) => {
  const [result] = await pool.query('SELECT code from user WHERE email = ?', [email]);
  return result;
}

module.exports = {
  getAllUsers, 
  getUserById, 
  getUserByEmail, 
  getUserByPhoneNumber, 
  getUserByEmailAndPhoneNumber, 
  getUserByEmailAndPassword, 
  addUser, 
  updateUser,
  deleteUser, 
  setLockUser,
  getUserQuantity,
  updatePassword,
  updateToken,
  getCodeByEmail
};