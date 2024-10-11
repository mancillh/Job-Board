// server/schemas/resolvers.js

// Importing necessary libraries and modules
const jwt = require('jsonwebtoken');

// Importing the User and Job models to interact with MongoDB collections
const User = require('../models/User');
const Job = require('../models/Job');

// Importing error classes from Apollo Server to handle authentication and input errors
const { AuthenticationError, UserInputError } = require('apollo-server-express');

// Importing Joi for input validation to ensure data integrity
const Joi = require('joi');

// Importing escapeStringRegexp to sanitize user input and prevent Regular Expression Denial of Service (ReDoS) attacks
const escapeStringRegexp = require('escape-string-regexp');

// Importing a utility function to generate JWT tokens for authenticated users
const generateToken = require('../utils/token');


// Schema for user signup validation
const signupSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(), // Username must be a string between 3 and 30 characters
  email: Joi.string().email().required(), // Email must be a valid email address
  password: Joi.string().min(6).required(), // Password must be at least 6 characters long
});

// Schema for user login validation
const loginSchema = Joi.object({
  email: Joi.string().email().required(), // Email must be a valid email address
  password: Joi.string().required(), // Password is required
});

// Schema for adding a new job validation
const addJobSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(), // Job title must be between 3 and 100 characters
  company: Joi.string().min(2).max(100).required(), // Company name must be between 2 and 100 characters
  location: Joi.string().max(100).allow('', null), // Location can be up to 100 characters or null/empty
  description: Joi.string().allow('', null), // Description can be a string or null/empty
});

const resolvers = {
  Query: {

    me: async (_, __, { user }) => {
      // If no user is authenticated, throw an AuthenticationError
      if (!user) throw new AuthenticationError('Not authenticated');

      // Find the user by ID and exclude the password field from the result
      const foundUser = await User.findById(user.id).select('-password');
      if (!foundUser) throw new AuthenticationError('User not found');

      // Return the found user
      return foundUser;
    },

    jobs: () => Job.find().sort({ createdAt: -1 }),

    searchJobs: (_, { term }) => {
      // Escape the search term to prevent ReDoS attacks
      const escapedTerm = escapeStringRegexp(term);

      // Create a case-insensitive regular expression from the escaped term
      const regex = new RegExp(escapedTerm, 'i');

      // Find jobs where the title, company, or location matches the regex
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
      // Validate input data against the signup schema
      const { error } = signupSchema.validate({ username, email, password });
      if (error) throw new UserInputError('Invalid input', { errors: error.details });

      // Check if a user with the given email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new UserInputError('User already exists');

      // Create a new user with the provided details
      const user = new User({ username, email, password });
      await user.save();

      // Generate a JWT token for the newly created user using the token utility
      const token = generateToken(user._id);

      // Prepare the user data to exclude the password
      const userResponse = {
        id: user._id,
        username: user.username,
        email: user.email,
      };

      // Return the token and user data
      return { token, user: userResponse };
    },

    login: async (_, { email, password }) => {
      // Validate input data against the login schema
      const { error } = loginSchema.validate({ email, password });
      if (error) throw new UserInputError('Invalid input', { errors: error.details });

      // Find the user by email and explicitly select the password field for verification
      const user = await User.findOne({ email }).select('+password');
      if (!user) throw new AuthenticationError('No user with that email');

      // Compare the provided password with the stored hashed password
      const valid = await user.comparePassword(password);
      if (!valid) throw new AuthenticationError('Incorrect password');

      // Generate a JWT token for the authenticated user using the token utility
      const token = generateToken(user._id);

      // Prepare the user data to exclude the password
      const userResponse = {
        id: user._id,
        username: user.username,
        email: user.email,
      };

      // Return the token and user data
      return { token, user: userResponse };
    },


    addJob: async (_, { title, company, location, description }, { user }) => {
      // If the user is not authenticated, throw an AuthenticationError
      if (!user) throw new AuthenticationError('Not authenticated');

      // Validate input data against the addJob schema
      const { error } = addJobSchema.validate({ title, company, location, description });
      if (error) throw new UserInputError('Invalid input', { errors: error.details });

      // Create a new job with the provided details
      const job = new Job({ title, company, location, description });
      await job.save();

      // Return the newly created job
      return job;
    },
  },
};

// Export the resolvers to be used by Apollo Server
module.exports = resolvers;
