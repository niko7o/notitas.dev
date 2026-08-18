import styles from "./HowItWorks.module.scss";

const HowItWorks = () => (
  <div className={styles["how-it-works"]}>
    <span className={styles.eyebrow}>SIMPLE A PROPÓSITO</span>
    <h2>Tus ideas, sin ruido.</h2>
    <p>
      notitas.dev es un lugar rápido para apuntes, comentarios y pequeñas ideas sin abrir una herramienta más pesada.
    </p>

    <div className={styles.grid}>
      <article>
        <span>01</span>
        <h3>Escribe</h3>
        <p>Crea una nota y usa <kbd>⌘ Enter</kbd> para guardarla sin apartar las manos del teclado.</p>
      </article>
      <article>
        <span>02</span>
        <h3>Encuentra</h3>
        <p>Las notas largas se resumen en la lista. Busca, selecciona y edita el contenido completo a la derecha.</p>
      </article>
    </div>

    <aside>
      <strong>Privacidad local</strong>
      <p>Las notas viven únicamente en el almacenamiento de este navegador. Si cambias de dispositivo o borras sus datos, también se eliminarán tus notas.</p>
    </aside>

    <a href="https://github.com/niko7o/notitas.dev" target="_blank" rel="noreferrer">Ver el proyecto en GitHub <span aria-hidden="true">↗</span></a>
  </div>
);

export default HowItWorks;
