import React from "react";
import styles from "./Navbar.module.css";
import logo from "../../assets/logo.png";
import cartImg from "../../assets/cart.png";

const Navbar = () => {
  return (
    <nav className={styles.Navbar}>
      <ul className={styles.navElements}>
        <li className={styles.logoFlex}>
          <img className={styles.logo} src={logo} alt="logo" />
          <h1 className={styles.logoText}>Musicart</h1>
        </li>

        <li>
          <p className={styles.navLink}>Home</p>
        </li>
        <li>
          <p className={styles.navLink}>Invoice</p>
        </li>
        <li>
          <button className={styles.cartButton}>
            <img className={styles.cartImg} src={cartImg} alt="cart" />
            View cart <span>0</span>
          </button>
        </li>
        <li>
          <button className={styles.profileButton}>FL</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
