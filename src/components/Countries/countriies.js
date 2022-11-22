import React from "react";
import { useQuery } from "@apollo/client/react/hooks";
import { Link } from "react-router-dom";
import path from "path";

import countriesOperations from './countries.gql';

const Countries = () => {
    const { queries } = countriesOperations;
    const { getCountriesQuery } = queries;
    const { data, error, loading } = useQuery(getCountriesQuery);

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error...</div>
    }

    const { countries } = data;

    const listItems = countries.map(country => {
        const { id, full_name_english: cName } = country;
        const linkTo = path.join('country', id);

        return (
            <li key={id}>
                <Link to={linkTo}>{cName} (id: {id})</Link>
            </li>
        )
    });

    return (
        <div>
            <h1>---Availables countries---</h1>
            <div>=========================</div>
            <ul>{listItems}</ul>

        </div>
    );
}

export default Countries;