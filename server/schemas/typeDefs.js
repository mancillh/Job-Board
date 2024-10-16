// server/schemas/typeDefs.js

const { gql } = require('apollo-server-express');
const typeDefs = gql`



  type User {
    id: ID!             # Unique identifier for the user
    username: String!   # Username chosen by the user
    email: String!      # User's email address
  }


  type Job {
    id: ID!              # Unique identifier for the job
    title: String!      # Title of the job position
    company: String!    # Company offering the job
    location: String     # Location of the job (optional)
    description: String  # Detailed description of the job (optional)
    createdAt: String    # Timestamp when the job was created
  }

  type AuthPayload {
    token: String!  # JWT token for authenticated sessions
    user: User!     # Authenticated user's data
  }

  type Query {
    me: User
    jobs: [Job!]!
    searchJobs(term: String!): [Job!]!
  }


  type Mutation {

    signup(
      username: String!
      email: String!
      password: String!
    ): AuthPayload!


    login(
      email: String!
      password: String!
    ): AuthPayload!

    addJob(
      title: String!
      company: String!
      location: String
      description: String
    ): Job!
  }

`;


module.exports = typeDefs;
