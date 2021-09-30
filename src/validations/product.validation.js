import Joi from 'joi'
import { HttpStatusCode } from '*/utilities/constants'

const createNew = async (req, res, next) => {
  const condition = Joi.object({
    productCode: Joi.string().required().min(2).max(20).trim(),
    productName: Joi.string().required().min(2).max(200).trim(),
    categoryID: Joi.string().required().min(2).max(30).trim(),
    unitPrice: Joi.string().required().min(2).trim()
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

export const ProductValidation = { createNew }