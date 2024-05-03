import { gql } from '@apollo/client';

/**
 * Fetch sliders custom post type items
 */
export const GET_HOMEPAGE_SLIDERS = gql`
  query GetHomePageSliders {
    sliderCategories(where: { slug: "homepage" }) {
      nodes {
        sliders {
          edges {
            node {
              id: databaseId
              title
              url
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
    }
  }
`;
