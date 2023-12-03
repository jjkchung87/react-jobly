import React from 'react'
import {Link} from 'react-router-dom'
import './CompanyCard.css'

const CompanyCard = ({handle, name, description, logoUr}) => {

    return (
        <div className="CompanyCard">
            <Link to={`/companies/${handle}`}>
            <div className="CompanyCard-name">{name}</div>
            <div className="CompanyCard-description">{description}</div>
            </Link>
        </div>
    )

}

export default CompanyCard;