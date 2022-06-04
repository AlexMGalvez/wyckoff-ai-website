import classes from './AttButton.module.css';

const AttButton = props => {
  return (
    <button type={props.type} className={classes.button} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default AttButton;