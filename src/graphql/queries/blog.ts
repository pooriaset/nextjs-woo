import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      edges {
        node {
          databaseId
          name
          slug
        }
      }
    }
  }
`;
