import { Link } from 'react-router-dom';

const links = [
    { to: "/system-admin/Aeropuertos", label: "Aeropuertos" },
    { to: "/system-admin/Aerolineas", label: "Aerolíneas" },
    { to: "/system-admin/Contratos", label: "Contratos" },
    { to: "/system-admin/ModelosAvion", label: "Modelos de Avión" },
    { to: "/system-admin/Pistas", label: "Pistas" },
    { to: "/system-admin/Usuarios", label: "Usuarios" },
];

const AdminDashboard = () => (
    <nav>
        <ul>
            {links.map(link => (
                <li key={link.to}>
                    <Link to={link.to}>{link.label}</Link>
                </li>
            ))}
        </ul>
    </nav>
);

export default AdminDashboard;
