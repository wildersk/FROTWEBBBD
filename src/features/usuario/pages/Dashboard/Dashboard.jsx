import React from "react";

const Dashboard = () => {
  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <ul style={styles.menu}>
          <li style={styles.menuItem}>
            <a href="/VuelosProgramados" style={styles.link}>
              Vuelos Programados
            </a>
          </li>
          <li style={styles.menuItem}>
            <a href="#comprar" style={styles.link}>
              Comprar Boleto
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    backgroundColor: "#f4f4f4",
    height: "100vh",
  },
  nav: {
    backgroundColor: "#007BFF",
    padding: "10px",
    borderRadius: "5px",
  },
  menu: {
    listStyle: "none",
    display: "flex",
    justifyContent: "space-around",
    margin: 0,
    padding: 0,
  },
  menuItem: {
    margin: "0 10px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Dashboard;
