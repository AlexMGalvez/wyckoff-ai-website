import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Image from 'next/image'
import { useTheme } from 'next-themes'

import classes from "./index.module.css";

export default function Home() {
  const { theme, setTheme } = useTheme();

  return (
    <div className={styles.container}>
      <Head>
        <title>A Wyckoff.ai</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={classes["logo-container"]}>
          {theme == "light" ? <Image src="/logo-large-light.png" alt="logo" layout="fill" objectFit="contain" className={classes.logo} /> : <Image src="/logo-large-dark.png" alt="logo" layout="fill" objectFit="contain" className={classes.logo} />}
        </div>
        <h3> Providing Institution-Grade Trading Software Free for the Public </h3>
        <Link href="/tools">
          <a>Navigate to Trading Tools -&gt;</a>
        </Link>
      </main>

      <footer className={styles.footer}>

      </footer>
    </div>
  );
}
