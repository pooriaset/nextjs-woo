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

/**
 * Fetch Woocommerce single product with variants
 */
export const GET_SINGLE_VARIABLE_PRODUCT_QUERY = gql`
  query GetSingleProduct($id: ID!) {
    product(id: $id, idType: DATABASE_ID) {
      productCategories {
        nodes {
          id: databaseId
          name
          slug
        }
      }
      ... on VariableProduct {
        id: databaseId
        name
        description
        content
        commentCount
        title
        galleryImages {
          nodes {
            id
            sourceUrl
          }
        }
        stockStatus
        slug
        averageRating
        variations(where: { stockStatus: IN_STOCK }) {
          nodes {
            id
            price
            salePrice
            regularPrice
            attributes {
              nodes {
                id
                value
                name
              }
            }
            image {
              id
              sourceUrl
            }
          }
        }
      }
    }
  }
`;
