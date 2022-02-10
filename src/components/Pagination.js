import { useContext } from "react";
import { movieContext } from "../contexts/MovieContext";

export default function Pagination(props) {
  const { onPageChange } = props;
  const { movies } = useContext(movieContext);
  const handlePageChange = (change) => {
    onPageChange(change);
  };

  return (
    <div className="pagination">
      <span onClick={() => handlePageChange("first")}>{"<<"}</span>
      <span onClick={() => handlePageChange("pre")}>{"<"}</span>
      <span>{movies && movies.page}</span>
      <span onClick={() => handlePageChange("next")}>{">"}</span>
      <span onClick={() => handlePageChange("last")}>{">>"}</span>
      <span style={{ width: "initial" }}>
        Total Pages: {movies && movies.total_pages}
      </span>
    </div>
  );
}
