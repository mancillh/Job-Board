const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date

  type User {
    _id: ID!
    username: String!
    email: String!
    savedJobs: [Job]
  }

  type Job {
    _id: ID!
    title: String!
    company: String!
    location: String!
    description: String
    jobType: String
    salary: String
    postedDate: Date
    postedBy: User
  }

  type Auth {
    token: String!
    user: User!
  }

  type Query {
    me: User
    jobs: [Job!]!
    job(jobId: ID!): Job
    searchJobs(term: String!): [Job!]!
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addJob(
      title: String!
      company: String!
      location: String!
      description: String!
    ): Job
    saveJob(jobId: ID!): User
    removeJob(jobId: ID!): User
  }
`;

module.exports = typeDefs;