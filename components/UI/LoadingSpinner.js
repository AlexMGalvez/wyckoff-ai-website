import classes from "./LoadingSpinner.module.css";

export default function LoadingSpinner() {
  return (
    <div className={classes["spinner-container"]}>
      <div className={classes.spinner}></div>
    </div>
  );
}