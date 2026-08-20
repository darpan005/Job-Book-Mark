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

  // Search
  const [search, setSearch] = useState("");

  // Get all Jobs
  useEffect(() => {
    const getJobs = async () => {
      const response = await fetch("http://localhost:3000/api/jobs");

      const data = await response.json();

      setJobs(data);
    };

    getJobs();
  }, []);

  // Handle Submit
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
      // Update Job
      response = await fetch(`http://localhost:3000/api/jobs/${editJob}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newjob),
      });
    } else {
      // Create Job
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

    // Update React state
    if (editJob) {
      setJobs(jobs.map((job) => (job._id === editJob ? data : job)));
    } else {
      setJobs([...jobs, data]);
    }

    // Clear form
    setTitle("");
    setCompany("");
    setLocation("");
    setJoburl("");
    setStatus("Saved");
    setEditJob(null);
  };

  // Handle Delete Job
  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:3000/api/jobs/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    console.log(data);

    setJobs(jobs.filter((job) => job._id !== id));
  };

  // Handle Edit Job
  const handleEdit = (job) => {
    setEditJob(job._id);

    setTitle(job.title);
    setCompany(job.company);
    setLocation(job.location);
    setJoburl(job.joburl);
    setStatus(job.status);
  };

  // Search Jobs
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="container">
      <h1>Job Bookmark App</h1>

      {/* Job Form */}

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

      {/* Search */}

      <h2>Bookmarked Jobs</h2>

      <input
        className="search-input"
        type="text"
        placeholder="Search by title or company..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Jobs */}

      <div className="jobs-container">
        {filteredJobs.map((job) => (
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
