import React from "react";
import { useQuery } from "@apollo/client/react/hooks";
import { useParams } from "react-router-dom";

import countryOperations from './country.gql';
import Regions from './regions'

const Country = () => {
    const { id } = useParams();
    const { queries } = countryOperations;
    const { getCountryQuery } = queries;
    const { data, error, loading } = useQuery(getCountryQuery, {
        variables: {id: id}
    });

    console.log('-------id------', id);

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error...</div>
    }

    const {country} = data;

    const {
        full_name_english: oneCountryName,
        available_regions: regions,
    } = country;


    return (
        <div>
            <h2>{oneCountryName}</h2>
            <Regions regions={regions} />
        </div>
    )
}

export default Country;