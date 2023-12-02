import React, {useEffect, useContext} from 'react';
import useFields from '../../hooks/useFields'
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';

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
            <h3 className="Login-heading">Sign Up</h3>
            <form className="Login-form" onSubmit={handleSubmit}>
                <label hmtlFor="username">Username</label>
                <input name="username" type="text" onChange={handleChange} value={formData.username}/>
                <label hmtlFor="password">Password</label>
                <input name="password" type="password" onChange={handleChange} value={formData.password}/>
                <button>Submit</button>  
            </form>
        </div>
    )

}

export default Login;