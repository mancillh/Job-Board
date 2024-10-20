import React, { useState } from 'react';
import { Image, Input } from 'semantic-ui-react'
import '../styles/Header.css';

function Header() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // You can implement additional search logic here
    console.log('Search Query:', e.target.value);
  };

  return <>
    <div className='header-container'>
      <Image className='sticky-icon' src='/sticky note with push pin icon.png' size='small' />
      <h1>Neighborhood Jobs</h1>
      {/* Search Box Integration */}
      <div className='search-box'>
          <Input
            icon='search'
            placeholder='Search for jobs...'
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
    </div>
    <div className="horizontal-line"></div>
  </>;
}

export default Header;