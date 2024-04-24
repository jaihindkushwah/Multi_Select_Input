import { useEffect, useState } from "react";

function useFetch(url, query) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url || !query || !query.trim()) {
      return;
    }
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [query,url]);

  return { data, loading, error,setData };
}

export default useFetch;
