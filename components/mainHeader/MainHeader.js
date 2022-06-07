import React from "react";
import Link from "next/link";
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
        {/* {process.env.PUBLIC_URL ? <img src={process.env.PUBLIC_URL + "/logo-text.png"} alt="logo" className={classes.logo} /> : <img src={".//logo-text.png"} alt="logo" className={classes.logo} />} */}

        {/* { theme == "light" ? <img src={".//logo-text-light.png"} alt="logo" className={classes.logo} /> : <img src={".//logo-text-dark.png"} alt="logo" className={classes.logo} />} */}
        <img src={".//logo-text-dark.png"} alt="logo" className={classes.logo} />
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
