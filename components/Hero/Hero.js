import Image from "next/image";

import { AnimatePresence } from "framer-motion";

import Author from "../Author";
import TodoList from "../TodoList";
import Modal from "../Modal";
import HowItWorks from "../HowItWorks";

import styles from "./Hero.module.scss";

import { LOCAL_STORAGE_KEY } from "../../utils/constants";
import { useState } from "react";

const Hero = () => {
  const [modalOpened, setmodalOpened] = useState(false);
  const havingTodos =
    (typeof window !== "undefined" &&
      localStorage.getItem(LOCAL_STORAGE_KEY)) ||
    [];

  return (
    <div className={styles.hero}>
      <div className={styles["hero-left"]}>
        {havingTodos && <TodoList items={havingTodos} />}
      </div>

      <div className={styles["hero-right"]}>
        <h1>Tu bloc de notitas, más rápido que nadie 🚀</h1>
        <div className={styles["hero-image"]}>
          <Image
            src="/notes2.svg"
            width={600}
            height={400}
            quality={100}
            priority
          />
        </div>
      </div>

      <Author />

      <a className={styles["hiw-cta"]} onClick={() => setmodalOpened(true)}>
        Cómo funciona
      </a>

      <AnimatePresence>
        {modalOpened && (
          <Modal key="animatedModal" closeModal={() => setmodalOpened(false)}>
            <HowItWorks />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hero;
