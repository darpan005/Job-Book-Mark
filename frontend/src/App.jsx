import { useState, useEffect } from "react";
import "./App.css";

function App() {

  const [title,setTitle] = useState("");
  const [company,setCompany] = useState("");
  const [location,setLocation] = useState("");
  const [joburl,setJoburl] = useState("");
  const [status,setStatus] = useState("Saved");

  const [jobs,setJobs] = useState([]);

  // Get all Jobs
  useEffect(()=>{
    const getJobs = async ()=>{

      const response = await fetch("http://localhost:3000/api/jobs");

      const data = await response.json();

      setJobs(data);
    };
    getJobs();
  },[]);

  // Handle Submit
  const handleSubmit = async (e)=>{
    e.preventDefault();

    const newJob = {
      title,
      company,
      location,
      joburl,
      status
    };

    const response = await fetch("http://localhost:3000/api/jobs", {
      method:"POST",
      headers : {
        "Content-Type":"application/json"
      },
      body : JSON.stringify(newJob)
    });

    const data = await response.json();

    console.log(data);
  };

  return (
    <div>
      <h1>Job BookMark App</h1>

      <form onSubmit={handleSubmit} >
        <input 
        type="text"
        placeholder="Job Title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        />

        <input 
        type="text"
        placeholder="Company"
        value={company}
        onChange={(e)=>setCompany(e.target.value)}
        />

        <input 
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e)=>setLocation(e.target.value)}
        />

        <input 
        type="text"
        placeholder="Job URL"
        value={joburl}
        onChange={(e)=>setJoburl(e.target.value)}
        />

        <select
          value={status}
          onChange={(e)=>setStatus(e.target.value)}
        >          
          <option value="Saved">Saved</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Rejected">Rejected</option>
          <option value="Selected">Selected</option>
        </select>

        <button type="submit">Add Job</button>
      </form>

      <h2>Book Marked Job</h2>

      <div>
        {jobs.map((job)=>(
          <div key={job._id}>
            <h3>{job.title}</h3>
            <p>Company : {job.company}</p>
            <p>Location : {job.location}</p>
            <p>Status : {job.status}</p>
            <p>Job-Url : {job.joburl}</p>

          </div>
        ))}
      </div>

    </div>
  );
}

export default App;
