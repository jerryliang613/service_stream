import _ from "lodash";
import { useState } from "react";
import Search from "./Search";

export default function MovieTable({ movies }) {
  const [search, setSearch] = useState("");
  const [orderby, setOrderby] = useState({ Title: "asc", Year: "asc" });
  const [selected, setSelected] = useState(new Set([]));

  const filteredMovies = () => {
    const filtered = movies.filter((movie) =>
      !search.trim()
        ? movie
        : movie.Title.toLowerCase().includes(search.trim().toLowerCase())
    );
    const orderbyObj = { name: [], value: [] };
    Object.entries(orderby).forEach(([key, value]) => {
      orderbyObj.name = [...orderbyObj.name, key];
      orderbyObj.value = [...orderbyObj.value, value];
    });

    return _.orderBy(filtered, orderbyObj.name, orderbyObj.value);
  };

  const handleChange = (value) => {
    setSearch(value);
    setOrderby({ Year: "asc", Title: "asc" });
    setSelected(new Set([]));
  };
  const handleOrder = (field) => {
    const obj = { [field]: orderby[field] === "asc" ? "desc" : "asc" };
    const order = { ...orderby };
    delete order[field];

    setOrderby({
      ...obj,
      ...order,
    });
  };

  const handleSelect = (id) => {
    const selecteditems = new Set(selected);
    if (selecteditems.has(id)) {
      selecteditems.delete(id);
    } else {
      selecteditems.add(id);
    }
    setSelected(selecteditems);
  };

  return (
    <>
      <Search onChange={handleChange} />
      <table>
        <tbody>
          <tr className="table_header">
            <th>
              Title{" "}
              <span onClick={() => handleOrder("Title")}>
                {orderby.Title === "asc" ? (
                  <span>&#x25B2;</span>
                ) : (
                  <span>&#x25BC;</span>
                )}
              </span>
            </th>
            <th>
              Year{" "}
              <span onClick={() => handleOrder("Year")}>
                {orderby.Year === "asc" ? (
                  <span>&#x25B2;</span>
                ) : (
                  <span>&#x25BC;</span>
                )}
              </span>
            </th>
          </tr>
          {filteredMovies().map((movie, idx) => (
            <tr
              key={idx}
              onClick={() => handleSelect(movie.imdbID)}
              style={{
                backgroundColor: selected.has(movie.imdbID)
                  ? "green"
                  : "initial",
              }}
            >
              <td>{movie.Title}</td>
              <td>{movie.Year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
