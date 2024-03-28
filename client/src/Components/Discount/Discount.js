import React from "react";
import styles from "./Discount.module.css";
import girlImg from "../../assets/home_girl.png";

const Discount = () => {
  return (
    <div className={styles.Discount}>
      <div>
        <h1>
          Grab upto 50% off on <br />
          Selected headphones
        </h1>
      </div>
      <div>
        <img src={girlImg} alt="girl" />
      </div>
    </div>
  );
};

export default Discount;
