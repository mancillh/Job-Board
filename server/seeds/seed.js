const db = require("../config/connection");
const { Job, User } = require("../models");
const cleanDB = require("./cleanDB");

const jobData = require("./jobData.json");
const userData = require("./userData.json");

db.once("open", async () => {
  try {
    // Clean existing data
    await cleanDB("Job", "jobs");
    await cleanDB("User", "users");

    // Create users first
    const users = await User.create(userData);
    console.log('Users created');

    // Assign a random user as the poster for each job
    const jobPromises = jobData.map(job => {
      // Get a random user from the created users
      const randomUser = users[Math.floor(Math.random() * users.length)];
      
      return Job.create({
        ...job,
        postedBy: randomUser._id, // Add the user reference
        postedDate: new Date() // Add current date for postedDate
      });
    });

    await Promise.all(jobPromises);
    console.log("Users and Jobs have been seeded!");
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});