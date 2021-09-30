import Joi from 'joi'
import { getDB } from '../config/mongodb.js'

// Define Product Colection
const productCollectionName = 'products'
const productCollectionSchema = Joi.object({
  productCode: Joi.string().required().min(2).max(20).trim(),
  productName: Joi.string().required().min(2).max(200).trim(),
  categoryID: Joi.string().required().min(2).max(30).trim(),
  unitPrice: Joi.string().required().min(2).trim(),
  quantity: Joi.number().default(0),
  isSale: Joi.boolean().default(false),
  isNew: Joi.boolean().default(false),
  reduceRate: Joi.number().default(0),
  description: Joi.string().default(null).trim(),
  image: Joi.array().items(Joi.object({
    imageName: Joi.string().default(null).trim(),
    imageFolder: Joi.string().default(null).trim()
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
    const op = await getDB()
      .collection(productCollectionName)
      .insertOne(value)

    const result = getDB().collection(productCollectionName).findOne({ productCode: data.productCode })
    return result

  } catch (error) {
    throw new Error(error) //day loi sang service -> day cho controller -> show error
  }
}

export const ProductModel = { createNew }