import verifyToken from '../auth/verifyToken.js'
import ResponseHandler from '../helpers/responseHandler.js'
import GraphqlProductMiddleware from '../middlewares/graphql_product.js'

export default {
  submit: async (req, res) => {
    console.log('\n----------------------------------------')
    console.log('/api/submition')
    try {
      const session = await verifyToken(req, res)
      const { shop, accessToken } = session

      /**Hình dung được phải làm gì chưa???
       *Vi du ne:
       * getList product
       * mac dinh thi khong can query o dau, hoac them query vao cung duoc
       * query {
       *  products (first: 3) {
       *    edges {  //Cái này như là một thực thể(entities, relationship)
       *      node { //một product, một phần tử obj trong array edges
       *        title
       *        description
       *        variants (first: 3) {
       *           edges { //giống như trên, products relationship đến variants, Thì phải gọi lại edges -node thôi
       *              node {
       *                title ...
       *              }
       *           }
       *        }
       *      }
       *    }
       *  }
       * }
       *
       * create a product: Phai co mutation o dau
       * mutation {
       *  productCreate(input: {title: "HIHI Truong hung an"}) {
       *    product {
       *      id
       *      title
       *    }
       *  }
       * }
       *
       * const variables = {
       *    id: "grid://shopi...."
       * }
       */

      //Full 5 chức năng của graphql
      /**
       * variables, fragment, query(first), pageInfo, aliases
       */
      //  query FirstTenProducts($after:String!) {
      //   products(first:10, query:"status:ACTIVE", after:$after) {
      //     edges {
      //       cursor
      //       node {
      //         ...getFields
      //         variants(first:2) {
      //           edges {
      //             node {
      //               id
      //               NgayTaoVariants: createdAt
      //             }
      //           }
      //         }
      //       }
      //     }
      //     pageInfo {
      //       hasNextPage
      //       hasPreviousPage
      //     }
      //   }
      // }

      // fragment getFields on Product {
      //   id
      //   TieuDe:title
      //   description
      // }
      //
      // {
      //   "after": "eyJsYXN0X2lkIjo3ODIwOTkyODcyNzAyLCJsYXN0X3ZhbHVlIjoiNzgyMDk5Mjg3MjcwMiJ9"
      // }

      //create a product: Có 3 tham số để trả về: product, shop, userErrors
      // mutation productCreate($input: ProductInput!) {
      //   productCreate(input: $input) {
      //     product {
      //       title
      //       id
      //     }
      //     shop {
      //       name
      //       email
      //     }
      //     userErrors {
      //       field
      //       message
      //     }
      //   }
      // }

      // {
      //   "input": {
      //     "title":"Test graphQl",
      //     "descriptionHtml": "Bạn than ơi duyên số sinh ra chúng minh!!!",
      //     "productType": "Me va be",
      //     "tags": "OKe banj oiw"
      // }
      // }

      //productCreateMedia
      // mutation productCreateMedia($media: [CreateMediaInput!]!, $productId:ID!){
      //   productCreateMedia(media:$media, productId:$productId) {
      //     media {
      //       alt
      //       status
      //     }
      //     mediaUserErrors {
      //       field
      //       message
      //       code
      //     }
      //     product {
      //       id
      //       title
      //       description
      //     }
      //   }
      // }

      // {
      //   "media": {
      //     "alt": "Anh Dep",
      //     "mediaContentType": "IMAGE",
      //     "originalSource": "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80"
      //   },
      //   "productId": "gid://shopify/Product/7826014994686"
      // }

      // mutation collectionAddProducts($id: ID!, $productIds: [ID!]!) {
      //   collectionAddProducts(id: $id, productIds: $productIds) {
      //     collection {
      //       id
      //       title
      //       productsCount
      //       products(first: 10) {
      //         nodes {
      //           id
      //           title
      //         }
      //       }
      //     }
      //     userErrors {
      //       field
      //       message
      //     }
      //   }
      // }

      // {
      //   "id": "gid://shopify/Collection/401711366398",
      //   "productIds": [
      //     "gid://shopify/Product/7824038494462",
      //     "gid://shopify/Product/7826134204670",
      //     "gid://shopify/Product/7834737737982"]

      let input = {
        title: 'san pham moi',
        vendor: 'THA',
        descriptionHtml: 'hihi cac ban day la body html',
      }

      const data = await GraphqlProductMiddleware.create({
        shop,
        accessToken,
        // ...req.query,
        input,
        // id: 'gid://shopify/Product/7826014994686',
      })

      // const data = await GraphqlProductMiddleware.findById({
      //   shop,
      //   accessToken,
      //   id: 'gid://shopify/Product/7858849054974',
      // })

      return ResponseHandler.success(res, data)
    } catch (error) {
      console.log('/api/submition error :>> ', error.message)
      return ResponseHandler.error(res, error)
    }
  },
}
