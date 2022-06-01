import classes from "./Layout.module.css";
import MainHeader from "../mainHeader/MainHeader";

const Layout = (props) => {
  return (
    <>
        <MainHeader />
        <main className={classes.main}>{props.children}</main>
    </>
  );
};

export default Layout;
