export async function getJobs() {
  const res = await fetch("https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net/api/jobs/get-list");

  if (!res.ok) {
    throw new Error("Error: Fail fetching jobs");
  }

  return res.json();
}