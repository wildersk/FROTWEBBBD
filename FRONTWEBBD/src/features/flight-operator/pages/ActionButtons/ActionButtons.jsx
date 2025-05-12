import React from "react";
import { Link } from "react-router-dom";
import styles from "./flight-operador/ActionButtons/ActionButtons.module.css"; // Archivo CSS Modules
import { useLocation } from "react-router-dom";

const ACTIONS_CONFIG = [
  {
    id: "create-flight-plan",
    label: "Crear plan de vuelo",
    path: "/flight-plans/create",
  },
  {
    id: "edit-flight-plan",
    label: "Editar plan de vuelo",
    path: "/flight-plans/edit",
  },
  {
    id: "delete-flight-plan",
    label: "Borrar plan de vuelo",
    path: "/flight-plans/delete",
  },
  {
    id: "flight-status",
    label: "Estado de vuelo",
    path: "/flights/status",
  },
  {
    id: "add-plane",
    label: "Añadir avión",
    path: "/planes/add",
  },
  {
    id: "remove-plane",
    label: "Eliminar avión",
    path: "/planes/remove",
  },
  {
    id: "license-status",
    label: "Estado de Licencia",
    path: "/licenses/status",
  },
];

const ActionButtons = () => {
  const location = useLocation();

  return (
    <nav className={styles.navContainer}>
      <ul className={styles.navList}>
        {ACTIONS_CONFIG.map((action) => (
          <li key={action.id} className={styles.navItem}>
            <Link
              to={action.path}
              className={`${styles.navLink} ${
                location.pathname === action.path ? styles.active : ""
              }`}
            >
              {action.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ActionButtons;
