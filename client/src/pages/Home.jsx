import React from "react";
import { Image, Loader } from "semantic-ui-react";
import JobCard from "../components/JobCard";
import "../styles/JobListCorkboard.css";
import { QUERY_JOBS } from "../utils/queries";
import { useQuery } from "@apollo/client";

function Home() {
  const { loading, data } = useQuery(QUERY_JOBS);
  const jobList = data?.jobs || [];

  return (
    <div className="home-container">
      <div className="corkboard">
        <Image
          className="cork-background"
          src="/corkboard banner.jpg"
          size="massive"
        />
        <Image
          className="cork-background"
          src="/corkboard banner.jpg"
          size="massive"
        />
        <Image
          className="cork-background"
          src="/corkboard banner.jpg"
          size="massive"
        />
      </div>
      <div className="job-cards-overlay">
        {loading ? (
          <Loader active>Loading Jobs...</Loader>
        ) : (
          jobList.map(job => (
            <JobCard key={job._id} job={job} />
          ))
        )}
      </div>
    </div>
  );
}

export default Home;