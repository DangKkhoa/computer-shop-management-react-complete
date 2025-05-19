const pool = require('../database/db.js');

const getAllProducts = async () => {
  const [rows] = await pool.query('SELECT * FROM product ORDER BY created_at DESC');
  return rows;
}

const getProductById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM product WHERE id = ?', [id]);
  return rows[0];
}

const getProductsByCategory = async (category, limit = 8, offset = 0) => {
  const searchQuery = `%${category}%`;
  const [rows] = await pool.query('SELECT * FROM product WHERE category LIKE ? LIMIT ? OFFSET ?', [searchQuery, Number(limit), Number(offset)]);
  return rows;
}

const getProductsByRam = async (ram, limit = 20, offset = 0) => {
  const [rows] = await pool.query(
    'SELECT * FROM product WHERE ram = ? LIMIT ? OFFSET ?',
    [ram, limit, offset]
  );
  return rows;
};

const getProductsBySSD = async (storage, limit = 20, offset = 0) => {
  const [rows] = await pool.query(
    'SELECT * FROM product WHERE storage = ? LIMIT ? OFFSET ?',
    [storage, limit, offset]
  );
  return rows;
};

const getProductsByPriceMax = async (maxPrice, limit = 20, offset = 0) => {
  const [rows] = await pool.query(
    'SELECT * FROM product WHERE retailed_price <= ? LIMIT ? OFFSET ?',
    [maxPrice, limit, offset]
  );
  return rows;
};

const getProductsByPriceMin = async (minPrice, limit = 20, offset = 0) => {
  const [rows] = await pool.query(
    'SELECT * FROM product WHERE retailed_price >= ? LIMIT ? OFFSET ?',
    [minPrice, limit, offset]
  );
  return rows;
};

const getProductQuantity = async () => {
  const [result] = await pool.query('SELECT COUNT(*) FROM product');
  return result[0];
}

// sorted price
const getProductsByCategorySorted = async (category, sort, limit=8, offset=0) => {
  const searchQuery = `%${category}%`;
  const sortFormatted = sort?.toLowerCase() === 'asc' ? 'ASC' : 'DESC';
  const [result] = await pool.query(`SELECT * FROM product WHERE category LIKE ? ORDER BY retailed_price ${sortFormatted} LIMIT ? OFFSET ?`, [searchQuery, limit, offset]);
  return result;
}

const searchProduct = async (q) => {
  const searchQuery = `%${q}%`;
  const [rows] = await pool.query('SELECT * FROM product WHERE id LIKE ? OR name LIKE ? or category LIKE ? OR manufacturer LIKE ?', [searchQuery, searchQuery, searchQuery, searchQuery]);
  return rows;
}

const addProduct = async (product) => {
  const { id, name, imported_price, retailed_price, quantity, manufacturer, image, cpu, ram, storage, screen, description, category } = product;

  const [result] = await pool.query('INSERT INTO product (id, name, imported_price, retailed_price, \
                                      quantity, manufacturer, image, cpu, \
                                      ram, storage, screen, description, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
                                      [id, name, imported_price, retailed_price, quantity, manufacturer, image, cpu, ram, storage, screen, description, category]
  );

  return result;
}

const deleteProduct = async (id) => {
  const [result] = await pool.query('DELETE FROM product WHERE id = ?', [id]);
  return result;
}

const filterProducts = async (filter) => {
  const {
    category,
    ram,
    storage,
    priceMin,
    priceMax,
    limit = 12,
    // offset = 0
  } = filter;

   let sql = 'SELECT * FROM product WHERE 1=1';
  const params = [];

  if (category) {
    sql += ' AND category LIKE ?';
    params.push(`%${category}%`);
  }

  if (ram) {
    sql += ' AND ram = ?';
    params.push(ram);
  }

  if (storage) {
    sql += ' AND storage = ?';
    params.push(storage);
  }

  if (priceMin) {
    sql += ' AND retailed_price >= ?';
    params.push(priceMin);
  }

  if (priceMax) {
    sql += ' AND retailed_price <= ?';
    params.push(priceMax);
  }

  sql += ' LIMIT ?';
  params.push(Number(limit));

  const [rows] = await pool.query(sql, params);
  return rows;
}

module.exports = { 
  getAllProducts, 
  getProductById, 
  searchProduct, 
  addProduct,
  deleteProduct,
  getProductsByCategory,
  getProductsByRam,
  getProductsBySSD,
  getProductsByPriceMax,
  getProductsByPriceMin,
  filterProducts,
  getProductQuantity,
  getProductsByCategorySorted
};