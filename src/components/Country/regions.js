import React from "react";

const Regions = props => {
    const { regions } = props;

    console.log({props});
    console.log({regions});

    if (regions) {
        const ListItems = regions.map(region => {
            const {name} = region;
            return <li key={name}>{name}</li>
        }
        );
        return <ul>{ListItems}</ul>
    } 
        
    return <div>No available_regions</div>

};

export default Regions