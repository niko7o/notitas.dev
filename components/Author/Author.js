import { sendEvent } from '../../utils/google-analytics';

import styles from './Author.module.scss'

const Author = () => {
  const handleAuthorClick = () => {
    sendEvent({ category: 'Author', label: 'Nikoto', value: 'Click'})
  }

  return (
    <p className={styles.author}>
      made with ☕ by{' '}
      <a
        href="https://nikoto.dev"
        target="_blank"
        rel="noreferrer"
        className={styles['author-name']}
        onClick={handleAuthorClick}
      >
        nikoto
      </a>
    </p>
  )
}

export default Author;