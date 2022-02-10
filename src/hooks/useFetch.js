import { useState, useEffect } from "react";
export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const fetchData = (url) => {
    fetch(url)
      .then((result) => result.json())
      .then((data) => {
        setErr("");
        setData(data);
        setLoading(false);
      })
      .catch((e) => {
        setErr(e.message);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchData(url);
  }, [url]);
  return { data, isLoading, err };
}
