import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      edges {
        node {
          databaseId
          name
          slug
          count
        }
      }
    }
  }
`;

export const GET_POSTS = gql`
  query GetPosts(
    $first: Int
    $last: Int
    $after: String
    $before: String
    $title: String
    $categoryIn: [ID]
  ) {
    posts(
      first: $first
      last: $last
      after: $after
      before: $before
      where: {
        title: $title
        categoryIn: $categoryIn
        orderby: { order: DESC, field: DATE }
      }
    ) {
      edges {
        node {
          id
          title
          slug
          databaseId
          featuredImage {
            node {
              databaseId
              sourceUrl
            }
          }
        }
      }
    }
  }
`;

export const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id, idType: DATABASE_ID) {
      title
      slug
      content
      dateGmt
      modifiedGmt
      databaseId
      featuredImage {
        node {
          id
          sourceUrl
          altText
        }
      }
      categories {
        edges {
          node {
            databaseId
            slug
            name
          }
        }
      }
      tags {
        edges {
          node {
            id
            name
            databaseId
          }
        }
      }
    }
  }
`;
