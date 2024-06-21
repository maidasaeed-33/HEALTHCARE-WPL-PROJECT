import React from 'react';

const HamburgerMenu = ({ toggleMenu, isOpen }) => {
    return (
        <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
        </div>
    );
};

export default HamburgerMenu;