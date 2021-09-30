import express from 'express'
import { HttpStatusCode } from '*/utilities/constants.js'
import { productRoutes } from './product.route.js'
import { categoryRoutes } from './category.route.js'

const router = express.Router()

/**
 * GET v1/product
 */
router.get('/product-detail', (req, res) => res.status(HttpStatusCode.OK).json({
  status: 'OK'
}))

// APIs Product
router.use('/products', productRoutes)


// APIs Category
router.use('/categories', categoryRoutes)


export const apiV1 = router