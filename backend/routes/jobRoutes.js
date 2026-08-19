const express = require("express");

const router = express.Router();

const {
  createJob,
  getJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

router.post("/", createJob);
router.get("/", getJob);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);

module.exports = router;
