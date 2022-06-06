import classes from './Card2.module.css';

const Card2 = props => {
  return (
    <div className={classes.card}>
      {props.children}
    </div>
  )
};

export default Card2;