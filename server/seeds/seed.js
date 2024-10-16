const db = require("../config/connection");
const { Job, User } = require("../models");
const cleanDB = require("./cleanDB");

const jobData = require("./jobData.json");
const userData = require("./userData.json");

db.once("open", async () => {
  await cleanDB("Job", "jobs");

  await cleanDB("User", "users");

  // >>>>>>>>>>> DOES NOT WORK

  await Job.insertMany(jobData);

  await User.insertMany(userData);

  // <<<<<<<<<<< DOES NOT WORK

  console.log("User and Job DB seeded");
  process.exit(0);
});

/* POSSIBLE BUGS:

I'm not quite sure how to depend on default
    EX: Job's postedDate has a Date.now default - do I just leave out the postedDate in jobData.json?

I haven't the faintest clue on how to give postedBy and savedJobs inside seed.js or the json files.

*/