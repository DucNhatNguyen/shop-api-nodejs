import { CategoryService } from '*/services/category.service'
import { HttpStatusCode } from '*/utilities/constants'

const createNew = async (req, res) => {
  try {
    const result = await CategoryService.createNew(req.body)
    res.status(HttpStatusCode.OK).json(result)

  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message
    })
  }
}

const getCategories = async (req, res) => {
  try {
    const result = await CategoryService.getCategories()
    res.status(HttpStatusCode.OK).json(result)

  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message
    })
  }
}

export const CategoryController = { createNew, getCategories }