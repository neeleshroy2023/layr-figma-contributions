const apiRequests = async (setFigmaVersions, url = `https://api.figma.com/v1/files/${process.env.REACT_APP_URL_ONE}/versions`) => {
  const figmaToken = process.env.REACT_APP_FIGMA_TOKEN;
  const apiUrl = url
  const headers = {
    "X-FIGMA-TOKEN": figmaToken,
    "Content-Type": "application/json",
  };
  return fetch(apiUrl, {
    method: "GET",
    headers: headers,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      if(data?.pagination?.next_page) {
        apiRequests(setFigmaVersions, data.pagination.next_page)
        setFigmaVersions((prev) => [...prev, ...data.versions]);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export default apiRequests;
