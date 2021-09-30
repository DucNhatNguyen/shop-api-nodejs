import express from 'express'
import { ProductController } from '*/controllers/product.controller.js'
import { ProductValidation } from '*/validations/product.validation'

const router = express.Router()

router.route('/')
  //.get((req, res) => console.log('Get product'))
  .post(ProductValidation.createNew, ProductController.createNew)

export const productRoutes = router