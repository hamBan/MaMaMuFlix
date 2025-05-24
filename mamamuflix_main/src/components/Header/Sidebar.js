import React from 'react'
import { Link } from 'react-router-dom';
import { ReactComponent as MyListIcon } from '../../assets/icons/tv.svg';
import { ReactComponent as SettingsIcon } from '../../assets/icons/settings.svg';
import { ReactComponent as ContactSupportIcon } from '../../assets/icons/contact_support.svg';

// import component 👇
import Drawer from 'react-modern-drawer'

//import styles
import 'react-modern-drawer/dist/index.css'
import './SiteHeader.css';

const Sidebar = () => {
    const [isOpen, setIsOpen] = React.useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    return (
        <>
            <input type="checkbox" id="menu-toggle" />
            <label htmlFor="menu-toggle" onClick={toggleDrawer} className="menu-icon">&#9776;</label>
            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='right'
                className="custom-drawer"
            >
                <nav className="navbar">
                    <ul className="nav-links">
                        <li><Link to="/">
                        <MyListIcon className="nav-icon"/>My List</Link>
                        </li>
                        <li>
                            <Link to="/">
                            <ContactSupportIcon className="nav-icon"/>Contact</Link></li>
                        <li>
                            <Link to="/">
                            <SettingsIcon className="nav-icon" />Settings</Link>
                        </li>
                    </ul>
                </nav>
            </Drawer>
        </>
    )
}

export default Sidebar