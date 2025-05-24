
const db = require('../database/db.js');

const getAllOrders = async () => {
  const [rows] = await db.query('SELECT * FROM `order` WHERE status = ?  ORDER BY created_at DESC', ['PENDING']);
  return rows;
}

const addOrder = async (order) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const { id, name, phonenumber, total_quantity, total_price, address, payment_method, code, products } = order;
    const [result] = await db.query('INSERT INTO `order`(id, customer_name, customer_phone, total_quantity, total_price, address, payment_method, code) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [id, name, phonenumber, total_quantity, total_price, address, payment_method, code]);
    
    for(const p of products) {
      await conn.query('INSERT INTO order_detail(order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)', [id, p.id, p.quantity, p.retailed_price])
      await conn.query('UPDATE product SET quantity = quantity - ? WHERE id = ?', [Number(p.quantity), p.id])
    }

    await conn.commit();
    return result;
  }
  catch(err) {
    await conn.rollback();
    throw err;
  }
  finally {
    conn.release();
  }
}

const getPendingOrderQuantity = async () => {
  const [result] = await db.query('SELECT COUNT(*) FROM `order` WHERE status = \'PENDING\'');
  return result[0];
}

const getRevenueByMonth = async () => {
  const [result] = await db.query(`SELECT \
                                    MONTH(created_at) as month, \
                                    SUM(total_price) as revenue \
                                    FROM \`order\` \
                                    WHERE status = 'CONFIRMED' \
                                    GROUP BY MONTH(created_at)`);
  return result;
}

const getTop5ProductsSold = async () => {
  const [result] = await db.query(`SELECT od.product_id,
                                    p.name,
                                    SUM(od.quantity) as sold
                                    FROM order_detail od
                                    JOIN product p ON od.product_id = p.id
                                    GROUP BY od.product_id LIMIT 5
  `);
  return result;
}

const getOrderStatus = async (id) => {
  const [result] = await db.query('SELECT status FROM `order` WHERE id = ?', [id]);
  return result[0]?.status;
}

const updateOrderStatus = async (id, newStatus) => {
  const [result] = await db.query('UPDATE `order` SET status = ? WHERE id = ?', [newStatus, id]);
  return result;
}

const getOrderById = async (id) => {
  const [order] = await db.query(`SELECT od.id,
                                    od.customer_phone,
                                    od.total_price,
                                    od.total_quantity,
                                    od.created_at,
                                    od.payment_method,
                                    od.status,
                                    od.salesperson_id,
                                    od.customer_name,
                                    od.address,
                                    CONCAT(u.firstname, ' ', u.lastname) as salesperson_name
                                    FROM \`order\` od
                                    LEFT JOIN user u ON od.salesperson_id = u.id
                                    WHERE od.id = ? AND od.status = ?`, [id, 'PENDING']);
  // // const [details] = await db.query(`SELECT od_d.product_id, 
  // //                                     od_d.quantity, 
  // //                                     od_d.price, 
  // //                                     p.name
  // //                                     FROM order_detail od_d
  // //                                     JOIN product p ON od_d.product_id = p.id
  // //                                     WHERE order_id = ?`, [id]
  // //   );
  
  // return {
  //   ...order[0],
  //   details
  // }

  if(order[0]) {
    const [details] = await db.query(`SELECT od_d.product_id, 
                                      od_d.quantity, 
                                      od_d.price, 
                                      p.name
                                      FROM order_detail od_d
                                      JOIN product p ON od_d.product_id = p.id
                                      WHERE order_id = ?`, [id]
      );
      return {
      ...order[0],
      details
      }
  }

  return null;
}

const getOrderByPhoneOrId = async (searchTerm) => {
  const searchQuery = `%${searchTerm}%`;
  console.log(searchTerm);
  const [result] = await db.query('SELECT * FROM `order` WHERE customer_phone = ? OR id = ? AND status = ?', [searchTerm, searchTerm, 'PENDING']);
  return result;
}

const getSaleHistory = async () => {
  const [result] = await db.query('SELECT * FROM `order` WHERE NOT status = ?', ['PENDING']);
  return result;
}

const getSaleHistoryByPhoneOrId = async (searchTerm) => {
  const searchQuery = `%${searchTerm}%`;
  console.log(searchTerm);
  const [result] = await db.query('SELECT * FROM `order` WHERE customer_phone = ? OR id = ? AND NOT status = ?', [searchTerm, searchTerm, 'PENDING']);
  return result;
}

const getSaleHistoryById = async (id) => {
  const [order] = await db.query(`SELECT od.id,
                                    od.customer_phone,
                                    od.total_price,
                                    od.total_quantity,
                                    od.created_at,
                                    od.payment_method,
                                    od.status,
                                    od.salesperson_id,
                                    od.customer_name,
                                    od.address,
                                    CONCAT(u.firstname, ' ', u.lastname) as salesperson_name
                                    FROM \`order\` od
                                    LEFT JOIN user u ON od.salesperson_id = u.id
                                    WHERE od.id = ? AND NOT od.status = ?`, [id, 'PENDING']
  );

  if(order[0]) {
    const [details] = await db.query(`SELECT od_d.product_id, 
                                      od_d.quantity, 
                                      od_d.price, 
                                      p.name
                                      FROM order_detail od_d
                                      JOIN product p ON od_d.product_id = p.id
                                      WHERE order_id = ?`, [id]
      );
      return {
      ...order[0],
      details
      }
  }
  
  return null;
}
  

module.exports = {
  addOrder,
  getAllOrders,
  getOrderStatus,
  updateOrderStatus,
  getPendingOrderQuantity,
  getRevenueByMonth,
  getTop5ProductsSold,
  getOrderById,
  getSaleHistory,
  getSaleHistoryByPhoneOrId,
  getOrderByPhoneOrId,
  getSaleHistoryById
}