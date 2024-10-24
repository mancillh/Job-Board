import React, { useState } from "react";
import { Image, Loader, Message, Button, Icon } from "semantic-ui-react";
import { useLocation } from "react-router-dom";
import JobCard from "../components/JobCard";
import "../styles/JobListCorkboard.css";
import { QUERY_JOBS, SEARCH_JOBS } from "../utils/queries";
import { useQuery } from "@apollo/client";

function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 12;

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('search');

  const { loading, error, data } = useQuery(
    searchTerm ? SEARCH_JOBS : QUERY_JOBS,
    {
      variables: searchTerm ? { term: searchTerm } : {},
      onError: (error) => {
        console.error('Detailed error:', error);
      }
    }
  );

  if (loading) return <Loader active>Loading Jobs...</Loader>;

  if (error) {
    return (
      <Message negative>
        <Message.Header>Error Loading Jobs</Message.Header>
        <p>{error.message}</p>
      </Message>
    );
  }

  const allJobs = searchTerm ? data?.searchJobs || [] : data?.jobs || [];
  
  // Calculate pagination
  const totalPages = Math.ceil(allJobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const currentJobs = allJobs.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0); // Scroll to top when changing pages
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0); // Scroll to top when changing pages
    }
  };

  return (
    <div className="home-container">
      <div className="corkboard">
        <Image
          className="cork-background"
          src="/corkboard banner.jpg"
          size="large"
        />
      </div>
      <div className="job-cards-overlay">
        {currentJobs.length > 0 ? (
          <>
            <div className="job-cards-grid">
              {currentJobs.map(job => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
            <div className="pagination-controls">
              {currentPage > 1 && (
                <Button 
                  icon 
                  labelPosition='left' 
                  color='teal'
                  onClick={handlePrevPage}
                >
                  <Icon name='left arrow' />
                  Previous Page
                </Button>
              )}
              {currentPage < totalPages && (
                <Button 
                  icon 
                  labelPosition='right' 
                  color='teal'
                  onClick={handleNextPage}
                >
                  Next Page
                  <Icon name='right arrow' />
                </Button>
              )}
            </div>
          </>
        ) : (
          <Message 
            warning 
            size="large"
            style={{ 
              textAlign: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              padding: '2rem'
            }}
          >
            <Message.Header>No Matching Jobs</Message.Header>
            <p>Try a different search</p>
          </Message>
        )}
      </div>
    </div>
  );
}

export default Home;