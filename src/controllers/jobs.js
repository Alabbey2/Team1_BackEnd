const Job = require('../modals/job.js');
const Company = require('../modals/company');

const getAllJobs = async (req, res, next) => {
  //loads all the jobs from the db, filtering done on client side
  try {
    const result = await Job.find({}).populate('company');
    res.json(result);
  } catch (err) {
    res.json({ Error: err.message });
  }
};
const getOneJob = async (req, res, next) => {
  //loads a single job item with given id
  try {
    const newId = req.params.jobId;
    const job = await Job.findOne({ _id: newId });
    res.send(job);
  } catch (err) {
    res.json({ Error: err.message });
  }
};

const getJobsByCompany = async (req, res) => {
  try {
    const { company } = req.params;
    const jobs = await Job.find({ company: company });
    res.send(jobs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createJob = async (req, res) => {
  //TODO Additional check for who can create a new Job
  try {
    const {
      company,
      title,
      deadline,
      location,
      description,
      level,
      type,
      techs,
    } = req.body;

    const newJob = {
      company,
      title,
      deadline,
      location,
      description,
      level,
      type,
      techs,
    };

    const savedJob = await new Job(newJob).save();
    if (savedJob) {
      const foundCompany = await Company.findOne({ _id: company });
      if (foundCompany) {
        await Company.findOneAndUpdate(
          { _id: company },
          { $push: { jobs: savedJob.id } },
          { upsert: true }
        )
          .then((result) => {
            console.log(result);
          })
          .catch((error) => {
            throw new Error('new job not added to the company');
          });
      }
      res.send(savedJob);
    }
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
        techs: techs.length > 0 ? techs : checkifExists.techs,
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
    const { jobId } = req.params;
    const job = await Job.findOne({ _id: jobId });
    const companyId = job.company;
    if (job) {
      await Job.findByIdAndDelete(jobId);
      res.status(200).json({ message: `Job ${jobId} successfully deleted` });
    } else {
      throw new Error(`Job ${newId} not found`);
    }
  } catch (err) {
    res.json({ Error: err.message });
  }
};

module.exports = {
  getAllJobs,
  getOneJob,
  createJob,
  updateJob,
  deleteJob,
  getJobsByCompany,
};
