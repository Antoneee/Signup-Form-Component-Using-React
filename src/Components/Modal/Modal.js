import styles from "./Modal.module.css";

const Modal = (props) => {
  const exitModalHandler = (event) => {
    props.onExitModal(false);
  };

  return (
    <div className={styles["modal-backdrop"]} onClick={exitModalHandler}>
      <div className={styles["modal-menu"]}>
        <h2 className={styles["modal-menu__header"]}>Free trial claimed!</h2>
        <p className={styles["modal-menu__text"]}>
          {`Thank you ${props.onFirstName} for trying out our coding program!
          Happy coding!`}
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`${styles["modal-menu__icon"]} h-6 w-6`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`${styles["modal-menu__exit-icon"]} h-6 w-6`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          onClick={exitModalHandler}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
    </div>
  );
};

export default Modal;
