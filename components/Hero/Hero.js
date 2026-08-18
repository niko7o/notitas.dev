import { AnimatePresence } from "framer-motion";
import Link from "next/link";

import TodoList from "../TodoList";
import Modal from "../Modal";
import HowItWorks from "../HowItWorks";

import styles from "./Hero.module.scss";

import { useModalHandle } from "../../utils/hooks";

const Hero = () => {
  const { isModalOpen, openModal, closeModal } = useModalHandle();

  return (
    <div className={styles.hero}>
      <header className={styles.topbar}>
        <Link href="/">
          <a className={styles.brand} aria-label="notitas.dev, inicio">
            <span aria-hidden="true">n.</span>
            <strong>notitas.dev</strong>
          </a>
        </Link>
        <div className={styles["topbar-actions"]}>
          <span className={styles.privacy}><i aria-hidden="true" /> privado · local · tuyo</span>
          <button type="button" onClick={openModal}>Cómo funciona</button>
        </div>
      </header>

      <TodoList />

      <AnimatePresence>
        {isModalOpen ? (
          <Modal key="animatedModal" closeModal={closeModal} isCloseButtonShown>
            <HowItWorks />
          </Modal>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default Hero;
