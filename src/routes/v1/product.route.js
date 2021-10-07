import express from 'express'
import { ProductController } from '*/controllers/product.controller.js'
import { ProductValidation } from '*/validations/product.validation'

const router = express.Router()

router.route('/')
  //.get((req, res) => console.log('Get product'))
  .post(ProductValidation.createNew, ProductController.createNew)

router.route('/sales')
  .get(ProductController.getSales)

router.route('/news')
  .get(ProductController.getNewProducts)

router.route('/detail/:id')
  .get(ProductController.getDetail)

router.route('/getProductRelative/:id')
  .get(ProductController.getProductRelative)

router.route('/getProductByCategoryId')
  .get(ProductController.getProductByCategoryId)

export const productRoutes = router