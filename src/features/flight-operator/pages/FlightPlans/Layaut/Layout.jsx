import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import styles from "./styles.module.css";

const Layout = ({ children }) => {
  return (
    <div className={styles.appContainer}>
      <Header />

      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
