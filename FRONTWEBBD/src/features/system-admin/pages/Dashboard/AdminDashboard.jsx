import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <nav>
            <ul>
                <li key="aeropuertos">
                    <Link to="/system-admin/Aeropuertos">Aeropuertos</Link>
                </li>
                <li key="aerolineas">
                    <Link to="/system-admin/Aerolineas">Aerolíneas</Link>
                </li>
                <li key="contratos">
                    <Link to="/system-admin/Contratos">Contratos</Link>
                </li>
                <li key="modelos-avion">
                    <Link to="/system-admin/ModelosAvion">Modelos de Avión</Link>
                </li>
                <li key="pistas">
                    <Link to="/system-admin/Pistas">Pistas</Link>
                </li>
                <li key="usuarios">
                    <Link to="/system-admin/Usuarios">Usuarios</Link>
                </li>
            </ul>
        </nav>
    );
};

export default AdminDashboard;
