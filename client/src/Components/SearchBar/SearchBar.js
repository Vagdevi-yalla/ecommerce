import React from "react";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  return (
    <div className={styles.SearchBar}>
      <input type="text" value="" placeholder="">
        Search by Product Name
      </input>
    </div>
  );
};

export default SearchBar;
