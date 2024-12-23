import { gql } from '@apollo/client';

export const GET_ALL_CATEGORIES_QUERY = gql`
  query GetAllCategories($first: Int) {
    productCategories(
      where: { orderby: TERM_ORDER, order: ASC }
      first: $first
    ) {
      nodes {
        id: databaseId
        name
        parentId: parentDatabaseId
        image {
          id: databaseId
          sourceUrl
        }
      }
    }
  }
`;

export const GET_MAIN_CATEGORIES = gql`
  query GetMainCategories($parent: Int, $first: Int) {
    productCategories(
      where: { parent: $parent, orderby: TERM_ORDER }
      first: $first
    ) {
      edges {
        node {
          id: databaseId
          name
          image {
            id: databaseId
            sourceUrl
          }
        }
      }
    }
  }
`;
