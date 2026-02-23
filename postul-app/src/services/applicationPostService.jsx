
export async function submitApplication({ uuid, jobId, candidateId, applicationId, repoUrl }) {
  const res = await fetch(`https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net/api/candidate/apply-to-job`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uuid,
      jobId,
      candidateId,
      applicationId,
      repoUrl,
    }),
  });

  if (!res.ok) {
    throw new Error("Error: Fail submitting application");
  }

  return res.json();
}