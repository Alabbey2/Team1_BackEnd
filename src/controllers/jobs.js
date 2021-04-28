const Job = require("../modals/job.js");

const getAllJobs = async (req, res, next) => {
  //loads all the jobs from the db, filtering done on client side
  try {
    const result = await Job.find({});
    res.json(result);
  } catch (err) {
    res.json({ Error: err.message });
  }
};
const getOneJob = async (req, res, next) => {
  //loads a single job item with given id
  try {
    const newId = req.params.jobId;
    const result = await Job.findOne({ _id: newId });
    res.json({ result });
  } catch (err) {
    res.json({ Error: err.message });
  }
};
const createJob = async (req, res, next) => {
  //TODO Additional check for who can create a new Job
  try {
    const job = req.body;
    let NewJob = new Job(job);
    NewJob.save((err, result) => {
      if (err) return res.json("Failed to add!!!!");
      res.json({ Message: "Successfully added NewJob" });
    });
  } catch (err) {
    res.json({ Error: err.message });
  }
};
const updateJob = async (req, res, next) => {
  //TODO Additional check for who can make updates
  try {
    const { jobId } = req.params;
    const checkifExists = await Job.findOne({ _id: jobId });
    if (checkifExists) {
      const {
        title,
        type,
        level,
        description,
        deadline,
        location,
        techs,
      } = req.body;
      const updatedJob = {
        title: title ? title : checkifExists.title,
        type: type ? type : checkifExists.type,
        level: level ? level : checkifExists.level,
        description: description ? description : checkifExists.description,
        deadline: deadline ? deadline : checkifExists.deadline,
        location: location ? location : checkifExists.location,
        techs: techs ? techs : checkifExists.techs,
      };
      await Job.findByIdAndUpdate(jobId, updatedJob, {
        new: true,
      }).then((result) =>
        res.status(200).json({ Message: `Job ${jobId} Successfully updated` })
      );
    } else {
      throw new Error(`Job ${jobId} not found`);
    }
  } catch (err) {
    res.json({ Error: err.message });
  }
};

const deleteJob = async (req, res, next) => {
  //TODO Additional check for who delete jobs
  try {
    const newId = req.params.jobId;
    const job = await Job.findOne({ _id: newId });
    if (job) {
      await Job.findByIdAndDelete(newId).then((result) => {
        res.status(200).json({ message: "Successfully Deleted" });
      });
    } else {
      throw new Error(`Job ${newId} not found`);
    }
  } catch (err) {
    res.json({ Error: err.message });
  }
};

module.exports = { getAllJobs, getOneJob, createJob, updateJob, deleteJob };
