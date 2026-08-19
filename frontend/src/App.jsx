import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [joburl, setJoburl] = useState("");
  const [status, setStatus] = useState("Saved");

  const [jobs, setJobs] = useState([]);

  const [editJob, setEditJob] = useState(null);

  // Get all Jobs
  useEffect(() => {
    const getJobs = async () => {
      const response = await fetch("http://localhost:3000/api/jobs");

      const data = await response.json();

      setJobs(data);
    };
    getJobs();
  }, []);

  //Handle Submit

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newjob = {
      title,
      company,
      location,
      joburl,
      status,
    };

    let response;

    if (editJob) {
      response = await fetch(`http://localhost:3000/api/jobs/${editJob}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newjob),
      });
    } else {
      response = await fetch("http://localhost:3000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newjob),
      });
    }

    const data = await response.json();

    console.log(data);

    if (editJob) {
      setJobs(jobs.map((job) => (job._id === editJob ? data : job)));

      setEditJob(null);
    } else {
      setJobs([...jobs, data]);
    }

    setTitle("");
    setCompany("");
    setLocation("");
    setJoburl("");
    setStatus("Saved");
    setEditJob(null);
  };
  //Handle delete Job
  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:3000/api/jobs/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    console.log(data);

    setJobs(jobs.filter((job) => job._id !== id));
  };

  // Handle Update Job
  const handleEdit = async (job) => {
    setEditJob(job._id);
    setTitle(job.title);
    setCompany(job.company);
    setLocation(job.location);
    setJoburl(job.joburl);
    setStatus(job.status);
  };

  return (
    <div className="container">
      <h1>Job BookMark App</h1>

      <form className="job-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          type="text"
          placeholder="Job URL"
          value={joburl}
          onChange={(e) => setJoburl(e.target.value)}
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Saved">Saved</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Rejected">Rejected</option>
          <option value="Selected">Selected</option>
        </select>

        <button type="submit">{editJob ? "Update Job" : "Add Job"}</button>
      </form>

      <h2>Book Marked Job</h2>

      <div className="jobs-container">
        {jobs.map((job) => (
          <div className="job-card" key={job._id}>
            <h3>{job.title}</h3>
            <p>Company : {job.company}</p>
            <p>Location : {job.location}</p>
            <p>
              Status :
              <span className={`status-badge ${job.status.toLowerCase()}`}>
                {job.status}
              </span>
            </p>
            <p>Job-Url : {job.joburl}</p>

            <button onClick={() => handleDelete(job._id)}>Delete</button>

            <button onClick={() => handleEdit(job)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
