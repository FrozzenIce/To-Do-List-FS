import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSignOut, faTasks, faAdd, faHome } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import '../Navbar.css';

const NAV_ITEMS = [
    { id: 'Home', label: 'Home', icon: faHome },
    { id: 'All Tasks', label: 'All Tasks', icon: faTasks },
    { id: 'Create Task', label: 'Create Task', icon: faAdd },
];

function Navbar() {
    const [status, setStatus] = useState(false);
    const [active, setActive] = useState('Home');

    return (
        <nav className={`sidebar ${status ? 'expanded' : ''}`} aria-label="Main navigation">
            <button
                className="navbar-button"
                onClick={() => setStatus(prev => !prev)}
                aria-label={status ? 'Collapse navigation' : 'Expand navigation'}
                aria-expanded={status}
                data-tooltip="Menu"
            >
                <FontAwesomeIcon icon={faBars} className="navbar-icon" />
                <span className={`navbar-text ${status ? 'show' : ''}`}>
                    Menu
                </span>
            </button>

            {NAV_ITEMS.map(({ id, label, icon }) => (
                <button
                    key={id}
                    className={`navbar-button ${active === id ? 'active' : ''}`}
                    onClick={() => setActive(id)}
                    aria-current={active === id ? 'page' : undefined}
                    data-tooltip={label}
                >
                    <FontAwesomeIcon icon={icon} className="navbar-icon" />
                    <span className={`navbar-text ${status ? 'show' : ''}`}>
                        {label}
                    </span>
                </button>
            ))}

            <button
                className="navbar-button logout-button"
                onClick={() => console.log('Sign Out')}
                data-tooltip="Sign Out"
            >
                <FontAwesomeIcon icon={faSignOut} className="navbar-icon" />
                <span className={`navbar-text ${status ? 'show' : ''}`}>
                    Sign Out
                </span>
            </button>
        </nav>
    );
}

export default Navbar;