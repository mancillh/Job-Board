// server/schemas/resolvers.js
const { AuthenticationError, UserInputError } = require('apollo-server-express');
const { User, Job } = require('../models');
const { signToken } = require('../utils/auth');
const { GraphQLScalarType } = require('graphql');

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    if (value instanceof Date) {
      return value.getTime(); // Convert outgoing Date to integer for JSON
    }
    throw Error('GraphQL Date Scalar serializer expected a `Date` object');
  },
  parseValue(value) {
    if (typeof value === 'number') {
      return new Date(value); // Convert incoming integer to Date
    }
    throw new Error('GraphQL Date Scalar parser expected a `number`');
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      // Convert hard-coded AST string to integer and then to Date
      return new Date(parseInt(ast.value, 10));
    }
    // Invalid hard-coded value (not an integer)
    return null;
  },
});

const resolvers = {
  Date: dateScalar,
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).select('-password');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    jobs: async () => {
      return Job.find().sort({ createdAt: -1 });
    },
    searchJobs: async (parent, { term }) => {
      if (!term) {
        return Job.find().sort({ createdAt: -1 });  // Return all jobs if no search term
      }
      
      const regex = new RegExp(term, 'i');
      return Job.find({
        $or: [
          { title: regex },
          { company: regex },
          { location: regex },
        ],
      });
    },
  },
  Mutation: {
    signup: async (parent, { username, email, password }) => {
      console.log('Signup mutation called with:', username, email);  // Debugging line
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    },
    addJob: async (parent, { title, company, location, description }, context) => {
      if (context.user) {
        const job = await Job.create({ title, company, location, description });
        return job;
      }
      throw new AuthenticationError('You need to be logged in to add a job!');
    },
  },
};
module.exports = resolvers;