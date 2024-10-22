import React, { useState } from 'react';
import { Card, Button, Icon } from 'semantic-ui-react';
import '../styles/JobCard.css';

const JobCard = ({ job }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`job-card ${expanded ? 'expanded' : ''}`} onClick={toggleExpand}>
      <div className="job-card-content">
        <h3>{job.title}</h3>
        <p>{job.company}</p>
        <p><Icon name="map marker alternate" /> {job.location}</p>
        {expanded && (
          <div className="job-details">
            <p><Icon name="dollar sign" /> {job.salary || 'Not specified'}</p>
            <p><Icon name="clock outline" /> {job.jobType}</p>
            <h4>Job Description:</h4>
            <p>{job.description}</p>
            {job.requirements && job.requirements.length > 0 && (
              <>
                <h4>Requirements:</h4>
                <ul>
                  {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </>
            )}
            <p><Icon name="calendar" /> Posted on: {new Date(job.postedDate).toLocaleDateString()}</p>
            <Button color='green' fluid>
              Apply Now
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

// Define prop types
JobCard.propTypes = {
  job: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    salary: PropTypes.string,
    jobType: PropTypes.oneOf(['In-Person', 'Hybrid', 'Remote',]),
    requirements: PropTypes.arrayOf(PropTypes.string),
    postedDate: PropTypes.string,
    postedBy: PropTypes.shape({
      _id: PropTypes.string,
      username: PropTypes.string
    })
  }).isRequired
};

// Define default props (optional)
JobCard.defaultProps = {
  job: {
    salary: 'Not specified',
    requirements: [],
    jobType: 'Full-time',
  }
};

export default JobCard;