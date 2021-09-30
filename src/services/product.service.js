import { ProductModel } from '*/models/product.model'

const createNew = async (data) => {
  try {

    const result = await ProductModel.createNew(data)
    return result

  } catch (error) {
    throw new Error(error)
  }
}

export const ProductService = { createNew }