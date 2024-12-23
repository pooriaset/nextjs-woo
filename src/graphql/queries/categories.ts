import { gql } from '@apollo/client';

export const GET_ALL_CATEGORIES_QUERY = gql`
  query Categories {
    productCategories(first: 1000) {
      nodes {
        id: databaseId
        name
        parentId: parentDatabaseId
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
