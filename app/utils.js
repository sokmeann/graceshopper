function getCategories(products) {
  let categories = {}, categoriesArr = []
  products.forEach((product) => {
    let currentCategory = product.category
    if (!categories[currentCategory]) {
      categories[currentCategory] = {
        category: currentCategory,
        image: product.image
      }
    }
  })

  for (let category in categories) {
    categoriesArr.push(category)
  }

  return categoriesArr//some array
}