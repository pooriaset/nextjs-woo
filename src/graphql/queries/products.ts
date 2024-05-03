import { gql } from '@apollo/client';

/**
 * Fetch Woocommerce products from GraphQL
 */
export const GET_VARIABLE_PRODUCTS_QUERY = gql`
  query GetAllProducts(
    $stockStatus: [StockStatusEnum]
    $orderBy: [ProductsOrderbyInput]
    $categoryIdIn: [Int]
    $q: String
    $first: Int
  ) {
    products(
      first: $first
      where: {
        stockStatus: $stockStatus
        orderby: $orderBy
        categoryIdIn: $categoryIdIn
        search: $q
      }
    ) {
      pageInfo {
        total
        hasNextPage
        hasPreviousPage
      }
      nodes {
        __typename
        ... on VariableProduct {
          databaseId
          name
          onSale
          type
          averageRating
          slug
          image {
            sourceUrl
          }
          price
          regularPrice
          salePrice
          stockStatus
        }
      }
    }
  }
`;
