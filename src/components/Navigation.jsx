import { useNavigate } from "react-router-dom";
import styles from "./Navigation.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authSlice";
import { useRef } from "react";
import { useEffect } from "react";
import 'animate.css';
import up from "../assets/up.png";


const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth.isAuthenticated);
  const headerRef = useRef();
  const moveToTopBtn = useRef();

  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate('/');
  }

  useEffect(() => {
    if (authState) {
      const observer = new IntersectionObserver((entries => {
        if (!entries[0].isIntersecting) {
          moveToTopBtn.current.style.animation = "fadeInDown";
          moveToTopBtn.current.style.animationDuration = '1s';
          moveToTopBtn.current.style.opacity = 1;
        } else {
          moveToTopBtn.current.style.opacity = 0;
          moveToTopBtn.current.style.animation = "fadeOutUp";
          moveToTopBtn.current.style.animationDuration = '1s';
        }
      }),
        {
          root: null,
          threshold: 0,
        });

      observer.observe(headerRef.current);
    }
  }, [authState]);

  const moveTopClickHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return <header className={styles.header} ref={headerRef}>
    <nav className={styles.navBar}>
      <h1>Punk</h1>
      {authState ? <button type="click" onClick={logoutHandler}>Logout</button> : null}
    </nav>
    {authState &&
      <img src={up} alt="" onClick={moveTopClickHandler} ref={moveToTopBtn} className={styles.navigateTop} />
    }
  </header>
};

export default Navigation;