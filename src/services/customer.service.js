const httpStatus = require('http-status');
const { Customer } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Customer
 * @param {Object} CustomerBody
 * @returns {Promise<Customer>}
 */
const createCustomer = async (CustomerBody) => {
  if (await Customer.isEmailTaken(CustomerBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return Customer.create(CustomerBody);
};

/**
 * Query for Customers
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCustomers = async (filter, options) => {
  const Customers = await Customer.paginate(filter, options);
  return Customers;
};

/**
 * Get Customer by id
 * @param {ObjectId} id
 * @returns {Promise<Customer>}
 */
const getCustomerById = async (id) => {
  return Customer.findById(id);
};
/**
 * Get Customer 
 * @returns {Promise<Customer>}
 */
const getCustomers = async () => {
  return Customer.find();
};

/**
 * Get Customer by email
 * @param {string} email
 * @returns {Promise<Customer>}
 */
const getCustomerByEmail = async (email) => {
  return Customer.findOne({ email });
};

/**
 * Update Customer by id
 * @param {ObjectId} CustomerId
 * @param {Object} updateBody
 * @returns {Promise<Customer>}
 */
const updateCustomerById = async (CustomerId, updateBody) => {
  const customer = await getCustomerById(CustomerId);
  if (!customer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Customer not found');
  }
  if (updateBody.email && (await Customer.isEmailTaken(updateBody.email, CustomerId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(customer, updateBody);
  await customer.save();
  return customer;
};

/**
 * Delete Customer by id
 * @param {ObjectId} CustomerId
 * @returns {Promise<Customer>}
 */
const deleteCustomerById = async (CustomerId) => {
  const Customer = await getCustomerById(CustomerId);
  if (!Customer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Customer not found');
  }
  await Customer.remove();
  return Customer;
};

module.exports = {
  createCustomer,
  queryCustomers,
  getCustomerById,
  getCustomers,
  getCustomerByEmail,
  updateCustomerById,
  deleteCustomerById,
};
