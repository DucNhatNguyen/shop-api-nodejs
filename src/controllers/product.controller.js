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

const getProductRelative = async (req, res) => {
  try {
    const { id } = req.params
    const result = await ProductService.getProductRelative(id)
    res.status(HttpStatusCode.OK).json(result)

  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message
    })
  }
}

const getProductByCategoryId = async (req, res) => {
  try {
    //const { id, limit, skip } = req.params
    var id = req.query.id
    var limit = req.query.limit
    var skip = req.query.skip

    const result = await ProductService.getProductByCategoryId(id, limit, skip)
    res.status(HttpStatusCode.OK).json(result)

  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message
    })
  }
}

export const ProductController = { createNew,
  getSales,
  getNewProducts,
  getDetail,
  getProductRelative,
  getProductByCategoryId }