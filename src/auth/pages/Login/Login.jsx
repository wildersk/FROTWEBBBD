import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useContext(AuthContext); // Asegúrate de exponer setUser en tu contexto
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Por favor ingrese usuario y contraseña");
      return;
    }

    try {
      // ENVÍA LOS CAMPOS CORRECTOS
      const res = await authService.login({
        correo: username,
        contrasena: password,
      });

      if (res.success) {
        const userData = {
          correo: username,
          contrasena: password,
        };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/user/dashboard");
      } else {
        setError(res.message || "Credenciales incorrectas");
      }
    } catch (err) {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Iniciar Sesión</h1>
        {error && <div className={styles.errorMessage}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="username">
              Usuario:
            </label>
            <input
              id="username"
              type="text"
              className={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="password">
              Contraseña:
            </label>
            <input
              id="password"
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.button}>
            Ingresar
          </button>
        </form>
        <p className={styles.registerPrompt}>
          ¿Eres nuevo?{" "}
          <button
            className={styles.registerButton}
            onClick={() => navigate("/register")}
          >
            Regístrate
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
