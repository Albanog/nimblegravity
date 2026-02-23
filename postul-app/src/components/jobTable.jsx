export default function JobsTable({ jobs, repos, onChange, onSubmit }) {
  return (
    <table className="job-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Repository URL</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {jobs.map((job) => (
          <tr key={job.id}>
            <td>{job.title}</td>

            <td>
              <input
                type="text"
                value={repos[job.id] || ""}
                onChange={(e) => onChange(job.id, e.target.value)}
                placeholder="https://github.com/..."
              />
            </td>

            <td>
              <button onClick={() => onSubmit(job)}>
                Submit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}