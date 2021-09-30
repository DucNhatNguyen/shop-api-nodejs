import { ProductService } from '*/services/product.service'
import { HttpStatusCode } from '*/utilities/constants'

const createNew = async (req, res) => {
  try {
    const result = await ProductService.createNew(req.body)
    res.status(HttpStatusCode.OK).json(result)

  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message
    })
  }
}

export const ProductController = { createNew }