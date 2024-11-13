// Header.js
import React from 'react';
import './Header.css'; // Optional: add specific styling for the header if needed

const Header = ({ children }) => {
  return (
    <header className="header">
      <h1>Kids Youtube App</h1>
      <div className="header-children">{children}</div> {/* This renders the SearchBar */}
    </header>
  );
};

export default Header;
