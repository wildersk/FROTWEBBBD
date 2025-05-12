import { Link } from "react-router-dom";
import styles from "./Unauthorized.module.css";

const Unauthorized = () => {
  return (
    <div className={styles.container}>
      <h1>403 - Acceso No Autorizado</h1>
      <p>No tienes permiso para acceder a esta página.</p>
      <Link to="/login" className={styles.link}>
        Volver al inicio de sesión
      </Link>
    </div>
  );
};

export default Unauthorized;
