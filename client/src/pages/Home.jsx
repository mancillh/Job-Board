import React from "react";
import { Image } from "semantic-ui-react";
import JobCard from "../components/JobCard";
import "../styles/JobListCorkboard.css";
import { useQuery } from "@apollo/client";
import { QUERY_JOBS } from "../utils/queries";

// Sample job data
const sampleJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Co.",
    location: "Remote",
    salary: "$80,000 - $120,000",
    jobType: "Full-time",
    description:
      "We are looking for an experienced frontend developer to join our team. The ideal candidate will have strong skills in React and modern CSS.",
    requirements: [
      "3+ years of React experience",
      "Strong CSS skills",
      "Experience with state management",
    ],
    postedDate: new Date().toISOString(),
  },
  {
    id: 2,
    title: "UX Designer",
    company: "Design Studio",
    location: "New York, NY",
    salary: "$70,000 - $100,000",
    jobType: "Contract",
    description:
      "Seeking a creative UX designer to join our team for an exciting project.",
    requirements: [
      "3+ years of UX design experience",
      "Proficiency in Figma",
      "Strong portfolio",
    ],
    postedDate: new Date().toISOString(),
  },
  // Add more sample jobs as needed
];

const Home = () => {
  const { loading, data } = useQuery(QUERY_JOBS, {
    fetchPolicy: "no-cache",
  });

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
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="job-cards-overlay">
          {jobList.map((job) => (
            <JobCard key={job.id} job={job} /> 
            // this is where the problem is, I don't think it's pulling jobs off correctly. It may be because of the /utils/queries QUERY_JOBS
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
