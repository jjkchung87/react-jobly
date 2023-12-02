import './App.css';
import React, {useState, useEffect} from 'react'
import {BrowserRouter, useHistory, useNavigate} from 'react-router-dom'
import useLocalStorageState from './hooks/useLocalStorageState'
import { decodeToken } from 'react-jwt';


import UserContext from './context/UserContext'

import NavBar from './components/NavBar'
import AppRoutes from './routes'
import JoblyApi from './api';

function App() {
    
  const [currentUser, setCurrentUser] = useState(null) // {username, firstName, lastName, email, isAdmin, applications}
  const [token, setToken] = useLocalStorageState("token") // token for logged in user
  const navigate = useNavigate(); // used to navigate to different routes
  

  /******************************************************************************************************
    Handle updating current user
  *******************************************************************************************************/

  const updateCurrentUser = (data) => {
    setCurrentUser(data)
  }

  /******************************************************************************************************
    Load User Info
  *******************************************************************************************************/
  useEffect(
    function loadUserInfo() {
      async function getCurrentUser() {
        if (token) {
          try {
            const user = decodeToken(token)
            // put the token on the Api class so it can use it to call the API.
            JoblyApi.token = token;
            // finds current user info by user_id from token
            let currUser = await JoblyApi.getCurrentUser(user.username);
            setCurrentUser(currUser);
            console.log('currentUser: ', currentUser)  
          } catch (err) {
            console.error("App loadUserInfo: problem loading", err);
            setCurrentUser(null);
          }}
        }
      getCurrentUser();
    }, [token]);

  /******************************************************************************************************
   Handle Signup   
   *******************************************************************************************************/

  const handleSignup = async (data) => {
    try {
      let token = await JoblyApi.signup(data);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  /******************************************************************************************************
   Handle Login   
   *******************************************************************************************************/
  
   const handleLogin = async (data) => {
    try {
      let token = await JoblyApi.login(data);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }


  /******************************************************************************************************
   Handle Logout
   *******************************************************************************************************/

   const handleLogout = () => {
    setToken(null)
    setCurrentUser(null)
    navigate('/')
   }


  return (
    <div className="App">
      <UserContext.Provider value={{currentUser, updateCurrentUser}}>
        <NavBar handleLogout={handleLogout}/>
        <AppRoutes handleSignup={handleSignup} handleLogin={handleLogin} />
      </UserContext.Provider>

    </div>
  );
}

export default App;
