import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import JoblyApi from "../../api";
import SearchForm from '../../components/SearchForm';
import CompanyCard from "./CompanyCard";
import { Container } from 'semantic-ui-react';
import './CompanyList.css';

const CompanyList = () => {
    const [companies, setCompanies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const {currentUser} = useContext(UserContext)
    const navigate = useNavigate()

  /******************************************************************************************************
    Handle getting list of companies. Navigates to homepage if no currentUser. Only runs when location changes.
  *******************************************************************************************************/
    useEffect(() => {
        if(currentUser){
            async function getCompanies() {
                try {
                    const res = await JoblyApi.getCompanies();
                    setCompanies(res);
                    setIsLoading(false);
                } catch (err) {
                    setError(err);
                    setIsLoading(false);
                }
            }
            getCompanies();
        } else {
            navigate("/")
        }
    }, [location]);

  /******************************************************************************************************
    Handle filtering companies
  *******************************************************************************************************/
    async function filterCompanies (string){
        try {
            setIsLoading(true)
            const res = await JoblyApi.getCompanies(string);
            setCompanies(res);
            setIsLoading(false);
        } catch (err) {
            setError(err);
            setIsLoading(false);
        }
    }


    if (error) {
        return <p>Error loading companies: {error}</p>;
    }

    return (
        <div className="CompanyList">
            <SearchForm filter={filterCompanies} type="company"/>
            <Container className="CompanyList-container">
            {isLoading ? <p>Loading &hellip;</p> : (
                companies.map(company => (
                    <CompanyCard
                        key={company.handle}
                        handle={company.handle}
                        name={company.name}
                        description={company.description}
                        logoUrl={company.logoUrl}
                    />
                ))
            )}
            </Container>
        </div>  
    );
};

export default CompanyList;
