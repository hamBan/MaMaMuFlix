import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { ReactComponent as MyListIcon } from '../../assets/icons/tv.svg';
import { ReactComponent as SettingsIcon } from '../../assets/icons/settings.svg';
import { ReactComponent as ContactSupportIcon } from '../../assets/icons/contact_support.svg';
import { ReactComponent as Profile } from '../../assets/icons/profile.svg';
import { ReactComponent as Logout } from '../../assets/icons/logout.svg';
import Drawer from 'react-modern-drawer'

//import styles
import 'react-modern-drawer/dist/index.css'
import './SiteHeader.css';

const Sidebar = () => {
    const [isOpen, setIsOpen] = React.useState(false)
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    const navigate = useNavigate();

    const handleProfileClick = () => {
        if(isLoggedIn)
            setIsOpen(true);

        else
            navigate('/login');
    }

    const handleLogOut = () => {
        localStorage.setItem('isLoggedIn', 'false');
        toggleDrawer();
    }

    return (
        <>
            {/* <input type="checkbox" id="menu-toggle" />
            <label htmlFor="menu-toggle" onClick={toggleDrawer} className="menu-icon">&#9776;</label> */}

            <Profile className='profile-image' onClick={handleProfileClick}/>
            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='right'
                className="custom-drawer"
            >
                <nav className="navbar">
                    <ul className="nav-links">
                        <li>
                            <Link to="/">
                            <MyListIcon className="nav-icon"/>My List</Link>
                        </li>
                        <li>
                            <Link to="/">
                            <ContactSupportIcon className="nav-icon"/>Contact</Link></li>
                        <li>
                            <Link to="/">
                            <SettingsIcon className="nav-icon" />Settings</Link>
                        </li>
                        <li>
                            <Link to="/" onClick={handleLogOut}>
                            <Logout className="nav-icon" />Sign out</Link>
                        </li>
                    </ul>
                </nav>
            </Drawer>
        </>
    )
}

export default Sidebar