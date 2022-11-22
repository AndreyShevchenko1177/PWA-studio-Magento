import gql from 'graphql-tag';

const GET_COUNTRY_QUERY = gql`
    query getCountry ($id: String) {
        country(id: $id) {
            available_regions {
              id
              name
            }
            full_name_english
            id
          }
    }
`;

export default {
    queries: {
        getCountryQuery: GET_COUNTRY_QUERY
    },
    mutations: {}
}