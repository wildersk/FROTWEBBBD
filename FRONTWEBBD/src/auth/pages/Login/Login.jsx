import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import styles from "./Login.module.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Por favor ingrese usuario y contraseña");
      return;
    }

    const success = login(username, password);
    if (!success) {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2>Iniciar Sesión</h2>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Usuario:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="operador o admin"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="123"
            />
          </div>

          <button type="submit" className={styles.loginButton}>
            Ingresar
          </button>
        </form>

        <div className={styles.demoCredentials}>
          <p>
            <strong>Usuario de prueba:</strong>
          </p>
          <p>
            Operador: usuario <strong>operador</strong> | contraseña{" "}
            <strong>123</strong>
          </p>
          <p>
            Admin: usuario <strong>admin</strong> | contraseña{" "}
            <strong>123</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
