import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import UserContext from '../../context/UserContext'
import JoblyApi from "../../api";
import SearchForm from '../../components/SearchForm';
import JobCard from "../../components/JobCard";
import './CompanyDetails.css';

const CompanyDetails = () => {
    const [company, setCompany] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation(); // used to get the current path
    const {currentUser} = useContext(UserContext); // {username, firstName, lastName, email, isAdmin, applications}
    const navigate = useNavigate();
    const {handle} = useParams(); // used to get the company handle from the url

  /******************************************************************************************************
    Handle getting company details. Navigates to homepage if no currentUser. Only runs when location changes.
  *******************************************************************************************************/
    
    useEffect(() => {
        if(currentUser){
            async function getCompanyDetails() {
                try {
                    const res = await JoblyApi.getCompany(handle);
                    setCompany(res);
                    setIsLoading(false);
                } catch (err) {
                    setError(err);
                    setIsLoading(false);
                }
            }
            getCompanyDetails();
        } else {
            navigate("/")
        }
        
    }, 
    [location]);

    if (error) {
        return <p>Error loading jobs: {error}</p>;
    }

    return (
        <div className="CompanyDetails">
            {isLoading ? <p>Loading &hellip;</p> : (
                <>
                    <h3 className="CompanyDetails-header" >{company.name}</h3>
                    <div className="CompanyDetails-description" >{company.description}</div>
                    {company.jobs && company.jobs.map(job => (
                        <JobCard
                            key={job.id}
                            id= {job.id}
                            title={job.title}
                            salary={job.salary}
                            equity={job.equity}
                            companyHandle={job.companyHandle}
                        />
                    ))}
                </>
            )}
        </div>  
    );
};

export default CompanyDetails;
