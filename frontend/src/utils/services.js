export const baseUrl = "http://localhost:5000/api";

export const postRequest = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });

  const data = await response.json();

  if (!response.ok) {
    let errorMessage;

    if (data?.message) {
      errorMessage = data.message;
    } else {
      errorMessage = data;
    }

    return { error: true, errorMessage };
  }

  return data;
};

export const getRequest = async (url) => {
  const response = await fetch(url);  

  const data = await response.json();

  if (!response.ok) {
    let errorMessage = "Get request failed";

    if (data?.message) {
      errorMessage = data.message;
    } 

    return { error: true, errorMessage };
  }

  return data;
};
