async function fetchData(url, request) {
  try {
    const response = await fetch(url, request);
    if (!response.ok) {
      console.error(`Response status: ${response.status}`);
    }
    return response;
  } catch (error) {
    console.error(`failed to fetch: ${error.message}`);
  }
}

export async function fetchPublishedEvents() {
  const hostname = window.location.hostname;
  const url = `http://${hostname}:8000/events/published/`;
  console.log(url);
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

export async function postRegistration(dataObj) {
  const hostname = window.location.hostname;
  const url = `http://${hostname}:8000/dj-rest-auth/registration/`;
  console.log(url);
  const req = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dataObj)
  };
  return fetchData(url, req)
  .then(res => res.json())
  .catch(error => {
    console.error(`failed to extract json: ${error.message}`)
  })
}

export async function fetchCategories(endpoint) {
  const url = `http://${window.location.hostname}:8000/${endpoint}`
  const req = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  return fetchData(url, req)
  .then(res => res.json())
  .catch(error => {
    console.error(`failed to extract json: ${error.message}`)
  })
}
