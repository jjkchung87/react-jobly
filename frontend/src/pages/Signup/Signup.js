import React, {useEffect, useContext} from 'react';
import useFields from '../../hooks/useFields'
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { Button, Checkbox, Form, Container } from 'semantic-ui-react'
import './Signup.css'

const Signup = ({handleSignup}) => {
    
    const {currentUser} = useContext(UserContext)
    const navigate = useNavigate()
    const initialValue = {
                            username:"harper",
                            firstName:"harper",
                            password:"harper123",
                            lastName:"chung",
                            email:"harper@human.com"
                        }


    const [formData, handleChange, resetFormData ] = useFields(initialValue)

  /******************************************************************************************************
    Handle redirecting to homepage if currentUser
  *******************************************************************************************************/
    useEffect(()=> {if(currentUser) navigate("/")}) 

  /******************************************************************************************************
    Handle submitting signup form
  *******************************************************************************************************/
    const handleSubmit = async (e) => {
        e.preventDefault()
        let result = await handleSignup(formData)
        if (result.success) {
        navigate('/')
        } else {
        resetFormData()
        }
    }

    return (
        <div className="Signup">
            <h3 className="Signup-heading">Sign Up</h3>
            <Form className="Signup-form" onSubmit={handleSubmit}>
              <Form.Field>
                <label hmtlFor="username">Username</label>
                <input name="username" type="text" onChange={handleChange} value={formData.username}/>
              </Form.Field>
              <Form.Field>
                <label hmtlFor="password">Password</label>
                <input name="password" type="password" onChange={handleChange} value={formData.password}/>
              </Form.Field>
              <Form.Field>
                <label hmtlFor="firstName">First Name</label>
                <input name="firstName" type="text" onChange={handleChange} value={formData.firstName}/>
              </Form.Field>
              <Form.Field>
                <label hmtlFor="lastName">Last Name</label>
                <input name="lastName" type="text" onChange={handleChange} value={formData.lastName}/>
              </Form.Field>
              <Form.Field>
                <label hmtlFor="email">Email</label>
                <input name="email" type="text" onChange={handleChange} value={formData.email}/>
              </Form.Field>
              <Button primary type='submit'>Submit</Button>
          </Form>
        </div>
    )

}

export default Signup;