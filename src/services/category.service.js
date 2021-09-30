import { CategoryModel } from '*/models/category.model'

const createNew = async (data) => {
  try {

    const result = await CategoryModel.createNew(data)
    return result

  } catch (error) {
    throw new Error(error)
  }
}

const getCategories = async () => {
  try {

    const data = await CategoryModel.getCategories()
    const result = data.filter(x => x.categoryParentId === null)
    return result

  } catch (error) {
    throw new Error(error)
  }
}

export const CategoryService = { createNew, getCategories }