import React from 'react';
import { Card, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const JobCard = ({ job }) => {
  return (
    <Card className="job-card">
      <Card.Content>
        <Card.Header>{job.title}</Card.Header>
        <Card.Meta>{job.company}</Card.Meta>
        <Card.Description>
          <p><Icon name="map marker alternate" /> {job.location}</p>
          <p><Icon name="dollar sign" /> {job.salary || 'Not specified'}</p>
          <p><Icon name="clock outline" /> {job.jobType}</p>
          <p>{job.description}</p>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button basic color='blue' fluid>
          View Details
        </Button>
      </Card.Content>
    </Card>
  );
};

JobCard.propTypes = {
  job: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    description: PropTypes.string,
    salary: PropTypes.string,
    jobType: PropTypes.string,
    postedDate: PropTypes.string,
  }).isRequired,
};

export default JobCard;