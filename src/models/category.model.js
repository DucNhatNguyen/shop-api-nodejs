import Joi from 'joi'
import { getDB } from '../config/mongodb.js'

// Define Category collection
const categoryCollectionName = 'categories'
const categoryCollectionSchema = Joi.object({
  categoryID: Joi.string().required().min(2).max(20),
  categoryName: Joi.string().required().min(2).max(200),
  categoryParentId: Joi.string().required().min(2).max(30)
})

/*
  - validate data trước khi lưu vào DB,
  - abortEarly default = true, nó sẽ trả về đầy đủ lỗi khi validate sai
*/
const validateSchema = async (data) => {
  return await categoryCollectionSchema.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const value = await validateSchema(data)
    await getDB()
      .collection(categoryCollectionName)
      .insertOne(value)

    const result = getDB().collection(categoryCollectionName).findOne({ categoryID: data.categoryID })
    return result

  } catch (error) {
    console.log(error)
  }
}

export const ProductModel = { createNew }