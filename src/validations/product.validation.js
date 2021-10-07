import Joi from 'joi'
import { HttpStatusCode } from '*/utilities/constants'

const createNew = async (req, res, next) => {
  const condition = Joi.object({
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
  try {
    await condition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      errors: new Error(error).message
    })
  }
}

const getProductByCategoryID = async (req, res, next) => {
  const condition = Joi.object({
    productCode: Joi.string().required().min(2).max(20).trim(),
    categoryID: Joi.string().required().min(2).max(30).trim()
  })
  try {
    await condition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      errors: new Error(error).message
    })
  }
}

export const ProductValidation = { createNew, getProductByCategoryID }