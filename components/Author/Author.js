import styles from './Author.module.scss'

const Author = () => {
  return (
    <p className={styles.author}>
      made with ☕ by{' '}
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