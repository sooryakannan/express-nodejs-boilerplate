const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { customerService } = require('../services');

const createCustomer = catchAsync(async (req, res) => {
  const Customer = await customerService.createCustomer(req.body);
  res.status(httpStatus.CREATED).send(Customer);
});

const getCustomers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await customerService.getCustomers();
  res.send(result);
});

const getCustomer = catchAsync(async (req, res) => {
  const Customer = await customerService.getCustomerById(req.params.CustomerId);
  if (!Customer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Customer not found');
  }
  res.send(Customer);
});

const updateCustomer = catchAsync(async (req, res) => {
  const Customer = await customerService.updateCustomerById(req.params.CustomerId, req.body);
  res.send(Customer);
});

const deleteCustomer = catchAsync(async (req, res) => {
  await customerService.deleteCustomerById(req.params.CustomerId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCustomer,
  getCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
};
