import { motion } from 'framer-motion';

import { useLocale } from '../../context/Locale';

import styles from './LanguageSwitcher.module.scss';

const languages = ['en', 'es'];

const LanguageSwitcher = () => {
  const { locale, setLocale, t } = useLocale();

  return (
    <div className={styles.switcher} role="group" aria-label={t.language.label}>
      {languages.map((language) => {
        const isActive = locale === language;
        const ariaLabel = language === 'en'
          ? t.language.switchToEnglish
          : t.language.switchToSpanish;

        return (
          <button
            className={`${styles.option} ${isActive ? styles.active : ''}`}
            type="button"
            key={language}
            aria-label={ariaLabel}
            aria-pressed={isActive}
            onClick={() => setLocale(language)}
          >
            {isActive && (
              <motion.span
                className={styles.indicator}
                layoutId="active-language"
                transition={{ type: 'spring', stiffness: 420, damping: 32 }}
              />
            )}
            <span className={styles.label}>{language.toUpperCase()}</span>
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;

