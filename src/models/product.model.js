import Joi from 'joi'
import { getDB } from '../config/mongodb.js'

// Define Product Colection
const productCollectionName = 'products'
const productCollectionSchema = Joi.object({
  productID: Joi.string().required().min(2).max(20),
  productName: Joi.string().required().min(2).max(200),
  categoryID: Joi.string().required().min(2).max(30),
  unitPrice: Joi.string().required().min(2),
  quantity: Joi.number().default(0),
  isSale: Joi.boolean().default(false),
  isNew: Joi.boolean().default(false),
  reduceRate: Joi.number().default(0),
  description: Joi.string().default(null),
  image: Joi.array().items(Joi.object({
    imageName: Joi.string().default(null),
    imageFolder: Joi.string().default(null)
  })).default([])
})

/*
  - validate data trước khi lưu vào DB,
  - abortEarly default = true, nó sẽ trả về đầy đủ lỗi khi validate sai
*/
const validateSchema = async (data) => {
  return await productCollectionSchema.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const value = await validateSchema(data)
    await getDB()
      .collection(productCollectionName)
      .insertOne(value)

    const result = getDB().collection(productCollectionName).findOne({ productID: data.productID })
    return result

  } catch (error) {
    console.log(error)
  }
}

export const ProductModel = { createNew }