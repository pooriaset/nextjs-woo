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

export const POST_ITEM_FRAGMENT = gql`
  fragment PostItem on Post {
    databaseId
    slug
    title
    content
    featuredImage {
      node {
        sourceUrl
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
          ...PostItem
        }
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
  ${POST_ITEM_FRAGMENT}
`;

export const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id, idType: SLUG) {
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
export const GET_CATEGORY_POSTS = gql`
  query GetCategoryPosts($first: Int, $id: ID!) {
    category(id: $id, idType: SLUG) {
      description
      name
      posts(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            ...PostItem
          }
        }
      }
    }
  }
  ${POST_ITEM_FRAGMENT}
`;

export const GET_CATEGORY = gql`
  query GetCategory($id: ID!) {
    category(id: $id, idType: SLUG) {
      databaseId
      description
      name
    }
  }
`;
