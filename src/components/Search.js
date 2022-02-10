import { useEffect, useState } from "react";
import * as _ from "lodash";

export default function Search({ onChange }) {
  const [value, setValue] = useState("");
  const debouncefn = _.debounce(() => {
    onChange(value);
  }, 500);
  useEffect(() => {
    debouncefn(value);
  }, [value]);

  const handleChange = ({ target }) => {
    setValue(target.value);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="search"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
