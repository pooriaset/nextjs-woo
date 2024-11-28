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
