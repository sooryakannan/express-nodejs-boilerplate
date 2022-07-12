const express = require('express');
const router = express.Router();
const validate = require('../../middlewares/validate');
const customerValidation = require('../../validations/customer.validation');
const customerController = require('../../controllers/customer.controller');

router
  .route('/')
  .post(validate(customerValidation.createCustomer), customerController.createCustomer)
  .get(customerController.getCustomers);



  router
  .route('/:CustomerId')
  .get(validate(customerValidation.getCustomer), customerController.getCustomer)
  .patch(validate(customerValidation.updateCustomer), customerController.updateCustomer)
  .delete(validate(customerValidation.deleteCustomer), customerController.deleteCustomer);

module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Customer management and retrieval
 */

/**
 * @swagger
 * /Customers:
 *   post:
 *     summary: Create a Customer
 *     description: Only admins can create other Customers.
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - phoneNumber
 *               - age
 *               - location
 *               - pin
 *               - dob
 *               - gender
 *               - domain
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               phoneNumber:
 *                 type: number               
 *               age:
 *                 type: number
 *               location:
 *                 type: string
 *               pin:
 *                  type: number
 *               dob:
 *                  type: date
 *               gender:
 *                  type: string
 *               domain:
 *                  type: string
 *               
 *             example:
 *               firstName: hooo
 *               lastName: foo
 *               email: fake@example.com
 *               phoneNumber: 8855664422
 *               age: 20
 *               location: london
 *               pin: 666666
 *               dob: 1960-5-26
 *               gender: male
 *               domain: Developer
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Customer'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all Customers
 *     tags: [Customers]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Customer'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /Customers/{id}:
 *   get:
 *     summary: Get a Customer
 *     description: Logged in Customers can fetch only their own Customer information. Only admins can fetch other Customers.
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Customer'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a Customer
 *     description: Logged in Customers can only update their own information. Only admins can update other Customers.
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fistName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               phoneNumber:
 *                 type: number
 *               age:
 *                 type: number
 *               location:
 *                 type: string
 *               pin:
 *                 type: number
 *               dob:
 *                 type: date
 *               gender:
 *                 type: string
 *               domain:
 *                 type: string 
 *             example:
 *               firstName: fakename
 *               lastName: fakename
 *               email: fakename@example.com
 *               phoneNumber: 9988665544
 *               age: 25
 *               location: america
 *               pin: 656651
 *               dob: 1977-05-27
 *               gender: male
 *               domain: developer
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Customer'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a Customer
 *     description: Logged in Customers can delete only themselves. Only admins can delete other Customers.
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer id
 *     responses:
 *       "200":
 *         description: No content
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */