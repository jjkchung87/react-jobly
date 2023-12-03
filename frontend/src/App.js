import './App.css';
import React, {useState, useEffect} from 'react'
import {BrowserRouter, useHistory, useNavigate} from 'react-router-dom'
import useLocalStorageState from './hooks/useLocalStorageState'
import { decodeToken } from 'react-jwt';
import UserContext from './context/UserContext'
import NavBar from './components/NavBar'
import LoadingSpinner from './components/LoadingSpinner'
import AppRoutes from './routes'
import JoblyApi from './api';

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false); // has user data been pulled from API?
  const [currentUser, setCurrentUser] = useState(null) // {username, firstName, lastName, email, isAdmin, applications}
  const [token, setToken] = useLocalStorageState("token") // token for logged in user
  const navigate = useNavigate(); // used to navigate to different routes
  const [applicationIds, setApplicationIds] = useState(new Set([])); // set of job ids that user has applied to
  
  /******************************************************************************************************
    Debug Info: infoLoaded, currentUser, token
  *******************************************************************************************************/
  console.debug(
    "App",
    "infoLoaded=", infoLoaded,
    "currentUser=", currentUser,
    "token=", token,
  );

  /******************************************************************************************************
    Load User Info. Until a user is logged in and they have a token, this should not run. 
    It only needs to re-run when a user logs out, so the value of the token is a dependency for this effect.
  *******************************************************************************************************/
    useEffect(function loadUserInfo() {
      console.debug("App useEffect loadUserInfo", "token=", token);
  
      async function getCurrentUser() {
        if (token) {
          try {
            let { username } = decodeToken(token);
            // put the token on the Api class so it can use it to call the API.
            JoblyApi.token = token;
            let currentUser = await JoblyApi.getCurrentUser(username);
            setCurrentUser(currentUser);
            setApplicationIds(new Set(currentUser.applications))
          } catch (err) {
            console.error("App loadUserInfo: problem loading", err);
            setCurrentUser(null);
          }
        }
        setInfoLoaded(true);
      }
  
      // set infoLoaded to false while async getCurrentUser runs; once the
      // data is fetched (or even if an error happens!), this will be set back
      // to false to control the spinner.
      setInfoLoaded(false);
      getCurrentUser();
    }, [token]);


  /******************************************************************************************************
    Check if has applied to job
  *******************************************************************************************************/
  function hasAppliedToJob(id) {
    return applicationIds.has(id);
  }

 /******************************************************************************************************
    Handle applying to a job
  *******************************************************************************************************/
  function applyToJob(id) {
    if (hasAppliedToJob(id)) return;
    JoblyApi.applyToJob(currentUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }
  
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
      console.error("login failed", errors);
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

  /******************************************************************************************************
    Loading Spinner. Will run until infoLoaded is true.  
   *******************************************************************************************************/

  if (!infoLoaded) return <LoadingSpinner />;

  /******************************************************************************************************
    Render app once infoLoaded is true.
  *******************************************************************************************************/

  return (
    <div className="App">
      <UserContext.Provider value={{currentUser, setCurrentUser, hasAppliedToJob, applyToJob}}>
        <NavBar handleLogout={handleLogout}/>
        <AppRoutes handleSignup={handleSignup} handleLogin={handleLogin} />
      </UserContext.Provider>

    </div>
  );
}

export default App;
