import { gql } from '@apollo/client';

export const GET_ALL_CATEGORIES_QUERY = gql`
  query Categories {
    productCategories {
      nodes {
        id: databaseId
        name
        parentId: parentDatabaseId
      }
    }
  }
`;

export const GET_MAIN_CATEGORIES = gql`
  query GetMainCategories {
    productCategories(where: { parent: null, orderby: TERM_ORDER }) {
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
