const { AuthenticationError, UserInputError } = require('apollo-server-express');
const { User, Job } = require('../models');
const { signToken } = require('../utils/auth');
const { GraphQLScalarType, Kind } = require('graphql');

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    return value.getTime();
  },
  parseValue(value) {
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10));
    }
    return null;
  },
});

const resolvers = {
  Date: dateScalar,
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
          .select('-password')
          .populate('savedJobs');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    jobs: async () => {
      return Job.find().sort({ createdAt: -1 });
    },
    job: async (parent, { jobId }) => {
      return Job.findById(jobId);
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
        const job = await Job.create({
          title,
          company,
          location,
          description,
          postedBy: context.user._id
        });
        return job;
      }
      throw new AuthenticationError('You need to be logged in to add a job!');
    },
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
  }
};

module.exports = resolvers;