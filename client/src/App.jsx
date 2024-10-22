import 'semantic-ui-css/semantic.min.css'
// import { Outlet } from 'react-router-dom'; commented out to render child routes
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
      const response = await fetch('/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
              query Jobs($term: String) {
                searchJobs(term: $term) {
                  _id
                  title
                  company
                  location
                  description
                }
              }
            `,
            variables: {
              term: searchQuery || '',  // Empty string to fetch all jobs if no search term
            },
          }),
        });

        const result = await response.json();
        setJobs(result.data.searchJobs);  // Update jobs state with result from GraphQL query
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, [searchQuery]);

  return (
    <>
      <Navbar />
      <Header onSearch={setSearchQuery} />
      <main>
      <div>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div key={job._id}>
                <h3>{job.title}</h3>
                <p>{job.company}</p>
                <p>{job.location}</p>
                <p>{job.description}</p>
              </div>
              ))
            ) : (
              <p>No jobs found</p>
            )}
          </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
