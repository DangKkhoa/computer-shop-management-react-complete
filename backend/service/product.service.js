const { getAllProducts, getProductById, searchProduct, addProduct, deleteProduct, getProductsByCategory, getProductQuantity, getProductsByCategorySorted } = require('../model/product.model.js')

const getAllProductsService = async () => {
  const products = await getAllProducts();
  return products;
}

const getProductByIdService = async (id) => {
  const product = await getProductById(id);
  return product;
}

const getProductQuantityService = async () => {
  const result = await getProductQuantity();
  return result["COUNT(*)"];
}

const getSortedProductsByCategoryService = async (category, sort, limit, offset) => {
  if(sort !== 'undefined') {
    console.log("sort = " + sort);
    const result = await getProductsByCategorySorted(category, sort, limit, offset);
    return result;
  }

  const result = await getProductsByCategory(category, limit, offset);
  return result;
}

const searchProductService = async (q) => {

  const products = await searchProduct(q.trim());
  return products;
}

const addProductService = async (id, name, imported_price, retailed_price, quantity, manufacturer, image, cpu, ram, storage, screen, weight, description, category) => {
  const existingProduct = await getProductById(id);
  if (existingProduct) {
    const error = new Error('Product ID already exists');
    error.code = 'PRODUCT_EXISTS';
    throw error;
  }

  if(!id) {
    const error = new Error('Product ID is required');
    error.code = 'PRODUCT_ID_REQUIRED';
    throw error;
  }

  if(!name) {
    const error = new Error('Product name is required');
    error.code = 'PRODUCT_NAME_REQUIRED';
    throw error;
  }

  if(!imported_price) {
    const error = new Error('Imported price is required');
    error.code = 'PRODUCT_IMPORTED_PRICE_REQUIRED';
    throw error;
  }
  if(!retailed_price) {
    const error = new Error('Retailed price is required');
    error.code = 'PRODUCT_RETAILED_PRICE_REQUIRED';
    throw error;
  }

  const date = new Date();

  const newProduct = {
    id,
    name,
    imported_price,
    retailed_price,
    quantity,
    manufacturer,
    image,
    cpu,
    ram,
    storage,
    screen,
    weight,
    description,
    category
  }

  const result = await addProduct(newProduct);

  if(result.affectedRows === 0) {
    const error = new Error('Failed to add product');
    error.code = 'ADD_PRODUCT_FAILED';
    throw error;
  }

  return result;
}

const deleteProductService = async (id) => {
  const product = await getProductById(id);
  if (!product) {
    const error = new Error('Product not found');
    error.code = 'PRODUCT_NOT_FOUND';
    throw error;
  }

  const result = await deleteProduct(id);
  if(result.affectedRows === 0) {
    const error = new Error('Failed to delete product');
    error.code = 'DELETE_PRODUCT_FAILED';
    throw error;
  }
  return result;
}

const filterProductService = async (filter) => {

}

const getProductsByCategoryService = async (category, limit, offset) => {
  const products = await getProductsByCategory(category, limit, offset);
  return products;
}

module.exports = {
  getAllProductsService,
  getProductByIdService,
  searchProductService,
  addProductService,
  deleteProductService,
  getProductsByCategoryService,
  getProductQuantityService,
  getSortedProductsByCategoryService
}