import React, {useEffect, useContext} from 'react';
import useFields from '../../hooks/useFields'
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { Button, Form} from 'semantic-ui-react'
import './Login.css'

const Login = ({handleLogin}) => {

    const {currentUser} = useContext(UserContext) // {username, firstName, lastName, email, isAdmin, applications}
    const navigate = useNavigate()
    const initialValue = {
                            username:"harper",
                            password:"harper123"
                        }

    const [formData, handleChange, resetFormData ] = useFields(initialValue)

  /******************************************************************************************************
    Handle redirecting to homepage if currentUser
  *******************************************************************************************************/
    useEffect(()=> {if(currentUser) navigate("/")}) 

  /******************************************************************************************************
    Handle submitting login form
  *******************************************************************************************************/

    const handleSubmit = async (e) => {
        e.preventDefault()
        let result = await handleLogin(formData)
        if (result.success) {
        navigate('/')
        } else {
        resetFormData()
        }
    }

    return (
        <div className="Login">
            <h3 className="Login-header">Login</h3>
            <Form className="Login-form" onSubmit={handleSubmit}>
            <Form.Input
                    label="Username"
                    type="text"
                    name="username"
                    onChange={handleChange}
                    value={formData.username}
                    fluid
                />
                <Form.Input
                    label="Password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                    fluid
                />
              <Button primary type='submit'>Submit</Button>
          </Form>
        </div>
    )

}

export default Login;