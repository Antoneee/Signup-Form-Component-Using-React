import styles from "./Form.module.css";
import Card from "../../UI/Card";
import Button from "../../UI/Button";
import { useEffect, useReducer, useState } from "react";

const firstNameReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.payload, isValid: action.payload.trim().length > 0 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 0 };
  }
  return { value: "", isValid: null };
};

const lastNameReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.payload, isValid: action.payload.trim().length > 0 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 0 };
  }
  return { value: "", isValid: null };
};

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.payload,
      isValid: action.payload.includes("@") && action.payload.includes(".com"),
    };
  }
  if (action.type === "INPUT_BLUR") {
    return {
      value: state.value,
      isValid: state.value.includes("@") && state.value.includes(".com"),
    };
  }
  return { value: "", isValid: null };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.payload, isValid: action.payload.length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.length > 6 };
  }
  return { value: "", isValid: null };
};

const Form = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [firstNameState, firstNameDispatch] = useReducer(firstNameReducer, {
    value: "",
    isvalid: null,
  });
  const [lastNameState, lastNameDispatch] = useReducer(lastNameReducer, {
    value: "",
    isvalid: null,
  });
  const [emailState, emailDispatch] = useReducer(emailReducer, {
    value: "",
    isvalid: null,
  });
  const [passwordState, passwordDispatch] = useReducer(passwordReducer, {
    value: "",
    isvalid: null,
  });

  const { isValid: firstNameIsValid } = firstNameState;
  const { isValid: lastNameIsValid } = lastNameState;
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        firstNameIsValid && lastNameIsValid && emailIsValid && passwordIsValid
      );
    }, 500);
    return () => {
      clearTimeout(identifier);
    };
  }, [firstNameIsValid, lastNameIsValid, emailIsValid, passwordIsValid]);

  const firstNameChangeHandler = (event) => {
    firstNameDispatch({ type: "USER_INPUT", payload: event.target.value });
    setFormIsValid(
      firstNameState.value.trim().length > 0 &&
        lastNameState.isValid &&
        emailState.isValid &&
        passwordState.isValid
    );
  };

  const lastNameChangeHandler = (event) => {
    lastNameDispatch({ type: "USER_INPUT", payload: event.target.value });
    setFormIsValid(
      firstNameState.isValid &&
        lastNameState.value.trim().length > 0 &&
        emailState.isValid &&
        passwordState.isValid
    );
  };

  const emailChangeHandler = (event) => {
    emailDispatch({ type: "USER_INPUT", payload: event.target.value });
    setFormIsValid(
      firstNameState.isValid &&
        lastNameState.isValid &&
        emailState.value.includes("@") &&
        emailState.value.includes(".com") &&
        passwordState.isValid
    );
  };

  const passwordChangeHandler = (event) => {
    passwordDispatch({ type: "USER_INPUT", payload: event.target.value });
    setFormIsValid(
      firstNameState.isValid &&
        lastNameState.isValid &&
        emailState.isValid &&
        passwordState.value.length > 6
    );
  };

  const validateFirstNameHandler = (event) => {
    firstNameDispatch({ type: "INPUT_BLUR" });
  };

  const validateLastNameHandler = (event) => {
    lastNameDispatch({ type: "INPUT_BLUR" });
  };

  const validateEmailHandler = (event) => {
    emailDispatch({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = (event) => {
    passwordDispatch({ type: "INPUT_BLUR" });
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      props.onSubmitForm(formIsValid, firstNameState.value);
    }
    firstNameDispatch({ type: "INPUT_RESET" });
    lastNameDispatch({ type: "INPUT_RESET" });
    emailDispatch({ type: "INPUT_RESET" });
    passwordDispatch({ type: "INPUT_RESET" });
  };

  return (
    <div className={styles["form-section"]}>
      <Card className={styles["form-section__header"]}>
        <p>
          <strong>Try it free 7 days</strong> then $20/mo. thereafter
        </p>
      </Card>
      <Card className={styles["form-section__signup"]}>
        <form className={styles["signup-form"]} onSubmit={submitFormHandler}>
          <div>
            <input
              placeholder="First Name"
              className={`${styles["signup-form__input"]} ${
                firstNameState.isValid === false ? styles.invalid : ""
              }`}
              value={firstNameState.value}
              type="text"
              onChange={firstNameChangeHandler}
              onBlur={validateFirstNameHandler}
            ></input>
            {firstNameState.isValid === false ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${styles["invalid-icon"]} h-6 w-6`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <em className={styles["invalid-text"]}>
                  First Name cannot be Empty
                </em>
              </>
            ) : (
              ""
            )}
          </div>
          <div>
            <input
              placeholder="Last Name"
              className={`${styles["signup-form__input"]} ${
                lastNameState.isValid === false ? styles.invalid : ""
              }`}
              value={lastNameState.value}
              type="text"
              onChange={lastNameChangeHandler}
              onBlur={validateLastNameHandler}
            ></input>
            {lastNameState.isValid === false ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${styles["invalid-icon"]} h-6 w-6`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <em className={styles["invalid-text"]}>
                  Last Name cannot be Empty
                </em>
              </>
            ) : (
              ""
            )}
          </div>
          <div>
            <input
              placeholder="Email Address"
              className={`${styles["signup-form__input"]} ${
                emailState.isValid === false ? styles.invalid : ""
              }`}
              value={emailState.value}
              type="email"
              onChange={emailChangeHandler}
              onBlur={validateEmailHandler}
            ></input>
            {emailState.isValid === false ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${styles["invalid-icon"]} h-6 w-6`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <em className={styles["invalid-text"]}>
                  Looks like this is not an email
                </em>
              </>
            ) : (
              ""
            )}
          </div>
          <div>
            <input
              placeholder="Password"
              className={`${styles["signup-form__input"]} ${
                passwordState.isValid === false ? styles.invalid : ""
              }`}
              value={passwordState.value}
              type="password"
              onChange={passwordChangeHandler}
              onBlur={validatePasswordHandler}
            ></input>
            {passwordState.isValid === false ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${styles["invalid-icon"]} h-6 w-6`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <em className={styles["invalid-text"]}>
                  Password cannot be empty
                </em>
              </>
            ) : (
              ""
            )}
          </div>
          <Button className={formIsValid ? "" : "disabled"}>
            Claim your free trial
          </Button>
          <p className={styles["signup-form__agreement"]}>
            By clicking the button, you are agreeing to our&nbsp;
            <span className={styles["signup-form__tos"]}>
              Terms and Services
            </span>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default Form;
