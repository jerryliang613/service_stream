import { createContext, useEffect, useState } from "react";
const URL = "https://jsonmock.hackerrank.com/api/movies/search/";
export const movieContext = createContext();

const MovieContextProvider = ({ children }) => {
  const [movies, setMovies] = useState(null);
  useEffect(() => {
    fetch(URL)
      .then((re) => re.json())
      .then((data) => {
        setMovies(data);
      })
      .catch((e) => console.log(e.message));
  }, []);

  return (
    <movieContext.Provider value={{ movies, setMovies }}>
      {children}
    </movieContext.Provider>
  );
};
export default MovieContextProvider;
