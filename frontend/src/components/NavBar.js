import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import UserContext from '../context/UserContext';

const NavBar = ({ handleLogout }) => {
    const { currentUser } = useContext(UserContext);

    return (
        <Menu className="NavBar"  size="massive" style={{ background: 'white' }}>
            <Menu.Item as={Link} to="/" name="Jobly" />

            <Menu.Menu position="right">
                {currentUser ? (
                    <>
                        <Menu.Item as={Link} to="/companies" name="Companies" />
                        <Menu.Item as={Link} to="/jobs" name="Jobs" />
                        <Menu.Item as={Link} to="/profile" name="Profile" />
                        <Menu.Item as={Link} to="/" onClick={handleLogout} name={`Logout (${currentUser.username})`} />
                    </>
                ) : (
                    <>
                        <Menu.Item as={Link} to="/signup" name="Signup" />
                        <Menu.Item as={Link} to="/login" name="Login" />
                    </>
                )}
            </Menu.Menu>
        </Menu>
    );
};

export default NavBar;
