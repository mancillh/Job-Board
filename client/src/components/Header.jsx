import React, { useState } from 'react';
import { Image, Input } from 'semantic-ui-react';
import '../styles/Header.css';

function Header({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Call the onSearch function passed as a prop to filter jobs
    onSearch(value);
  };
  return (
    <>
      <div className='header-container'>
        <Image className='sticky-icon' src='/sticky note with push pin icon.png' size='small' />
        <div className='header-content'>
          <h1>Neighborhood Jobs</h1>
          <div className='search-container'>
            <Input
              fluid
              icon='search'
              iconPosition='left'
              placeholder='Search for jobs, skills, or companies...'
              size='huge'
              className='job-search-bar'
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>
      <div className="horizontal-line"></div>
    </>
  );
}

export default Header;