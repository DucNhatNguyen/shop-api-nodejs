import Joi from 'joi'
import { HttpStatusCode } from '*/utilities/constants'

const createNew = async (req, res, next) => {
  const condition = Joi.object({
    categoryCode: Joi.string().required().min(2).max(20).trim(),
    categoryName: Joi.string().required().min(2).max(200).trim(),
    categoryParentId: Joi.string().min(2).max(30).default(null).trim()
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

export const CategoryValidation = { createNew }