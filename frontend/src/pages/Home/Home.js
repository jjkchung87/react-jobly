import React, { useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { Button, Icon } from 'semantic-ui-react';
import './Home.css';

const Home = () => {
    
    const { currentUser } = useContext(UserContext);
    const navigate = useNavigate();

  /******************************************************************************************************
    Handle navigating to login or signup page
  *******************************************************************************************************/
    const handleClick = (path) => {
        navigate(path);
    }

    if (!currentUser) {
        return (
            <div className="Home">
                <div className="Home-content">
                    <div className="Home-header">Jobly</div>
                    <div className="Home-subtitle">All the jobs in one, convenient place.</div>
                </div>
                <div className="Home-buttons">
                    <Button animated onClick={()=>{handleClick("/login")}}>
                        <Button.Content visible>login</Button.Content>
                        <Button.Content hidden>
                            <Icon name='arrow right' />
                        </Button.Content>
                    </Button>
                    <Button animated onClick={()=>{handleClick("/signup")}}>
                        <Button.Content visible>signup</Button.Content>
                        <Button.Content hidden>
                            <Icon name='arrow up' />
                        </Button.Content>
                    </Button>
                   
                </div>
            </div>
        );
    } else {
        return (
            <div className="Home">
                <div className="Home-content">
                    <div className="Home-header">Jobly</div>
                    <div className="Home-subtitle">All the jobs in one, convenient place.</div>
                    <div className="Home-welcome">Welcome Back, {currentUser.username}!</div>
                </div>
            </div>
        );    
    }
};

export default Home;
