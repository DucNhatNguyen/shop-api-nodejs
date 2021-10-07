import { ProductModel } from '*/models/product.model'

const createNew = async (data) => {
  try {

    const result = await ProductModel.createNew(data)
    return result

  } catch (error) {
    throw new Error(error)
  }
}

const getSales = async () => {
  try {
    let list = []
    const result = await ProductModel.getSales()
    result.forEach(i => {
      list.push({
        ProductId: i.productCode,
        ProductName: i. productName,
        CategoryName: i.categoryName,
        categoryParentId: i.categoryParentId,
        UnitPrice: parseInt(i.unitPrice),
        Quantity: i.quantity,
        IsSale: i.isSale,
        ReduceRate: i.reduceRate,
        OwnPrice: parseInt(i.unitPrice),
        SalePrice: (parseInt(i.unitPrice) * ((100 - parseInt(i.reduceRate)) / 100)),
        imgLink: 'https://cp1.awardspace.net/file-manager/readFileContents?fileName=' + i.image[0].imageName + '&filePath=%2F' + i.image[0].imageName + '&direct=yes'
      })
    })
    return list

  } catch (error) {
    throw new Error(error)
  }
}

const getNewProducts = async () => {
  try {
    let list = []
    const result = await ProductModel.getNewProducts()
    result.forEach(i => {
      list.push({
        ProductId: i.productCode,
        ProductName: i. productName,
        CategoryName: i.categoryName,
        UnitPrice: parseInt(i.unitPrice),
        Quantity: i.quantity,
        IsNew: i.isNew,
        ReduceRate: i.reduceRate,
        OwnPrice: parseInt(i.unitPrice),
        SalePrice: (parseInt(i.unitPrice) * ((100 - parseInt(i.reduceRate)) / 100)),
        imgLink: 'https://cp1.awardspace.net/file-manager/readFileContents?fileName=' + i.image[0].imageName + '&filePath=%2F' + i.image[0].imageName + '&direct=yes'
      })
    })
    return list

  } catch (error) {
    throw new Error(error)
  }
}

const getDetail = async (id) => {
  try {
    let listSide = []
    const result = await ProductModel.getDetail(id)
    const sideDishes = await ProductModel.getSideDishes()
    sideDishes.forEach(i => {
      listSide.push({
        ProductId: i.productCode,
        ProductName: i. productName,
        CategoryName: i.categoryName,
        UnitPrice: parseInt(i.unitPrice),
        imgLink: 'https://cp1.awardspace.net/file-manager/readFileContents?fileName=' + i.image[0].imageName + '&filePath=%2F' + i.image[0].imageName + '&direct=yes'
      })
    })


    const response = {
      detail: {
        ProductId: result.productCode,
        ProductName: result. productName,
        CategoryName: result.categoryName,
        CategoryID: result.categoryID,
        Description: result.description,
        UnitPrice: parseInt(result.unitPrice),
        Quantity: result.quantity,
        IsSale: result.isSale,
        ReduceRate: result.reduceRate,
        OwnPrice: parseInt(result.unitPrice),
        SalePrice: (parseInt(result.unitPrice) * ((100 - parseInt(result.reduceRate)) / 100)),
        imgLink: 'https://cp1.awardspace.net/file-manager/readFileContents?fileName=' + result.image[0].imageName + '&filePath=%2F' + result.image[0].imageName + '&direct=yes'
      },
      sideDishes: listSide
    }
    return response

  } catch (error) {
    throw new Error(error)
  }
}

const getProductRelative = async (id) => {
  try {
    let list = []
    const result = await ProductModel.getProductRelative(id)
    result.forEach(i => {
      list.push({
        ProductId: i.productCode,
        ProductName: i. productName,
        CategoryName: i.categoryName,
        UnitPrice: parseInt(i.unitPrice),
        Quantity: i.quantity,
        IsNew: i.isNew,
        ReduceRate: i.reduceRate,
        OwnPrice: parseInt(i.unitPrice),
        SalePrice: (parseInt(i.unitPrice) * ((100 - parseInt(i.reduceRate)) / 100)),
        imgLink: 'https://cp1.awardspace.net/file-manager/readFileContents?fileName=' + i.image[0].imageName + '&filePath=%2F' + i.image[0].imageName + '&direct=yes'
      })
    })
    return list

  } catch (error) {
    throw new Error(error)
  }
}

const getProductByCategoryId = async(id, limit = 0, skip = 0) => {
  try {
    let list = []
    const result = await ProductModel.getProductByCategoryId(id, limit, skip)
    result.data.forEach(i => {
      list.push({
        ProductId: i.productCode,
        ProductName: i. productName,
        CategoryName: i.categoryName,
        UnitPrice: parseInt(i.unitPrice),
        Quantity: i.quantity,
        IsNew: i.isNew,
        ReduceRate: i.reduceRate,
        OwnPrice: parseInt(i.unitPrice),
        SalePrice: (parseInt(i.unitPrice) * ((100 - parseInt(i.reduceRate)) / 100)),
        imgLink: 'https://cp1.awardspace.net/file-manager/readFileContents?fileName=' + i.image[0].imageName + '&filePath=%2F' + i.image[0].imageName + '&direct=yes'
      })
    })

    const response = {
      data: list,
      categoryName: result.categoryName,
      total: result.total
    }
    return response

  } catch (error) {
    throw new Error(error)
  }
}

export const ProductService = { createNew,
  getSales,
  getNewProducts,
  getDetail,
  getProductRelative,
  getProductByCategoryId
}