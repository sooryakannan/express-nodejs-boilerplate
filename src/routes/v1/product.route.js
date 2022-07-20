const express = require('express');
const router = express.Router();
const productController = require('../../controllers/product.controller');


router
  .route('/')
  .post(productController.createproduct)
  .get(productController.getproducts);



  router
  .route('/:productId')
  .get( productController.getproduct)
  .patch(productController.updateproduct)
  .delete(productController.deleteproduct);

module.exports = router;


/**
 * @swagger
 * tags:
 *   name: products
 *   description: product management and retrieval
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a product
 *     description: Only admins can create other products.
 *     tags: [products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productName
 *               - price
 *               - dom
 *               - doe
 *               
 *             properties:
 *               productName:
 *                 type: string
 *               price:
 *                 type: number
 *               dom:
 *                  type: date
 *               doe:
 *                  type: date
 *               
 *             example:
 *               productName: apple
 *               price: 30
 *               dom: 2022-7-20
 *               doe: 2022-7-30
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/product'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all products
 *     tags: [products]
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
 *                     $ref: '#/components/schemas/product'
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
 * /products/{id}:
 *   get:
 *     summary: Get a product
 *     description: Logged in products can fetch only their own product information. Only admins can fetch other products.
 *     tags: [products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: product id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/product'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a product
 *     description: Logged in products can only update their own information. Only admins can update other products.
 *     tags: [products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: product id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *               price:
 *                 type: number
 *               dom:
 *                 type: date
 *               doe:
 *                 type: date
 *             example:
 *               productName: apple
 *               price: 30
 *               dom: 2022-7-20
 *               doe: 2022-7-30
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/product'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a product
 *     description: Logged in products can delete only themselves. Only admins can delete other products.
 *     tags: [products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: product id
 *     responses:
 *       "200":
 *         description: No content
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */