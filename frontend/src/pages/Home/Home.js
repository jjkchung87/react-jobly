import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import UserContext from '../../context/UserContext';

const Home = () => {
    
    const {currentUser} = useContext(UserContext) // {username, firstName, lastName, email, isAdmin, applications}


    if(!currentUser) { // if no currentUser, show login and signup links
        return (
            <div className="Home">
                <h3>Jobly</h3>
                <div>All the jobs in one, convenient place.</div>
                <Link to="/login">Log in</Link>
                <Link to="/signup">Sign up</Link>
            </div>
        )
    } else { // if currentUser, show welcome message
        return (
            <div className="Home">
                <h3>Jobly</h3>
                <div>All the jobs in one, convenient place.</div>
                <div>Welcome Back, {currentUser.username}!</div>
            </div>
        )    
    }

    
}

export default Home;