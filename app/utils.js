
/**
 * Takes an array of products and returns an array of objects with name and image properties
 * @param {Object[]} products products from the state
 * @returns {Object[]} returns array of objects with name and image properties
 */
export const getCategories = (products) => {
  let categories = {}, categoriesArr = []
  products.forEach((product) => {
    let currentCategory = product.category
    
    // Add each unique category to the array as an object
    if (!categories[currentCategory]) {
      categories[currentCategory] = {
        name: currentCategory,
        image: product.imgUrls[0]
      }
      categoriesArr.push(categories[currentCategory])
    }
  })
  return categoriesArr
}

export default getCategories
