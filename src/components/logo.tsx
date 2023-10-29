import Link from "next/link";
import styles from "styles/navigation.module.scss";

function Logo() {
  return (
    <>
      <Link href="/" className={styles.logo}>Nummi</Link>
    </>
  )
}

export default Logo;