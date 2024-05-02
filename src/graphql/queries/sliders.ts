import { gql } from '@apollo/client';

/**
 * Fetch sliders custom post type items
 */
export const GET_ALL_SLIDER_ITEMS_QUERY = gql`
  query GetSliders {
    sliders {
      edges {
        node {
          id: databaseId
          title
          featuredImage {
            node {
              id: databaseId
              url: sourceUrl
            }
          }
        }
      }
    }
  }
`;
