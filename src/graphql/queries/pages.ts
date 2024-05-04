import { gql } from '@apollo/client';

export const GET_PAGE = gql`
  query GetPage($slug: String) {
    pages(where: { name: $slug, status: PUBLISH }) {
      edges {
        node {
          title
          content
        }
      }
    }
  }
`;
