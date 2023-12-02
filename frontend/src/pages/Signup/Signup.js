import React, {useEffect, useContext} from 'react';
import useFields from '../../hooks/useFields'
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';

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
            <form className="Signup-form" onSubmit={handleSubmit}>
                <label hmtlFor="username">Username</label>
                <input name="username" type="text" onChange={handleChange} value={formData.username}/>
                <label hmtlFor="password">Password</label>
                <input name="password" type="password" onChange={handleChange} value={formData.password}/>
                <label hmtlFor="firstName">First Name</label>
                <input name="firstName" type="text" onChange={handleChange} value={formData.firstName}/>
                <label hmtlFor="lastName">Last Name</label>
                <input name="lastName" type="text" onChange={handleChange} value={formData.lastName}/>
                <label hmtlFor="email">Email</label>
                <input name="email" type="text" onChange={handleChange} value={formData.email}/>
                <button>Submit</button>  
            </form>
        </div>
    )

}

export default Signup;