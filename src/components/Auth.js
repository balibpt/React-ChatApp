import React from "react";
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";

import Cookies from "universal-cookie";

const cookie = new Cookies();

function Auth(props) {
  const { setIsAuth } = props;

  const googleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookie.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Sign In with Google to Continue</h1>
      <button onClick={googleSignIn}>Sign In with Google</button>
    </div>
  );
}

export default Auth;
