import styles from './Author.module.scss'

import { useLocale } from '../../context/Locale'

const Author = () => {
  const { t } = useLocale()

  return (
    <p className={styles.author}>
      {t.author}{' '}
      <a
        href="https://github.com/niko7o"
        target="_blank"
        rel="noreferrer"
        className={styles['author-name']}
      >
        nikoto
      </a>
    </p>
  )
}

export default Author;
