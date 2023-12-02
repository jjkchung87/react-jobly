import React, {useContext, useState} from 'react'
import UserContext from '../../context/UserContext'
import useFields from '../../hooks/useFields'
import JoblyApi from '../../api'


const Profile = () => {

    const {currentUser, updateCurrentUser} = useContext(UserContext) // {username, firstName, lastName, email, isAdmin, applications}
    const {username, firstName, lastName, email} = currentUser
    const [formData, handleChange] = useFields({firstName, lastName, email})

  /******************************************************************************************************
    Handle submitting profile form. Updates current user and displays alert.
  *******************************************************************************************************/
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await JoblyApi.updateCurrentUser(currentUser.username, formData)

        updateCurrentUser(res)
    }

    return(
        <div className="Profile">
            <h3>Profile</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input name="firstName" type="text" onChange={handleChange} value={formData.firstName}/>
                <label htmlFor="lastName">Last Name</label>
                <input name="lastName" type="text" onChange={handleChange} value={formData.lastName}/>
                <label htmlFor="email">Email</label>
                <input name="email" type="text" onChange={handleChange} value={formData.email}/>
                <button>Save Changes</button>
            </form>

        </div>
    )

}

export default Profile;