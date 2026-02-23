import { useEffect, useState } from "react";
import { getJobs } from "./services/jobService";
import JobsTable from "./components/jobTable";
import { submitApplication } from "./services/applicationPostService";
import "./App.css";

export default function App() {

  const [jobs, setJobs] = useState([]);
  const [repos, setRepos] = useState({});
  
  useEffect(() => {
    getJobs()
      .then(setJobs)
      .catch((err) => {
        console.error("Error fetching jobs", err);
        alert("Failed to load jobs");
      });
  }, []);


  const handleChange = (jobId, value) => {
    setRepos((prev) => ({
      ...prev,
      [jobId]: value,
    }));
  };


  const handleSubmit = async(job) => {
    const repoUrl = repos[job.id];

    if (!repoUrl) {
      alert("Please enter repository URL");
      return;
    }

    try {
      const result = await submitApplication({
        uuid: "82196345-044e-44d5-ac91-73ce402de74f",
        jobId: job.id,
        candidateId: "74191510005",
        repoUrl,
      });

      if (result.ok) {
        alert("Application submitted!");
      } else {
        alert("Unexpected server response");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to submit application");
    }
  };

  return (
    <div className="app-container">
      <h1>Positions</h1>

      <JobsTable
        jobs={jobs}
        repos={repos}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}