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
  description: Joi.string().default('').trim(),
  image: Joi.array().items(Joi.object({
    imageName: Joi.string().default(null).trim(),
    imageFolder: Joi.string().default(null).trim(),
    isMain:  Joi.boolean().default(false)
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

const getSales = async () => {
  try {
    const result = await getDB().collection(productCollectionName)
      .aggregate([
        {
          $match: {
            $and: [
              { isSale: { $eq: true } },
              { quantity: { $gt: 0 } }
            ]
          }
        },
        {
          $lookup:
          {
            from: 'categories',
            localField: 'categoryID',
            foreignField: 'categoryCode',
            as: 'Category'
          }
        },
        {
          $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ '$Category', 0 ] }, '$$ROOT' ] } }
        },
        { $project: { Category: 0 } }
      ]).toArray()

    return result

  } catch (error) {
    throw new Error(error) //day loi sang service -> day cho controller -> show error
  }
}

const getNewProducts = async () => {
  try {
    const result = await getDB().collection(productCollectionName)
      .aggregate([
        {
          $match: {
            $and: [
              { isNew: { $eq: true } },
              { quantity: { $gt: 0 } }
            ]
          }
        },
        {
          $lookup:
          {
            from: 'categories',
            localField: 'categoryID',
            foreignField: 'categoryCode',
            as: 'Category'
          }
        },
        {
          $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ '$Category', 0 ] }, '$$ROOT' ] } }
        },
        { $project: { Category: 0 } }
      ]).toArray()

    return result

  } catch (error) {
    throw new Error(error) //day loi sang service -> day cho controller -> show error
  }
}

const getDetail = async (id) => {
  try {
    const result = await getDB().collection(productCollectionName)
      .aggregate([
        {
          $match: {
            $and: [
              { productCode: { $eq: id } }
            ]
          }
        },
        {
          $lookup:
          {
            from: 'categories',
            localField: 'categoryID',
            foreignField: 'categoryCode',
            as: 'Category'
          }
        },
        {
          $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ '$Category', 0 ] }, '$$ROOT' ] } }
        },
        { $project: { Category: 0 } }
      ]).toArray()

    return result[0] || {}

  } catch (error) {
    throw new Error(error) //day loi sang service -> day cho controller -> show error
  }
}

const getSideDishes = async () => {
  try {
    const result = await getDB().collection(productCollectionName)
      .aggregate([
        {
          $match: {
            $and: [
              { categoryID: { $eq: 'CA-07' } }
            ]
          }
        },
        {
          $lookup:
          {
            from: 'categories',
            localField: 'categoryID',
            foreignField: 'categoryCode',
            as: 'Category'
          }
        },
        {
          $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ '$Category', 0 ] }, '$$ROOT' ] } }
        },
        { $project: { Category: 0 } }
      ]).toArray()

    return result

  } catch (error) {
    throw new Error(error) //day loi sang service -> day cho controller -> show error
  }
}

export const ProductModel = { createNew, getSales, getNewProducts, getDetail, getSideDishes }