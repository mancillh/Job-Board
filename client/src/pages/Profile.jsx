import React from 'react';
import { Container, Header, Segment, Icon } from 'semantic-ui-react';
import { Navigate } from 'react-router-dom';
import Auth from '../utils/auth';
import '../styles/ProfilePages.css';
const Profile = () => {
  // Check if user is logged in
  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />;
  }
  // Get user data from token
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
        {/* Saved Jobs Section */}
        <Segment>
          <Header as='h4'>
            <Icon name='bookmark' />
            Saved Jobs
          </Header>
          {/* Add saved jobs display logic here when that functionality is ready */}
          <p style={{ textAlign: 'center' }}>
            No saved jobs yet. Start exploring and save jobs you're interested in!
          </p>
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
    </div>
  );
};
export default Profile;