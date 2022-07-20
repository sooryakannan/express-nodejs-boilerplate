const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { productService } = require('../services');

const createProduct = catchAsync(async (req, res) => {
  const Product = await productService.createProduct(req.body);
  res.status(httpStatus.CREATED).send(Product);
});

const getProducts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await productService.getProducts();
  res.send(result);
});

const getProduct = catchAsync(async (req, res) => {
  const Product = await productService.getProductById(req.params.ProductId);
  if (!Product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  res.send(Product);
});

const updateProduct = catchAsync(async (req, res) => {
  const Product = await productService.updateProductById(req.params.ProductId, req.body);
  res.send(Product);
});

const deleteProduct = catchAsync(async (req, res) => {
  await productService.deleteProductById(req.params.ProductId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
