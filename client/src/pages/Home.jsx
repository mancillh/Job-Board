import React from "react";
import { Image, Loader, Message } from "semantic-ui-react";
import JobCard from "../components/JobCard";
import "../styles/JobListCorkboard.css";
import { QUERY_JOBS } from "../utils/queries";
import { useQuery } from "@apollo/client";

function Home() {
  const { loading, error, data } = useQuery(QUERY_JOBS, {
    onError: (error) => {
      console.error('Detailed error:', error);
    }
  });

  if (loading) return <Loader active>Loading Jobs...</Loader>;
  
  if (error) {
    return (
      <Message negative>
        <Message.Header>Error Loading Jobs</Message.Header>
        <p>{error.message}</p>
      </Message>
    );
  }

  const jobList = data?.jobs || [];

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
        {jobList.map(job => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
}

export default Home;