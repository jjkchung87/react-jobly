import React, {useContext, useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import UserContext from '../../context/UserContext'
import useFields from '../../hooks/useFields'
import JoblyApi from '../../api'
import './Profile.css'
import { Button, Form, Message} from 'semantic-ui-react'


const Profile = () => {

    const navigate = useNavigate()
    const {currentUser, setCurrentUser} = useContext(UserContext) // {username, firstName, lastName, email, isAdmin, applications}
    const {firstName, lastName, email} = currentUser
    const [formData, handleChange] = useFields({firstName, lastName, email})
    const [submitted, setSubmitted] = useState(false)
    const [formErrors, setFormErrors] = useState([])

  /******************************************************************************************************
    Handle submitting profile form. Updates current user and displays message.
  *******************************************************************************************************/
    const handleSubmit = async (e) => {
      e.preventDefault();
      setSubmitted(false) // reset submitted to false
      let res;
      try{
        res = await JoblyApi.updateCurrentUser(currentUser.username, formData)
      } catch (errors) {
        setFormErrors(errors)
        return
      }        
        setSubmitted(true)
        setCurrentUser(res)
        setFormErrors([])
    }
    

  /******************************************************************************************************
    Handle checking that currentUser exists. If so, redirect to homepage.
  *******************************************************************************************************/
    useEffect(()=> {
      if(!currentUser) navigate("/")

    }) 


    return(
        <div className="Profile">
            <h3 className="Profile-header">Profile</h3>
            <Form className="Login-Form" onSubmit={handleSubmit}>
                <Form.Input
                    label="First Name"
                    type="text"
                    name="firstName"
                    onChange={handleChange}
                    value={formData.firstName}
                    fluid
                />
                <Form.Input
                    label="Last Name"
                    type="text"
                    name="lastName"
                    onChange={handleChange}
                    value={formData.lastName}
                    fluid
                />
                <Form.Input
                    label="Email"
                    type="text"
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                    fluid
                />
                {submitted ? <Message positive header='Profile Updated' /> : null}
                {formErrors.length ? <Message negative content={formErrors} /> : null }
                <Button primary type='submit'>Submit</Button>
            </Form>
        </div>
    )
}

export default Profile;