const { AuthenticationError, UserInputError } = require('apollo-server-express');
const { User, Job } = require('../models');
const { signToken } = require('../utils/auth');
const { GraphQLScalarType } = require('graphql');

const dateScalar = new GraphQLScalarType({
  // ... existing dateScalar configuration
});

const resolvers = {
  Date: dateScalar,
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        // Updated to populate savedJobs
        return User.findOne({ _id: context.user._id })
          .select('-password')
          .populate('savedJobs');
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
    // Add a query to get a single job
    job: async (parent, { jobId }) => {
      return Job.findById(jobId);
    },
  },
  Mutation: {
    signup: async (parent, { username, email, password }) => {
      console.log('Signup mutation called with:', username, email);
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
    // Add saveJob mutation
    saveJob: async (parent, { jobId }, context) => {
      if (context.user) {
        try {
          const updatedUser = await User.findByIdAndUpdate(
            context.user._id,
            {
              $addToSet: { savedJobs: jobId }
            },
            {
              new: true,
              runValidators: true
            }
          ).populate('savedJobs');

          return updatedUser;
        } catch (err) {
          throw new UserInputError('Error saving job');
        }
      }
      throw new AuthenticationError('You need to be logged in to save jobs!');
    },
    // Add removeJob mutation to remove a job from saved jobs
    removeJob: async (parent, { jobId }, context) => {
      if (context.user) {
        try {
          const updatedUser = await User.findByIdAndUpdate(
            context.user._id,
            {
              $pull: { savedJobs: jobId }
            },
            { new: true }
          ).populate('savedJobs');

          return updatedUser;
        } catch (err) {
          throw new UserInputError('Error removing saved job');
        }
      }
      throw new AuthenticationError('You need to be logged in to remove saved jobs!');
    }
  },
  // Add User type resolver to handle savedJobs field
  User: {
    savedJobs: async (parent) => {
      try {
        const user = await User.findById(parent._id).populate('savedJobs');
        return user.savedJobs;
      } catch (err) {
        throw new Error('Error fetching saved jobs');
      }
    }
  }
};

module.exports = resolvers;