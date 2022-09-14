import apiCaller from '../helpers/apiCaller'

const ProductGraphQLApi = {
  find: async (query) => {
    return await apiCaller(`/api/products_graph${query || ''}`)
  },
}

export default ProductGraphQLApi
