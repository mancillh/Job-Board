import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user {
    _id
  }
`;

export const QUERY_JOBS = gql`
  query jobs($_id: String) {
    matchups(_id: $id) {
      _id
      title
      company
      location
      salary
      jobType
      description
      requirements
      postedDate
    }
  }
`;
