import styles from "./Author.module.scss";

const Author = () => {
  return (
    <>
      <div className={styles.author}>
        made with ☕ by{" "}
        <a
          href="https://nikoto.dev"
          target="_blank"
          rel="noreferrer"
          className={styles["author-name"]}
        >
          nikoto
        </a>
        <p>
          Rebranded by{" "}
          <a
            href="https://polgubauamores.me"
            target="_blank"
            rel="noreferrer"
            className={styles["author-name"]}
          >
            Pol Gubau
          </a>
        </p>
      </div>
    </>
  );
};

export default Author;
