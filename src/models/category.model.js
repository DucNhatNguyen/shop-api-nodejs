import Joi from 'joi'
import { ObjectID } from 'mongodb'
import { getDB } from '../config/mongodb.js'

// Define Category collection
const categoryCollectionName = 'categories'
const categoryCollectionSchema = Joi.object({
  categoryCode: Joi.string().required().min(2).max(20).trim(),
  categoryName: Joi.string().required().min(2).max(200).trim(),
  categoryParentId: Joi.string().min(2).max(30).default(null).trim()
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
    const op = await getDB()
      .collection(categoryCollectionName)
      .insertOne(value)
    console.log('ops> ', op)
    const result = getDB().collection(categoryCollectionName).findOne({ categoryCode: data.categoryCode })
    return result

  } catch (error) {
    throw new Error(error) //day loi sang service -> day cho controller -> show error
  }
}

const getCategories = async () => {
  try {
    const result = await getDB()
      .collection(categoryCollectionName)
      .aggregate([
        {
          $graphLookup:{
            from: categoryCollectionName,
            startWith: '$categoryCode',
            connectFromField: 'categoryCode',
            connectToField: 'categoryParentId',
            as: 'Child'
          }
        }
      ]).toArray()
    return result

  } catch (error) {
    throw new Error(error) //day loi sang service -> day cho controller -> show error
  }
}

export const CategoryModel = { createNew, getCategories }