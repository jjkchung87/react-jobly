import React, {useContext, useState, useEffect} from 'react'
import UserContext from '../context/UserContext'
import JoblyApi from '../api'
import './JobCard.css'
import {Button, Grid, Container} from 'semantic-ui-react'

const JobCard = ({id, title, salary, equity, companyHandle}) => {

    const {hasAppliedToJob, applyToJob } = useContext(UserContext)
    const [applied, setApplied] = useState(false) // current state of whether user has applied for this job

  /******************************************************************************************************
    Set if job has been applied to
  *******************************************************************************************************/

    useEffect(()=> {
        setApplied(hasAppliedToJob(id))
    }, [id, hasAppliedToJob])

  /******************************************************************************************************
    Handle applying for a job
  *******************************************************************************************************/
    
    const handleClick = async () => {
      if (hasAppliedToJob(id)) return;
      applyToJob(id);
      setApplied(true);
    }

    return (
          <Container className="JobCard"> 
          <Grid >
            <Grid.Row columns={2}>
                  <Grid.Column width={12} className="JobCard-text">
                      <div className="JobCard-title">{title}</div>
                      <div className="JobCard-handle">{companyHandle}</div>
                      <div className="JobCard-salary">Salary: {salary}</div>
                      <div className="JobCard-equity">Equity: {equity}</div>
                  </Grid.Column>
                  <Grid.Column width={4} textAlign="right" verticalAlign="middle" className="JobCard-button">
                      {applied ? (
                          <Button disabled>APPLIED</Button>
                      ) : (
                          <Button primary onClick={handleClick}>APPLY</Button>
                      )}
                  </Grid.Column>
              </Grid.Row>
          </Grid>
          </Container>
    )

}

export default JobCard;