import 'semantic-ui-css/semantic.min.css'
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';
import { useState, useEffect } from 'react';
// import { query } from 'express';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [jobs, setJobs] = useState([]);
// Fetch jobs from the server whenever searchQuery changes
useEffect(() => {
  const fetchJobs = async () => {
    try {
      const response = await fetch(`/api/jobs?query=${searchQuery}`);
      const data = await response.json();
      setJobs(data);  // Updates the jobs state with data from server
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  if (searchQuery) {
    fetchJobs();
  }
}, [searchQuery]);

  return (
    <>
      <Navbar />
      <Header onSearch={setSearchQuery} />
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
