
const pool = require('../database/db.js');

const getAllUsers = async () => {
  const [rows] = await pool.query('SELECT * FROM user');
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
  const { firstname, lastname, email, phonenumber, password, role, gender } = user;
  const [result] = await pool.query(
    'INSERT INTO user (firstname, lastname, email, phonenumber, password, role, gender) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [firstname, lastname, email, phonenumber, password, role, gender]
  );
  return result;
}

const updateUser = async (id, user) => {
  const { firstname, lastname, email, phonenumber, image, role, gender } = user;
  const result = await pool.query(
    'UPDATE user SET firstname = ?, lastname = ?, email = ?, phonenumber = ?, image = ?, role = ?, gender = ? WHERE id = ?',
    [firstname, lastname, email, phonenumber, image, role, gender, id]
  );

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
  getUserQuantity
};