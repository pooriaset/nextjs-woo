import { gql } from '@apollo/client';

export const LOGIN_USER_MUTATION = gql`
  mutation LoginUser($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      accessToken: authToken
      refreshToken
      user {
        id
        name
      }
    }
  }
`;

export const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken($refreshToken: String!) {
    refreshJwtAuthToken(input: { jwtRefreshToken: $refreshToken }) {
      accessToken: authToken
    }
  }
`;

export const REGISTER_CUSTOMER = gql`
  mutation RegisterCustomer(
    $email: String
    $firstName: String
    $lastName: String
    $password: String
  ) {
    registerCustomer(
      input: {
        email: $email
        firstName: $firstName
        lastName: $lastName
        password: $password
      }
    ) {
      accessToken: authToken
      refreshToken
      customer {
        id
        firstName
        lastName
      }
    }
  }
`;
