import axios from 'axios';
import { useState, useEffect } from 'react'

// 4 - Custom hook
export const useFetch = (url) => {
  const [data, setData] = useState(null);

  // 5 d-Refactoring the POST
  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  const [callFetch, setCallFetch] = useState(false);

  // 6 - Loading
  const [loading, setLoading] = useState(false);

  // 7 - Handling errors
  const [error, setError] = useState(null);

  const httpConfig = async function (data, method) {
    if (method === "POST") {
      try {
        const response = await axios.post(urlBase, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 201) {
          console.log("Country added successfully");
        } else {
          console.error("Failed to add country");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // 6 - Loading
      setLoading(true);

      try {
        const response = await axios.get(url);

        const data = response.data;

        setData(data);
      } catch (error) {
        console.log(error.message);

        setError(":( OOPS! - There was an error when loading data.", error);
      }

      // 6 - Loading
      setLoading(false);
    };

    fetchData();
  }, [url, callFetch]);

  // 5 - Refactoring the Post - new Post
  useEffect(() => {
    const httpRequest = async () => {
      if (method === "POST") {
        const response = await axios.post(url, data, config);
        const json = response.data;
        setCallFetch(json);
      }
    };

    httpRequest();
  }, [config, method, url]);

  //Add and Delete Dynamic
  const refetchData = async () => {
    setCallFetch(!callFetch);
  };

  // 6 - Loading
  return { data, httpConfig, loading, error, refetchData };
}