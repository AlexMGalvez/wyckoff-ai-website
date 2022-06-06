import classes from "./Layout.module.css";
import MainHeader from "../mainHeader/MainHeader";

// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; /* eslint-disable import/first */

const Layout = (props) => {
  return (
    <>
        <MainHeader />
        <main className={classes.main}>{props.children}</main>
    </>
  );
};

export default Layout;
