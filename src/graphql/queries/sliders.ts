import { gql } from '@apollo/client';

/**
 * Fetch sliders custom post type items
 */
export const GET_HOMEPAGE_SLIDERS = gql`
  query GetHomePageSliders {
    sliderCategories(where: { slug: "MAIN_HOMEPAGE_SLIDERS" }) {
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

export const GET_TOP_BANNER = gql`
  query GetTopBanner {
    sliderCategories(where: { slug: "TOP_BANNER" }) {
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
