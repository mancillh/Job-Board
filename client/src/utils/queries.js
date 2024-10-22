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
  query allJobs {
    jobs {
      _id
      title
      company
      location
      description
    }
  }
`;