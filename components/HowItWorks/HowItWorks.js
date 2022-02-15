
import styles from './HowItWorks.module.scss';

const HowItWorks = ({ isCloseButtonShown }) => (
  <>
  <div className={styles['how-it-works']}>
    <p>
      Este proyecto hobby sale de la necesidad de escribir pequeñas <strong>notitas </strong>
      (apuntes, comentarios, puntos de entrevista etc) y no querer abrir aplicaciones
      cómo Notion o similares por optimizar tiempo y recursos. <br />
    </p>

    <p>
      Por tu <strong>privacidad</strong> y la del resto de usuarios, las notas NO se almacenan en ninguna parte más que tu propio navegador
      (google chrome, safari, etc) usando el <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage" target="_blank">local storage</a> de estos últimos.
    </p>

    <p>
      <strong>Disclaimer</strong>: si cambias de dispositivo o limpias las cookies de tu navegador, perderás
      todas las notitas que tengas almacenadas hasta el momento. Por favor, ten esto en
      cuenta para no tener sorpresas!
    </p>

    <p>
      Puedes ver el código fuente de la <a href="https://github.com/nikotomad/notitas.dev/blob/master/components/TodoList/TodoList.js#L63" target="_blank">
      función añadir aquí</a> o el proyecto entero aquí: <a href="https://github.com/nikotomad/notitas.dev" target="_blank">https://github.com/nikotomad/notitas.dev</a>
    </p>
  </div>
  {isCloseButtonShown && <span className={styles.close}>x</span>}
  </>
);

export default HowItWorks;