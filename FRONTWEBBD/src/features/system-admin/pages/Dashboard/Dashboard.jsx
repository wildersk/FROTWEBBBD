import React from "react";

const menuOptions = [
  { label: "Aerolinea", path: "/aerolinea" },
  { label: "Aeropuerto", path: "/aeropuerto" },
  { label: "Contratos", path: "/contratos" },
  { label: "Naves", path: "/naves" },
];

const Dashboard = () => {
  return (
    <nav style={{ padding: "2rem" }}>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {menuOptions.map((option) => (
          <li key={option.label} style={{ margin: "1rem 0" }}>
            <a
              href={option.path}
              style={{ textDecoration: "none", fontSize: "1.2rem" }}
            >
              {option.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Dashboard;
