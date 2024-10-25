import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SAVE_JOB = gql`
  mutation saveJob($jobId: ID!) {
    saveJob(jobId: $jobId) {
      _id
      username
      email
      savedJobs {
        _id
        title
        company
        location
        description
        jobType
        salary
        postedDate
      }
    }
  }
`;

export const REMOVE_JOB = gql`
  mutation removeJob($jobId: ID!) {
    removeJob(jobId: $jobId) {
      _id
      savedJobs {
        _id
      }
    }
  }
`;