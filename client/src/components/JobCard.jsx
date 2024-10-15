import React from 'react';

function JobCard({ jobTitle, company, salary, jobLocation, jobType }) {
  return (
    <div className="job-card">
      <h3>{jobTitle}</h3>
      <p><strong>Company:</strong> {company}</p>
      <p><strong>Salary:</strong> {salary}</p>
      <p><strong>Location:</strong> {jobLocation}</p>
      <p><strong>Job Type:</strong> {jobType}</p>
    </div>
  );
}

export default JobCard;

