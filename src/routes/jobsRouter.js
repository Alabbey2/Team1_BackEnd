const jobsRouter = require("express").Router();
const {
  getAllJobs,
  getOneJob,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobs");

jobsRouter.get("/", getAllJobs);
jobsRouter.get("/:jobId", getOneJob);
jobsRouter.post("/", createJob);
jobsRouter.put("/:jobId", updateJob);
jobsRouter.delete("/:jobId", deleteJob);

module.exports = jobsRouter;
