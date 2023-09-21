import React, { useState, useEffect } from "react";

import SignInForm from "./signIn";
import SignUpForm from "./signUp";
import styles from "./style.module.css";
import { NextRouter, useRouter } from "next/router";

interface IProps {}

const AuthLayout = (props: IProps) => {
  const router: NextRouter = useRouter()
  const [isSignIn, setSignIn] = useState<boolean>(true);

  const toggleForm = () => {
    setSignIn(!isSignIn);
  };

  useEffect(() => {
    const accessTokenFromUrl = router.query?.access_token;
    if (accessTokenFromUrl) {
      window.localStorage.setItem("access_token", accessTokenFromUrl.toString());
      router.push('/user');
    }
  }, [router.isReady])
  return (
    <div className={styles.authLayout}>
      <div className={styles.inner}>
        {isSignIn ? (
          <SignInForm toggleForm={toggleForm} />
        ) : (
          <SignUpForm toggleForm={toggleForm} />
        )}
      </div>
    </div>
  );
};

export default AuthLayout;
