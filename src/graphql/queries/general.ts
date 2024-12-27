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

export const  GET_COUNTRY_STATES = gql`
  query GetCountryStates($country: CountriesEnum!) {
    countryStates(country: $country) {
      name
      code
    }
  }
`;
