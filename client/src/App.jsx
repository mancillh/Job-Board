import 'semantic-ui-css/semantic.min.css'
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';
import { useState, useEffect } from 'react';
// import { query } from 'express';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = (query) => {
    setSearchQuery(query);
//this is where we filter the specific job listings or updating the component that displays jobs
  };

  return (
    <>
      <Navbar />
      <Header onSearch={handleSearch} />
      <main>
{/*the searchQuery to the component renders jobs listings */}

          <JobListings searchQuery={searchQuery} />
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
