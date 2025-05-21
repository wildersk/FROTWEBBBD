// src/components/AdminDashboard.jsx
import { Link, useLocation } from 'react-router-dom';
import './AdminDashboard.css'; // Importamos estilos CSS

const links = [
  { to: "/appUsu/CompraTicket", label: "CompraTicket" },


];

const DashboardappUsu = () => {
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

export default DashboardappUsu;