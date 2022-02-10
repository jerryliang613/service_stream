import { useEffect, useState, useContext } from "react";
import useFetch from "../hooks/useFetch";
import MovieTable from "./MovieTable";
import Pagination from "./Pagination";
import { movieContext } from "../contexts/MovieContext";

export default function Movies() {
  const { movies, setMovies } = useContext(movieContext);
  const [page, setPage] = useState(1);

  const { data, isLoading, err } = useFetch(
    `https://jsonmock.hackerrank.com/api/movies/?page=${page}`
  );
  useEffect(() => {
    setMovies(data);
  }, [data, setMovies]);

  const handlePageChange = (change) => {
    let temp = page;
    switch (change) {
      case "pre":
        if (page === 1) return;
        temp = page - 1;
        break;
      case "next":
        if (page === movies.total_pages) return;
        temp = page + 1;
        break;
      case "first":
      default:
        temp = 1;
        break;
      case "last":
        temp = movies.total_pages;
    }
    setPage(temp);
  };

  return !isLoading ? (
    err ? (
      <div>{err}</div>
    ) : (
      <div className="content">
        <MovieTable movies={movies && movies.data} />
        <Pagination onPageChange={handlePageChange} />
      </div>
    )
  ) : (
    <div>Loading...</div>
  );
}
