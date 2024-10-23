import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;

export const QUERY_JOBS = gql`
  query {
    jobs {
      _id
      title
      company
      location
      description
      requirements
      jobType
      salary
      postedDate
    }
  }
`;

export const GET_SAVED_JOBS = gql`
  query getSavedJobs {
    me {
      _id
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