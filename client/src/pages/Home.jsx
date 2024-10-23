import React from "react";
import { Image } from "semantic-ui-react";
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
          size="xlarge"
        />
        <Image
          className="cork-background"
          src="/corkboard banner.jpg"
          size="xlarge"
        />
        <Image
          className="cork-background"
          src="/corkboard banner.jpg"
          size="xlarge"
        />
      </div>
      {/* {loading ? (
        <div>loading...</div>
      ) : (
        <div className="job-cards-overlay">
          {jobList.map((job) => (
            console.log(job),
            <JobCard key={job._id} job={job.title} />
          ))}
          
        </div>
      )} */}
      <div className="job-cards-overlay">
        {jobList.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}

export default Home;
