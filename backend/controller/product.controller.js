const { getAllProductsService, getProductByIdService, searchProductService, addProductService, deleteProductService, getProductsByCategoryService, getProductQuantityService, getSortedProductsByCategoryService, updateProductService } = require('../service/product.service.js');

const getAllProducts = async (req, res) => {  
  try {
    const products = await getAllProductsService();
    res.status(200).json({
      status: 'success',
      message: 'Get all products successfully',
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  }
}

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProductByIdService(id);
    
    if (!product) {
      return res.status(404).json({
        status: 'fail',
        message: 'Product not found',
      });
    }
    console.log(req.user);
    if(!req.user) {
      delete product.imported_date;
      delete product.imported_price;
    }
    res.status(200).json({
      status: 'success',
      message: 'Get product successfully',
      data: product,
    });
  }
  catch(err) {
    console.error(err);
    res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
}

const getProductQuantity = async (req, res) => {
  try {
    const result = await getProductQuantityService();
    res.status(200).json({
      status: 'success',
      data: result
    })
  }
  catch(err) {
    console.error(err.message);
    res.status(500).json({
      status: 'success',
      message: 'Internal server error'
    })
  }
}

const searchProduct = async (req, res) => {
  try {
    const { q } = req.query;
    const products = await searchProductService(q);
    console.log(q);
    if (!products) {
      return res.status(404).json({
        status: 'fail',
        message: 'No products found',
      });
    }
    return res.status(200).json({
      status: 'success',
      message: 'Get product successfully',
      data: products,
    });
  }
  catch(err) {
    console.error(err);
    res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
}


const addProduct = async (req, res) => {
  try {
    const { id, name, imported_price, retailed_price, quantity, manufacturer, image, cpu, ram, storage, screen, weight, description, category } = req.body;
    console.log(id, name, imported_price, retailed_price, manufacturer);
    const result = await addProductService(id, name, imported_price, retailed_price, quantity, manufacturer, image, cpu, ram, storage, screen, weight, description, category);

    return res.status(201).json({
      status: 'success',
      message: 'Product added successfully',
      data: result,
    });
  }
  catch (err) {
    console.error(err.message);
    if(err.code === 'PRODUCT_EXISTS') {
      return res.status(400).json({
        status: 'fail',
        message: 'Product already exists',
      });
    }

    if(err.code === 'PRODUCT_ID_REQUIRED') {
      return res.status(400).json({
        status: 'fail',
        message: 'Product ID is required',
      });
    }

    if(err.code === 'PRODUCT_NAME_REQUIRED') {
      return res.status(400).json({
        status: 'fail',
        message: 'Product name is required',
      });
    }

    if(err.code === 'PRODUCT_IMPORTED_PRICE_REQUIRED') {
      return res.status(400).json({
        status: 'fail',
        message: 'Imported price is required',
      });
    }

    if(err.code === 'PRODUCT_RETAILED_PRICE_REQUIRED') {
      return res.status(400).json({
        status: 'fail',
        message: 'Retailed price is required',
      });
    }

    res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
}

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteProductService(id);
    return res.status(200).json({
      status: 'success',
      message: 'Product deleted successfully',
      data: result,
    });
  }
  catch(err) {
    console.error(err);

    if(err.code === 'PRODUCT_NOT_FOUND') {
      return res.status(404).json({
        status: 'fail',
        message: 'Product not found',
      });
    }

    res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
}

const getProductsByCategory = async (req, res) => {
  try {
    console.log("hêlo");
    const { category } = req.params;
    const { sort, limit, offset } = req.query;
    console.log(limit, offset);
    const products = await getSortedProductsByCategoryService(category, sort, limit, offset);

    return res.status(200).json({
      status: 'success',
      message: 'Lấy sản phẩm thành công',
      data: products
    })
  }
  catch(err) {
    console.error(err);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
      
    })
  }
} 

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = req.body;
    console.log(product);
    if(req.file) {
      console.log("Hình ảnh: " + req.file.filename)
      product.image = req.file.filename;
    }

    console.log(product);

    const result = await updateProductService(id, product);
    if(result.affectedRows > 0) {
      res.status(200).json({
        status: 'success',
        message: 'Cập nhật sản phẩm thành công',
        data: product
      })
    }
    else {
      res.status(404).json({
        status: 'fail',
        message: 'Không tìm thấy sản phẩm',
        // data: product
      })
    }
  
  }
  catch(err) {
    console.error("Lỗi: " + err.message);
    res.status(500).json({
      status: 'fail',
      message: err.message || 'Có lỗi xảy ra khi cập nhật sản phẩm. Vui lòng thử lại',
    })
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  searchProduct,
  addProduct, 
  deleteProduct,
  getProductsByCategory,
  getProductQuantity,
  updateProduct
}