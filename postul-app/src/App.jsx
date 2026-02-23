import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [repoUrl, setRepoUrl] = useState("");
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function loadJobs() {
      try {
        const res = await fetch("https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net/api/jobs/get-list");
        if (!res.ok) throw new Error();
        const data = await res.json();
        setJobs(data);
        setStatus("success");
      } catch {
        setStatus("error");
      }
    }

    loadJobs();
  }, []);

  const handleRowClick = (job) => {
    setSelectedJob(job);
    setRepoUrl("");
  };

  const handleSubmit = () => {
    if (!selectedJob) {
      alert("Please select a position");
      return;
    }

    if (!repoUrl.trim()) {
      alert("Please enter repository URL");
      return;
    }

    console.log("Applying to:", selectedJob.title);
    console.log("Repo:", repoUrl);
  };

  if (status === "loading") return <p>Loading positions...</p>;
  if (status === "error") return <p>Error loading jobs</p>;

  return (
    <div style={{ maxWidth: 800, margin: "40px auto" }}>
      <h1>Open Positions</h1>

      <table>
        <thead>
          <tr>
            <th>Title</th>
          </tr>
        </thead>

        <tbody>
          {jobs.map((job) => (
            <tr
              key={job.id}
              onClick={() => handleRowClick(job)}
              className={selectedJob?.id === job.id ? "selected-row" : ""}
            >
              <td>{job.title}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 20 }}>
        <h3>
          Selected Position:{" "}
          {selectedJob ? selectedJob.title : "None"}
        </h3>

        <input
          type="text"
          placeholder="GitHub Repository URL"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
        />

        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default App;