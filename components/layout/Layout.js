import { Fragment } from "react";

import classes from "./Layout.module.css";
import MainHeader from "../mainHeader/MainHeader";

const Layout = (props) => {
  return (
    <Fragment>
        <MainHeader />
        <main className={classes.main}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
