import React from 'react';
import { Container, Header, Segment, Icon } from 'semantic-ui-react';
import { Navigate } from 'react-router-dom';
import Auth from '../utils/auth';
import '../styles/ProfilePages.css';

const Profile = () => {
  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />;
  }

  const userProfile = Auth.getProfile() || {};

  return (
    <div className="profile-page">
      <Container className="profile-container">
        <Header as='h2' textAlign='center' className="profile-header">
          Profile
        </Header>

        {/* Username Display */}
        <Segment textAlign='center'>
          <Icon name='user circle' size='large' />
          <Header as='h3' className="profile-username">
            {userProfile.username || userProfile.email || 'User'}
          </Header>
        </Segment>

        {/* Saved Jobs Section */}
        <Segment className="saved-jobs-segment">
          <Header as='h4' className="section-header">
            <Icon name='bookmark' />
            Saved Jobs
          </Header>
          <div className="no-jobs-message">
            <p className="message-text">Save Jobs to See them Here</p>
            <Icon name='hand point up' size='large' />
          </div>
        </Segment>
      </Container>
    </div>
  );
};

export default Profile;