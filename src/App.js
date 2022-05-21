import styles from "./App.module.css";
import IntroSignUp from "./Components/SignUpForm/IntroSignUp";
import { useState } from "react";
import Modal from "./Components/Modal/Modal";

function App() {
  const [successPageState, setSuccessPageState] = useState(false);
  const [firstNameState, setFirstNameState] = useState("");

  const sumbitFormSuccess = (formIsValid, firstName) => {
    setSuccessPageState(formIsValid);
    setFirstNameState(firstName);
  };

  const exitModal = (exit) => {
    setSuccessPageState(exit);
  };

  return (
    <>
      <IntroSignUp onSumbitFormSuccess={sumbitFormSuccess}></IntroSignUp>
      {successPageState ? (
        <Modal onFirstName={firstNameState} onExitModal={exitModal}></Modal>
      ) : (
        ""
      )}
    </>
  );
}

export default App;
