import React from 'react';
import PropTypes from 'prop-types';
import { Container, Header, Segment, Icon } from 'semantic-ui-react';
import { Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_SAVED_JOBS } from '../utils/queries';
import JobCard from '../components/JobCard';
import Auth from '../utils/auth';
import '../styles/ProfilePages.css';

const Profile = () => {
  // Check if user is logged in
  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />;
  }

  // Get user data from token
  const userProfile = Auth.getProfile() || {};

  // Query for saved jobs
  const { loading, data } = useQuery(GET_SAVED_JOBS);
  const savedJobs = data?.me?.savedJobs || [];

  return (
    <div className="profile-page">
      <Container className="profile-container">
        <Header as='h2' textAlign='center' className="profile-header">
          Profile
        </Header>
        
        {/* Username Display */}
        <Segment textAlign='center'>
          <Icon name='user circle' size='large' />
          <Header as='h3'>
            {userProfile.username || userProfile.email || 'User'}
          </Header>
          {userProfile.email && (
            <p>
              <Icon name='mail' />
              {userProfile.email}
            </p>
          )}
        </Segment>
        
        {/* Account Created Date - if available in your token */}
        {userProfile.createdAt && (
          <Segment>
            <Header as='h4'>
              <Icon name='calendar' />
              Member Since
            </Header>
            <p>{new Date(userProfile.createdAt).toLocaleDateString()}</p>
          </Segment>
        )}
      </Container>

      {/* Saved Jobs Section - Now outside the profile container */}
      <div className="saved-jobs-section">
        <Header as='h4' className="saved-jobs-header">
          <Icon name='bookmark' />
          Saved Jobs
        </Header>
        
        {loading ? (
          <div className="loading-message">
            <Icon name='spinner' loading />
            Loading saved jobs...
          </div>
        ) : savedJobs.length > 0 ? (
          <div className="saved-jobs-grid">
            {savedJobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                saved={true}
              />
            ))}
          </div>
        ) : (
          <p className="no-jobs-message">
            Save Jobs to See them Here
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;