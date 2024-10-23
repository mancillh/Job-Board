import React from "react";
import { Image, Loader, Message } from "semantic-ui-react";
import { useLocation } from "react-router-dom";
import JobCard from "../components/JobCard";
import "../styles/JobListCorkboard.css";
import { QUERY_JOBS, SEARCH_JOBS } from "../utils/queries";
import { useQuery } from "@apollo/client";

function Home() {
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

  const jobList = searchTerm ? data?.searchJobs || [] : data?.jobs || [];

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
        {jobList.length > 0 ? (
          jobList.map(job => (
            <JobCard key={job._id} job={job} />
          ))
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