import React, { useState } from 'react';
import { Image, Input } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      // Navigate to home page with search query
      navigate(`/home?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm(''); // Clear search after submitting
    }
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleSearch}
            />
          </div>
        </div>
      </div>
      <div className="horizontal-line"></div>
    </>
  );
}

export default Header;