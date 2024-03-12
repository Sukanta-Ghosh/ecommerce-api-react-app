import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState({});
  const [error, setError] = useState();

  async function fetchData(url) {
    return await fetch(url).then((response) => response.json());
  }

  useEffect(() => {
    fetchData(url)
      .then((data) => {
        setData(data);
      })
      .catch((error) => setError(error));
  }, [url]);

  return { data, error };
};

export default useFetch;
