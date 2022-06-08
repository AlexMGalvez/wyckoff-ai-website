import { useTheme } from 'next-themes'
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Image from 'next/image'

import classes from "./index.module.css";

export default function Home() {
  const { theme, setTheme } = useTheme();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={classes["logo-container"]}>
          <Image src={theme == "light" ? "/images/logo-large-light-min.png" : "/images/logo-large-dark-min.png"} alt="logo" layout="fill" objectFit="contain" className={classes.logo} />
        </div>
        <h3> providing institution-grade trading software free for the public </h3>
        <Link href="/tools">
          <a>Navigate to Trading Tools -&gt;</a>
        </Link>
      </main>
      <footer className={styles.footer}>

      </footer>
    </div>
  );
}
