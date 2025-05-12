import styles from "./styles.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <p>
          © {new Date().getFullYear()} AerolineFront. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
