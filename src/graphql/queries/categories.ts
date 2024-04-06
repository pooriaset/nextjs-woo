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
