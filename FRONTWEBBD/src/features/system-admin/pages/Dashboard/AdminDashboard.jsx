// AdminDashboard.jsx
import { Link, useLocation } from 'react-router-dom';
import './AdminDashboard.css';

const links = [
  { to: "/system-admin/Aeropuertos", label: "Aeropuertos" },
  { to: "/system-admin/Aerolineas", label: "Aerolíneas" },
  { to: "/system-admin/Contratos", label: "Contratos" },
  { to: "/system-admin/ModelosAvion", label: "Modelos de Avión" },
  { to: "/system-admin/Pistas", label: "Pistas" },
  { to: "/system-admin/Usuarios", label: "Usuarios" },
];

const AdminDashboard = () => {
  const location = useLocation();

  return (
    <nav className="tabs">
      <ul className="tab-list">
        {links.map(link => {
          const isActive = location.pathname === link.to;
          return (
            <li key={link.to} className={`tab-item ${isActive ? "active" : ""}`}>
              <Link to={link.to}>{link.label}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default AdminDashboard;

