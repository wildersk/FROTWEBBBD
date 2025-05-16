import React, { useState } from "react";

const menuItems = [
  { label: "Ver vuelos aprobados" },
  { label: "Registrar tiempos de salida" },
  { label: "Registrar tiempos de llegada" },
  { label: "Actualizar estados de vuelo" },
  {
    label: "Activar Protocolos",
    subMenu: [
      { label: "Desvíos" },
      { label: "Reprogramaciones de vuelo" },
      { label: "Cambio de pista" },
    ],
  },
];

const styles = {
  menu: {
    width: "280px",
    background: "#f5f7fa",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    padding: "20px",
    fontFamily: "Segoe UI, Arial, sans-serif",
  },
  menuItem: {
    padding: "12px 16px",
    margin: "6px 0",
    borderRadius: "5px",
    cursor: "pointer",
    color: "#222",
    background: "none",
    border: "none",
    textAlign: "left",
    fontSize: "16px",
    transition: "background 0.2s",
  },
  menuItemHover: {
    background: "#e3e8ee",
  },
  subMenu: {
    marginLeft: "18px",
    marginTop: "4px",
    borderLeft: "2px solid #d1d5db",
    paddingLeft: "10px",
  },
};

function MenuItem({ item }) {
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);

  const hasSubMenu = !!item.subMenu;

  return (
    <div>
      <button
        style={{
          ...styles.menuItem,
          ...(hover ? styles.menuItemHover : {}),
          fontWeight: hasSubMenu ? "bold" : "normal",
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => hasSubMenu && setOpen((o) => !o)}
        type="button"
      >
        {item.label}
        {hasSubMenu && (
          <span style={{ float: "right" }}>{open ? "▲" : "▼"}</span>
        )}
      </button>
      {hasSubMenu && open && (
        <div style={styles.subMenu}>
          {item.subMenu.map((sub, idx) => (
            <div
              key={idx}
              style={{
                ...styles.menuItem,
                fontSize: "15px",
                padding: "10px 12px",
              }}
            >
              {sub.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Dashboard() {
  return (
    <nav style={styles.menu}>
      {menuItems.map((item, idx) => (
        <MenuItem key={idx} item={item} />
      ))}
    </nav>
  );
}
