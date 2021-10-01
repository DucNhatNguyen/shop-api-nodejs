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
        productName: i.productName,
        unitPrice: i. unitPrice,
        quantity: i.quantity,
        imgLink: 'https://cp1.awardspace.net/file-manager/readFileContents?fileName=' + i.image[0].imageName + '&filePath=%2F' + i.image[0].imageName + '&direct=yes'
      })
    })
    return list

  } catch (error) {
    throw new Error(error)
  }
}

export const ProductService = { createNew, getSales }