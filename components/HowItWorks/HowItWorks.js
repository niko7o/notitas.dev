import styles from "./HowItWorks.module.scss";
import { useLocale } from "../../context/Locale";

const HowItWorks = () => {
  const { t } = useLocale();

  return (
    <div className={styles["how-it-works"]}>
      <span className={styles.eyebrow}>{t.info.eyebrow}</span>
      <h2>{t.info.title}</h2>
      <p>{t.info.intro}</p>

      <div className={styles.grid}>
        <article>
          <span>01</span>
          <h3>{t.info.writeTitle}</h3>
          <p>{t.info.writeBeforeShortcut} <kbd>⌘ Enter</kbd> {t.info.writeAfterShortcut}</p>
        </article>
        <article>
          <span>02</span>
          <h3>{t.info.findTitle}</h3>
          <p>{t.info.findDescription}</p>
        </article>
      </div>

      <aside>
        <strong>{t.info.privacyTitle}</strong>
        <p>{t.info.privacyDescription}</p>
      </aside>

      <a href="https://github.com/niko7o/notitas.dev" target="_blank" rel="noreferrer">
        {t.info.github} <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
};

export default HowItWorks;
