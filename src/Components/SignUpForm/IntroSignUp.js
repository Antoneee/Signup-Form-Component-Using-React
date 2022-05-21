import Form from "./Form";
import styles from "./IntroSignUp.module.css";

const IntroSignUp = (props) => {
  const formSubmittedHandler = (formIsValid, firstName) => {
    if (formIsValid) {
      props.onSumbitFormSuccess(formIsValid, firstName);
    }
  };

  return (
    <div className={styles["form-body"]}>
      <div className={styles["form-body__header"]}>
        <h1>Learn to code by watching others</h1>
        <p className={styles["form-body__text"]}>
          See how experienced developers solve problems in real-time. Watching
          scripted tutorials is great, but understanding how developers think is
          invaluable.
        </p>
      </div>
      <Form onSubmitForm={formSubmittedHandler}></Form>
    </div>
  );
};

export default IntroSignUp;
