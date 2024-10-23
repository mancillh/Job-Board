import React, { useState } from 'react';
import { Card, Button, Icon, Message } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { SAVE_JOB } from '../utils/mutations';
import Auth from '../utils/auth';
import PropTypes from 'prop-types';
import '../styles/JobCard.css';

const JobCard = ({ job, saved = false }) => {
  const [expanded, setExpanded] = useState(false);
  const [saveJob] = useMutation(SAVE_JOB);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  const handleSaveJob = async (e) => {
    e.stopPropagation();
    try {
      await saveJob({
        variables: { jobId: job._id },
      });
    } catch (err) {
      console.error('Error saving job:', err);
    }
  };

  return (
    <div className={`job-card ${expanded ? 'expanded' : ''}`} onClick={handleClick}>
      <img 
        src="/red-pushpin-png-7.png" 
        alt="pushpin" 
        className="pushpin"
      />
      <Card className="card-content">
        <Card.Content>
          <Card.Header>{job.title}</Card.Header>
          <Card.Meta>
            <span className='company'>{job.company}</span>
          </Card.Meta>
          <Card.Description>
            <p><Icon name="map marker alternate" /> {job.location}</p>
            {expanded && (
              <>
                {job.salary && <p><Icon name="dollar sign" /> {job.salary}</p>}
                {job.jobType && <p><Icon name="clock outline" /> {job.jobType}</p>}
                <p className="description-text">{job.description}</p>
                {job.requirements && (
                  <div className="requirements">
                    <h4>Requirements:</h4>
                    <p>{job.requirements}</p>
                  </div>
                )}
                {Auth.loggedIn() ? (
                  !saved && (
                    <Button
                      color='teal'
                      fluid
                      onClick={handleSaveJob}
                      className="save-button"
                    >
                      <Icon name='bookmark outline' />
                      Save Job
                    </Button>
                  )
                ) : (
                  <Message warning className="signup-message">
                    Sign Up to See Job Details and Save Jobs!
                  </Message>
                )}
              </>
            )}
          </Card.Description>
        </Card.Content>
      </Card>
    </div>
  );
};

JobCard.propTypes = {
  job: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    description: PropTypes.string,
    requirements: PropTypes.string,
    salary: PropTypes.string,
    jobType: PropTypes.string,
    postedDate: PropTypes.string,
  }).isRequired,
  saved: PropTypes.bool
};

export default JobCard;