import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import ActionButtons from "../ActionButtons/ActionButtons";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <Link to="/" className={styles.logo}>
          <h2>AVIANCA</h2>
        </Link>

        <div className={styles.navWrapper}>
          <ActionButtons />
        </div>
      </div>
    </header>
  );
};

export default Header;
