const Job = require("../models/job");

//Create job
const createJob = async (req, res) => {
  try {
    const { title, company, location, joburl, status } = req.body;

    const job = await Job.create({
      title,
      company,
      location,
      joburl,
      status,
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({
      message: "Failed  to Create Job",
      error: error.message,
    });
  }
};

// Read Data
const getJob = async (req, res) => {
  try {
    const jobs = await Job.find();

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update data
const updateJob = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({
      message: "Failed to Update Job",
      error: error.message,
    });
  }
};

// Delete Job
const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedJob = await Job.findByIdAndDelete(id);

    res.status(200).json(deletedJob);
  } catch (error) {
    res.status(500).json({
      message: "Cannot delete Job",
      error: error.message,
    });
  }
};

module.exports = { createJob, getJob, updateJob, deleteJob };
