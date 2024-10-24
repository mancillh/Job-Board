import React, { useState } from 'react';
import { Card, Button, Icon, Message } from 'semantic-ui-react';
import { useMutation, useQuery } from '@apollo/client';
import { SAVE_JOB, REMOVE_JOB } from '../utils/mutations';
import { GET_SAVED_JOBS } from '../utils/queries';
import Auth from '../utils/auth';
import PropTypes from 'prop-types';
import '../styles/JobCard.css';

const JobCard = ({ job, saved = false }) => {
  console.log('Job ID:', job._id);
  const [expanded, setExpanded] = useState(false);
  
  const [saveJob] = useMutation(SAVE_JOB, {
    refetchQueries: [{ query: GET_SAVED_JOBS }],
    onCompleted: (data) => {
      console.log('Mutation completed with data:', data);
    },
    onError: (error) => {
      console.error('Mutation error:', error.message);
      console.error('Mutation error details:', error.graphQLErrors);
      console.error('Network error:', error.networkError);
    }
  });

  const [removeJob] = useMutation(REMOVE_JOB, {
    refetchQueries: [{ query: GET_SAVED_JOBS }],
    onError: (error) => {
      console.error('Remove job error:', error);
    }
  });

  // Check if job is saved
  const { data } = useQuery(GET_SAVED_JOBS, {
    fetchPolicy: 'network-only'
  });
  
  const savedJobs = data?.me?.savedJobs || [];
  const isJobSaved = savedJobs.some(savedJob => savedJob._id === job._id);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  const handleSaveJob = async (e) => {
    console.log('Save button clicked');
    e.preventDefault();
    e.stopPropagation();
    if (!Auth.loggedIn()) {
      console.log('User not logged in'); 
      return;
    }

  const token = localStorage.getItem('id_token');
  console.log('Auth token exists:', !!token);
  console.log('User profile:', Auth.getProfile());
  
    try {
      console.log('Attempting to save job with ID:', job._id); 
      const response = await saveJob({
        variables: { jobId: job._id },
      });
      console.log('Save mutation response:', response); 
    } catch (err) {
      console.error('Error saving job:', err.message);
    }
  };

  const handleRemoveJob = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!Auth.loggedIn()) return;

    try {
      await removeJob({
        variables: { jobId: job._id }
      });
    } catch (err) {
      console.error('Error removing job:', err);
    }
  };

  // Rest of your component remains the same...
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
                  isJobSaved ? (
                    saved ? (
                      <Button
                        color='red'
                        fluid
                        onClick={handleRemoveJob}
                        className="save-button"
                      >
                        <Icon name='bookmark' />
                        Unsave Job
                      </Button>
                    ) : (
                      <Button
                        color='grey'
                        fluid
                        disabled
                        className="save-button"
                      >
                        <Icon name='bookmark' />
                        Saved
                      </Button>
                    )
                  ) : (
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