import { gql } from '@apollo/client';

export const GET_GENERAL_SETTINGS = gql`
  query GetGeneralSettings {
    generalSettings {
      title
      description
      timezone
      language
    }
  }
`;
