import { AnimatePresence } from "framer-motion";
import Link from "next/link";

import TodoList from "../TodoList";
import Modal from "../Modal";
import HowItWorks from "../HowItWorks";
import LanguageSwitcher from "../LanguageSwitcher";

import styles from "./Hero.module.scss";

import { useModalHandle } from "../../utils/hooks";
import { useLocale } from "../../context/Locale";

const Hero = () => {
  const { isModalOpen, openModal, closeModal } = useModalHandle();
  const { t } = useLocale();

  return (
    <div className={styles.hero}>
      <header className={styles.topbar}>
        <Link href="/">
          <a className={styles.brand} aria-label={t.header.homeLabel}>
            <span aria-hidden="true">n.</span>
            <strong>notitas.dev</strong>
          </a>
        </Link>
        <div className={styles["topbar-actions"]}>
          <span className={styles.privacy}><i aria-hidden="true" /> {t.header.privacy}</span>
          <LanguageSwitcher />
          <button className={styles["info-button"]} type="button" onClick={openModal}>
            {t.header.howItWorks}
          </button>
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
