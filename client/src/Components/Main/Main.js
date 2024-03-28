import React from "react";
import styles from "./Main.module.css";
import Navbar from "../Navbar/Navbar";
import Discount from "../Discount/Discount";
import Sort from "../Sort/Sort";
import ProductCard from "../ProductCard/ProductCard";

const Main = () => {
  return (
    <div className={styles.Main}>
      <Navbar />
      <Discount />
      <Sort />
      <ProductCard />
    </div>
  );
};

export default Main;
