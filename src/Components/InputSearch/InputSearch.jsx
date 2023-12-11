import React from "react";
import { FaFilter, FaEllipsisV, FaSearch } from "react-icons/fa";
import "./InputSearch.scss";
function InputSearch({ valueSearch, setValueSearch }) {
  return (
    <div className="container-search-input">
      <FaSearch />
      <input
        type="text"
        className="input-search"
        placeholder="Pesquisar..."
        onChange={(e) => {
          setValueSearch(e.target.value);
        }}
        value={valueSearch}
      />
    </div>
  );
}

export default InputSearch;
