import React, {useContext, useState, useEffect} from 'react'
import UserContext from '../context/UserContext'
import JoblyApi from '../api'

const JobCard = ({id, title, salary, equity, companyHandle}) => {

    const {currentUser, updateCurrentUser } = useContext(UserContext) // {username, firstName, lastName, email, isAdmin, applications}
    const {applications, username} = currentUser 
    const [applied, setApplied] = useState(applications.some(job => job === id)) // true if user has applied for this job

  /******************************************************************************************************
    Update applied state when applications changes    
  *******************************************************************************************************/

    useEffect(()=> {
        setApplied(applications.some(job => job === id))
    }, [applications])

  /******************************************************************************************************
    Handle applying for a job
  *******************************************************************************************************/
    
    const handleClick = async () => {
        const res = await JoblyApi.applyForJob(username, id)
        updateCurrentUser(res)
        setApplied(true)
    }

    return (
        <div className="JobCard">
            <div>{title}</div>
            <div>{companyHandle}</div>
            <div>salary: {salary}</div>
            <div>equity: {equity}</div>
            { applied ? 
                <button disabled>APPLIED</button>
                :
                <button onClick={handleClick}>APPLY</button>
            }
        </div>
    )

}

export default JobCard;