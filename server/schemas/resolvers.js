// server/schemas/resolvers.js
const { AuthenticationError, UserInputError } = require('apollo-server-express');
const { User, Job } = require('../models');
const { signToken } = require('../utils/auth');
const resolvers = {
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