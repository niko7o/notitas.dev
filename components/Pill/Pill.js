import styles from './Pill.module.scss'

const Pill = ({ text }) => {
    return <div className={styles['pill']}>{text}</div>
}

export default Pill;