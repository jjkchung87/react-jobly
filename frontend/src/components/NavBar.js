import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import UserContext from '../context/UserContext'

const NavBar = ({handleLogout}) => {

    const {currentUser} = useContext(UserContext)

    return (
        <div className="NavBar">
            <Link to="/" >Jobly</Link>

            {currentUser ?
            <>
            <Link to="/companies" >Companies</Link>
            <Link to="/jobs" >Jobs</Link>
            <Link to="/profile" >Profile</Link>
            <Link to="/" onClick={handleLogout}>Logout {currentUser.username}</Link>
            </>
            :
            <>
            <Link to="/signup" >Signup</Link>
            <Link to="/login" >Login</Link>
            </>
            }
            
        </div>
    )
}

export default NavBar;