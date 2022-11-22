import gql from 'graphql-tag';

const GET_COUNTRIES_QUERY = gql`
    query getCountries {
        countries {
            full_name_english
            id
          }
    }
`;

export default {
    queries: {
        getCountriesQuery: GET_COUNTRIES_QUERY
    },
    mutations: {}
}