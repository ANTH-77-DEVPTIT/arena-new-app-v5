import Controller from '../../controller/product_graphQL.js'

export default function productsGraphQLRoute(app) {
  app.get('/api/products_graph', Controller.find)
}
