import { Link } from "react-router-dom";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.title}>Menú de Incidentes</h1>
      <nav className={styles.menu}>
        <ul>
          <li>
            <Link to="/segaero/regincident/create" className={styles.menuLink}>
              <button className={styles.menuButton}>Crear Incidente</button>
            </Link>
          </li>
          <li>
            <button className={styles.menuButton}>
              Ver Todos los Incidentes
            </button>
          </li>
          <li>
            <button className={styles.menuButton}>Editar Incidente</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
