import React from 'react';
import JobCard from './JobCard'; // Assuming you have a PostItNote component

function Corkboard() {
  // Sample job data, could be replaced with dynamic data fetched from an API or a database
  const jobs = [
    { id: 1, title: 'Frontend Developer', details: 'Remote, React.js experience required' },
    { id: 2, title: 'Backend Developer', details: 'Node.js and Express.js required' },
    { id: 3, title: 'UX/UI Designer', details: 'Experience with Figma required' },
    // Add more job listings here if needed
  ];

  return (
    <div className="corkboard">
      {jobs.map((job) => (
        <PostItNote key={job.id} jobTitle={job.title} jobDetails={job.details} />
      ))}
    </div>
  );
}

export default Corkboard;
