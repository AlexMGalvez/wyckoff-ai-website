import React from "react";
import Link from "next/link";
import Image from 'next/image'
import ThemeChanger from "../UI/themeChanger/ThemeChanger";
import { useTheme } from 'next-themes'

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

import classes from "./MainHeader.module.css";

const MainHeader = () => {
  const { theme, setTheme } = useTheme();
  return (
    <header className={classes.header}>
      {/* <div className={classes.dropdown}>
        <button className={classes.dropbtn}>
          Guides <FontAwesomeIcon icon={faAngleDown} />
        </button>
        <div className={classes.dropdown_content}>
          <Link to="/computing-support-and-resistance-lines-in-javascript">Computing Support and Resistance Lines in Javascript</Link>
        </div>
      </div> */}

      <Link href="/">
        <div className={classes["logo-container"]}>
          {/* {theme == "light" ? <Image src="/logo-text-light.png" alt="logo" layout="fill" objectFit="contain" className={classes.logo} /> : <Image src="/logo-text-dark.png" alt="logo" layout="fill" objectFit="contain" className={classes.logo} />} */}
          <Image src="/logo-text-dark.png" alt="logo" layout="fill" objectFit="contain" className={classes.logo} />
        </div>
      </Link>

      <ThemeChanger />
      {/* <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink className={(navData) => navData.isActive ? classes.active : '' } to='/donate'>
             Donate
            </NavLink>
          </li>
        </ul>
      </nav> */}
    </header>
  );
};

export default MainHeader;
