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

const getSales = async (req, res) => {
  try {
    const result = await ProductService.getSales()
    res.status(HttpStatusCode.OK).json(result)

  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message
    })
  }
}

const getNewProducts = async (req, res) => {
  try {
    const result = await ProductService.getNewProducts()
    res.status(HttpStatusCode.OK).json(result)

  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message
    })
  }
}

const getDetail = async (req, res) => {
  try {
    const { id } = req.params
    const result = await ProductService.getDetail(id)
    res.status(HttpStatusCode.OK).json(result)

  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message
    })
  }
}

export const ProductController = { createNew, getSales, getNewProducts, getDetail }