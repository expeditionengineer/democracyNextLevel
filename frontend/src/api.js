async function fetchData(url, request) {
  try {
    const response = await fetch(url, request);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return response;
  } catch (error) {
    console.error(`failed to fetch: ${error.message}`);
  }
}

export async function fetchPublishedEvents() {
  const url = "http://localhost:8000/events/published/";
  const req = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  return fetchData(url, req)
  .then(res => res.json())
  .catch(error => {
    console.error(`failed to extract json: ${error.message}`)
  })
}