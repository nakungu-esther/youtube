// SearchBar.js
import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm, onSearch }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search videos..."
      />
      <button onClick={onSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
