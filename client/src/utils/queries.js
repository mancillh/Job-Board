<<<<<<< HEAD
// utils/queries.js

import { gql } from '@apollo/client';

// Mutation for adding a new user profile (used for signup)
export const ADD_PROFILE = gql`
  mutation addProfile($username: String!, $email: String!, $password: String!) {
    addProfile(username: $username, email: $email, password: $password) {
      token
      profile {
        _id
        username
        email
      }
    }
  }
`;

// Mutation for logging in an existing user (used for login)
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        username
        email
      }
    }
  }
`;

// Mutation for updating a user profile
export const UPDATE_PROFILE = gql`
  mutation updateProfile($id: ID!, $username: String, $email: String, $password: String) {
    updateProfile(id: $id, username: $username, email: $email, password: $password) {
=======
import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
>>>>>>> 64b398fcf270ff80781255435320c71eb3edb0db
      _id
      username
      email
    }
  }
<<<<<<< HEAD
`;

// Mutation for deleting a user profile
export const DELETE_PROFILE = gql`
  mutation deleteProfile($id: ID!) {
    deleteProfile(id: $id) {
      message
    }
  }
`;

// Mutation for adding a new job posting
export const ADD_JOB = gql`
  mutation addJob($title: String!, $description: String!, $location: String!, $salary: String!) {
    addJob(title: $title, description: $description, location: $location, salary: $salary) {
      _id
      title
      description
      location
      salary
      createdAt
    }
  }
`;

// Mutation for updating an existing job posting
export const UPDATE_JOB = gql`
  mutation updateJob($id: ID!, $title: String, $description: String, $location: String, $salary: String) {
    updateJob(id: $id, title: $title, description: $description, location: $location, salary: $salary) {
      _id
      title
      description
      location
      salary
      updatedAt
    }
  }
`;

// Mutation for deleting a job posting
export const DELETE_JOB = gql`
  mutation deleteJob($id: ID!) {
    deleteJob(id: $id) {
      message
    }
  }
`;

// Mutation for applying for a job
export const APPLY_FOR_JOB = gql`
  mutation applyForJob($jobId: ID!, $userId: ID!) {
    applyForJob(jobId: $jobId, userId: $userId) {
      _id
      applicant {
        _id
        username
        email
      }
      job {
        _id
        title
      }
    }
  }
`;

// Mutation for saving a job posting
export const SAVE_JOB = gql`
  mutation saveJob($jobId: ID!, $userId: ID!) {
    saveJob(jobId: $jobId, userId: $userId) {
      _id
      savedJobs {
        _id
        title
        description
      }
    }
  }
`;

// Mutation for removing a saved job posting
export const REMOVE_SAVED_JOB = gql`
  mutation removeSavedJob($jobId: ID!, $userId: ID!) {
    removeSavedJob(jobId: $jobId, userId: $userId) {
      _id
      savedJobs {
        _id
        title
        description
      }
    }
  }
`;

// Mutation for adding a comment to a job posting
export const ADD_COMMENT = gql`
  mutation addComment($jobId: ID!, $commentText: String!) {
    addComment(jobId: $jobId, commentText: $commentText) {
      _id
      comments {
        _id
        commentText
        createdAt
        username
      }
    }
  }
`;

// Mutation for updating a comment
export const UPDATE_COMMENT = gql`
  mutation updateComment($commentId: ID!, $commentText: String!) {
    updateComment(commentId: $commentId, commentText: $commentText) {
      _id
      commentText
      updatedAt
    }
  }
`;

// Mutation for deleting a comment
export const DELETE_COMMENT = gql`
  mutation deleteComment($commentId: ID!) {
    deleteComment(commentId: $commentId) {
      message
    }
  }
`;

// Mutation for changing a user's password
export const CHANGE_PASSWORD = gql`
  mutation changePassword($id: ID!, $currentPassword: String!, $newPassword: String!) {
    changePassword(id: $id, currentPassword: $currentPassword, newPassword: $newPassword) {
      message
    }
  }
`;

// Example query to fetch user data
export const GET_USER = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      _id
      username
      email
      jobPosts {
        _id
        title
        description
      }
    }
  }
`;
=======
`;
>>>>>>> 64b398fcf270ff80781255435320c71eb3edb0db
