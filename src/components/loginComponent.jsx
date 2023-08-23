import styles from "./loginComponent.module.css";
import { authActions } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const loginHandler = (event) => {
    event.preventDefault();

    const mail = usernameRef.current.value;
    const password = passwordRef.current.value;
    dispatch(authActions.login({ mail, password }));

    navigate('/beers');

  };

  return <main className={styles.loginSection} onSubmit={loginHandler}>
    <form action="" className={styles.loginForm}>
      <input type="email" placeholder="Mail Id" ref={usernameRef} required />
      <input type="password" placeholder="Password" ref={passwordRef} />
      <button type="submit">Login</button>
    </form>
  </main>
}

export default LoginForm;