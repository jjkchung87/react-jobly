import React from 'react'
import {Link} from 'react-router-dom'

const CompanyCard = ({handle, name, description, logoUr}) => {

    return (
        <div className="CompanyCard">
            <Link to={`/companies/${handle}`}>
            <div>{name}</div>
            <div>{description}</div>
            </Link>
        </div>
    )

}

export default CompanyCard;