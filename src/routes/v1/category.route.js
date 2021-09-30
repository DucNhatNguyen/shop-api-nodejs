import express from 'express'
import { CategoryController } from '*/controllers/category.controller.js'
import { CategoryValidation } from '*/validations/category.validation'

const router = express.Router()

router.route('/')
  .post(CategoryValidation.createNew, CategoryController.createNew)

router.route('/')
  .get(CategoryController.getCategories)

export const categoryRoutes = router