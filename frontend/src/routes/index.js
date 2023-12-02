import React, {useState} from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom'
import JoblyApi from '../api'
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import Signup from '../pages/Signup/Signup'
import Profile from '../pages/Profile/Profile'
import CompanyList from '../pages/Companies/CompanyList'
import CompanyDetails from '../pages/Companies/CompanyDetails'
import JobList from '../pages/Jobs/JobList'



const AppRoutes = ({handleSignup, handleLogin}) => {

    return(
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<Login handleLogin={handleLogin} />}/>
            <Route path="/signup" element={<Signup handleSignup={handleSignup}/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/jobs" element={<JobList/>}/>
            <Route path="/companies" element={<CompanyList/>}/>
            <Route path="/companies/:handle" element={<CompanyDetails/>}/>
        </Routes>
    )
}

export default AppRoutes;