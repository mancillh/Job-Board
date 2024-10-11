// server/schemas/resolvers.js
const User = require('../models/User');
const Job = require('../models/Job');
const { AuthenticationError, UserInputError } = require('apollo-server-express');
const Joi = require('joi');
const escapeStringRegexp = require('escape-string-regexp');
const generateToken = require('../utils/token');

// Define validation schemas using Joi
const signupSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const addJobSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  company: Joi.string().min(2).max(100).required(),
  location: Joi.string().max(100).allow('', null),
  description: Joi.string().allow('', null),
});

const resolvers = {
  Query: {

    me: async (_, __, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');

      const foundUser = await User.findById(user.id).select('-password');
      if (!foundUser) throw new AuthenticationError('User not found');

      return foundUser;
    },
    jobs: () => Job.find().sort({ createdAt: -1 }),
    searchJobs: (_, { term }) => {
      const escapedTerm = escapeStringRegexp(term);
      const regex = new RegExp(escapedTerm, 'i');
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

    signup: async (_, { username, email, password }) => {

      // Validate input
      const { error } = signupSchema.validate({ username, email, password });
      if (error) throw new UserInputError('Invalid input', { errors: error.details });

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new UserInputError('User already exists');

      // Create new user
      const user = new User({ username, email, password });
      await user.save();

      // Generate token
      const token = generateToken(user._id);

      // Prepare user response without password
      const userResponse = {
        id: user._id,
        username: user.username,
        email: user.email,
      };

      return { token, user: userResponse };
    },

    login: async (_, { email, password }) => {
      // Validate input
      const { error } = loginSchema.validate({ email, password });
      if (error) throw new UserInputError('Invalid input', { errors: error.details });

      // Find user by email
      const user = await User.findOne({ email }).select('+password'); // Explicitly select password
      if (!user) throw new AuthenticationError('No user with that email');

      // Check password
      const valid = await user.comparePassword(password);
      if (!valid) throw new AuthenticationError('Incorrect password');

      // Generate token
      const token = generateToken(user._id);

      // Prepare user response without password
      const userResponse = {
        id: user._id,
        username: user.username,
        email: user.email,
      };

      return { token, user: userResponse };
    },

    addJob: async (_, { title, company, location, description }, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');

      // Validate input
      const { error } = addJobSchema.validate({ title, company, location, description });
      if (error) throw new UserInputError('Invalid input', { errors: error.details });

      // Create new job
      const job = new Job({ title, company, location, description });
      await job.save();

      return job;
    },
  },
};

module.exports = resolvers;
