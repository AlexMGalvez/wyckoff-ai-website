//import Card from "./Card";
import LoadingSpinner from "./LoadingSpinner";
import classes from "./LoadingModal.module.css";

const Backdrop = () => {
  return <div className={classes.backdrop} />;
};

const ModalOverlay = () => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}><h2>Model Loading</h2> <p>Keep this page open in your browser. This may take a few minutes.</p></div>
      {<LoadingSpinner />}
    </div>
  );
};

const LoadingModal = () => {
  return (
    <>
      {<Backdrop />}
      {<ModalOverlay />}
    </>
  );
};

export default LoadingModal;