import React from "react";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <nav className={styles.menu}>
        <ul>
          <li className={styles.menuItem}>
            <a href="#autorizar-planes">Autorizar Planes de Vuelo</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
