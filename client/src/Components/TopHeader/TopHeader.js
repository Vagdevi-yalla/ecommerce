import React from "react";
import styles from "./TopHeader.module.css";
import phoneIcon from "../../assets/mobile-icon.png";

const TopHeader = () => {
  return (
    <div className={styles.TopHeader}>
      <div className={styles.phoneSection}>
        <img src={phoneIcon} alt="phone-icon" />
        <p>912121131313</p>
        <input type="text" value="" placeholder="Search Musicart"></input>
      </div>
      <div>
        <p className={styles.discountText}>
          Get 50% off on selected items
          <span>|</span> Shop Now
        </p>
      </div>
    </div>
  );
};

export default TopHeader;
