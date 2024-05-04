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

export const GET_PUBLISHED_PAGES_LIST = gql`
  query GetPublishedPagesList {
    pages(where: { status: PUBLISH }) {
      edges {
        node {
          title
          slug
        }
      }
    }
  }
`;
