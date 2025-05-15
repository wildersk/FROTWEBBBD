import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/system-admin/Aeropuertos">Aeropuertos</Link>
                </li>
                <li>
                    <Link to="/system-admin/Aerolineas">Aerolíneas</Link>
                </li>
                <li>
                    <Link to="/system-admin/Contratos">Contratos</Link>
                </li>
                <li>
                    <Link to="/system-admin/ModelosAvion">Modelos de Avión</Link>
                </li>
                <li>
                    <Link to="/system-admin/Pistas">Pistas</Link>
                </li>
                <li>
                    <Link to="/system-admin/Usuarios">Usuarios</Link>
                </li>
            </ul>
        </nav>
    );
};

export default AdminDashboard;

