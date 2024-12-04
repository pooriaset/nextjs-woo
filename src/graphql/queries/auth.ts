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
