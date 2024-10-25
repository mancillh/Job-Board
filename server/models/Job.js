const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  company: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: {
    type: [String],
    default: [],
    required: false
  },
  salary: {
    type: String,
    trim: true,
    required: true
  },
  jobType: {
    type: String,
    enum: ['Hybrid', 'Remote', 'In-Person'],
    required: true,
  },
  postedDate: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true,
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;