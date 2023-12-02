import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext'
import JoblyApi from "../../api";
import SearchForm from '../../components/SearchForm';
import JobCard from "../../components/JobCard";

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const {currentUser} = useContext(UserContext);
    const navigate = useNavigate();

  /******************************************************************************************************
    Handle getting list of jobs. Navigates to homepage if no currentUser. Only runs when location changes.
  *******************************************************************************************************/ 
    useEffect(() => {
        if(currentUser){
            async function getJobs() {
                try {
                    const res = await JoblyApi.getJobs();
                    setJobs(res);
                    setIsLoading(false);
                } catch (err) {
                    setError(err);
                    setIsLoading(false);
                }
            }
            getJobs();
        } else {
            navigate("/")
        }
        
    }, [location]);

  /******************************************************************************************************
    Handle filtering jobs
  *******************************************************************************************************/
    
    async function filterJobs (string){
        try {
            setIsLoading(true)
            const res = await JoblyApi.getJobs(string);
            setJobs(res);
            setIsLoading(false);
        } catch (err) {
            setError(err);
            setIsLoading(false);
        }
    }


    if (error) {
        return <p>Error loading jobs: {error}</p>;
    }

    return (
        <div className="JobList">
            <SearchForm filter={filterJobs} type="job"/>
            {isLoading ? <p>Loading &hellip;</p> : (
                jobs.map(job => (
                    <JobCard
                        key={job.id}
                        id= {job.id}
                        title={job.title}
                        salary={job.salary}
                        equity={job.equity}
                        companyHandle={job.companyHandle}
                    />
                ))
            )}
        </div>  
    );
};

export default JobList;
