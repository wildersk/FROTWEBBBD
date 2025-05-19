import { useEffect, useState, useContext } from "react";
import axios from "axios";
import styles from "./vuelosProgramados.module.css";
import { AuthContext } from "../../../../auth/context/AuthContext";

const VuelosProgramados = () => {
  const [vuelos, setVuelos] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchVuelos = async () => {
      try {
        const res = await axios.get("http://localhost:3000/vuelos");
        setVuelos(res.data);
      } catch (error) {
        console.error("Error al obtener vuelos:", error);
      }
    };
    fetchVuelos();
  }, []);

  const handleComprar = async (vueloId) => {
    if (!user) {
      alert("Debes iniciar sesión para comprar.");
      return;
    }
    const compra = {
      correo: user.correo,
      contrasena: user.contrasena,
      vuelo_id: vueloId,
      fecha_compra: new Date().toISOString().split("T")[0],
    };
    try {
      const res = await axios.post("http://localhost:3000/comprar", compra);
      // Muestra el mensaje y el boleto_id
      alert(`${res.data.message}\nN° de boleto: ${res.data.boleto_id}`);
    } catch (error) {
      alert("Error al comprar boleto");
    }
  };

  return (
    <div className={styles.container}>
      <h2 style={{ marginTop: 30 }}>Lista de Vuelos Programados</h2>
      <table
        style={{
          width: "100%",
          marginTop: 20,
          background: "#fff",
          borderRadius: 8,
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo</th>
            <th>Número</th>
            <th>Aeropuerto Salida</th>
            <th>Fecha Salida</th>
            <th>Hora Salida</th>
            <th>Aeropuerto Llegada</th>
            <th>Fecha Llegada</th>
            <th>Hora Llegada</th>
            <th>Avion Asignado</th>
            <th>Comprar voleto</th>
          </tr>
        </thead>
        <tbody>
          {vuelos.map((vuelo, idx) => (
            <tr key={idx}>
              <td>{vuelo[0]}</td>
              <td>{vuelo[1]}</td>
              <td>{vuelo[2]}</td>
              <td>{vuelo[3]}</td>
              <td>{vuelo[4]?.split("T")[0]}</td>
              <td>{vuelo[4]?.split("T")[1]?.slice(0, 5)}</td>
              <td>{vuelo[6]}</td>
              <td>{vuelo[7]?.split("T")[0]}</td>
              <td>{vuelo[7]?.split("T")[1]?.slice(0, 5)}</td>
              <td>{vuelo[6]}</td>
              <td>
                <button
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#007BFF",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleComprar(vuelo[0])}
                >
                  comprar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VuelosProgramados;
