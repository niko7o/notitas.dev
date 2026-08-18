
import styles from './HowItWorks.module.scss';

import { useLocale } from '../../context/Locale';

const HowItWorks = ({ isCloseButtonShown }) => {
  const { locale } = useLocale();

  return (
    <>
      <div className={styles['how-it-works']}>
        {locale === 'es' ? (
          <>
            <p>
              Este proyecto personal nace de la necesidad de escribir pequeñas <strong>notitas</strong> (apuntes, comentarios o puntos de entrevista) sin abrir aplicaciones más pesadas como Notion.
            </p>
            <p>
              Por tu <strong>privacidad</strong>, las notas solo se almacenan en tu navegador mediante <a href="https://developer.mozilla.org/es/docs/Web/API/Window/localStorage" target="_blank" rel="noreferrer">localStorage</a>.
            </p>
            <p>
              <strong>Importante:</strong> si cambias de dispositivo o limpias los datos de tu navegador, perderás las notas almacenadas.
            </p>
            <p>
              Puedes consultar <a href="https://github.com/niko7o/notitas.dev/blob/master/components/TodoList/TodoList.js#L63" target="_blank" rel="noreferrer">la función para añadir notas</a> o ver <a href="https://github.com/niko7o/notitas.dev" target="_blank" rel="noreferrer">el proyecto completo en GitHub</a>.
            </p>
          </>
        ) : (
          <>
            <p>
              This personal project came from the need to capture small <strong>notes</strong>—comments, reminders, or interview points—without opening a heavier app such as Notion.
            </p>
            <p>
              For your <strong>privacy</strong>, notes are only stored in your browser using <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage" target="_blank" rel="noreferrer">localStorage</a>.
            </p>
            <p>
              <strong>Important:</strong> if you change devices or clear your browser data, you will lose your stored notes.
            </p>
            <p>
              You can inspect <a href="https://github.com/niko7o/notitas.dev/blob/master/components/TodoList/TodoList.js#L63" target="_blank" rel="noreferrer">the add-note function</a> or view <a href="https://github.com/niko7o/notitas.dev" target="_blank" rel="noreferrer">the complete project on GitHub</a>.
            </p>
          </>
        )}
      </div>
      {isCloseButtonShown && <span className={styles.close}>x</span>}
    </>
  );
};

export default HowItWorks;
