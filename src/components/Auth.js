import React from "react";
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import landingPageBg from "../assets/landingPageBg.png";
import landingPageImg from "../assets/landingPageImg.png";

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
    <>
      <h1 className="font-bold text-4xl text-center pt-4">
        Welcome to My ChatApp
      </h1>
      <div
        class="min-h-screen bg-cover bg-no-repeat bg-center bg-fixed"
        style={{ backgroundImage: `url(${landingPageBg})` }}
      >
        <div class="flex flex-col justify-center min-h-screen xl:flex-row xl:justify-center">
          <div class="flex items-center justify-center xl:w-1/2">
            <img
              class="mx-auto w-80 xl:w-auto xl:-mt-20 self-end"
              src={landingPageImg}
              alt=""
            />
          </div>
          <div class="flex flex-col justify-center w-full p-8 xl:w-1/2 xl:p-10">
            <div className="border pt-20 pb-20 px-4 rounded-xl shadow-md">
              <h5 class="text-center mb-3 text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                Sign In with your Google Account to continue
              </h5>
              <p class="text-center text-sm font-normal text-gray-500 dark:text-gray-400">
                Connect to Google
              </p>
              <ul class="my-4 space-y-3">
                <li>
                  <button
                    class="w-full flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                    onClick={googleSignIn}
                  >
                    <div class="flex items-center flex-1">
                      <svg viewBox="0 0 128 128" class="h-4">
                        <path
                          fill="#fff"
                          d="M44.59 4.21a63.28 63.28 0 004.33 120.9 67.6 67.6 0 0032.36.35 57.13 57.13 0 0025.9-13.46 57.44 57.44 0 0016-26.26 74.33 74.33 0 001.61-33.58H65.27v24.69h34.47a29.72 29.72 0 01-12.66 19.52 36.16 36.16 0 01-13.93 5.5 41.29 41.29 0 01-15.1 0A37.16 37.16 0 0144 95.74a39.3 39.3 0 01-14.5-19.42 38.31 38.31 0 010-24.63 39.25 39.25 0 019.18-14.91A37.17 37.17 0 0176.13 27a34.28 34.28 0 0113.64 8q5.83-5.8 11.64-11.63c2-2.09 4.18-4.08 6.15-6.22A61.22 61.22 0 0087.2 4.59a64 64 0 00-42.61-.38z"
                        ></path>
                        <path
                          fill="#e33629"
                          d="M44.59 4.21a64 64 0 0142.61.37 61.22 61.22 0 0120.35 12.62c-2 2.14-4.11 4.14-6.15 6.22Q95.58 29.23 89.77 35a34.28 34.28 0 00-13.64-8 37.17 37.17 0 00-37.46 9.74 39.25 39.25 0 00-9.18 14.91L8.76 35.6A63.53 63.53 0 0144.59 4.21z"
                        ></path>
                        <path
                          fill="#f8bd00"
                          d="M3.26 51.5a62.93 62.93 0 015.5-15.9l20.73 16.09a38.31 38.31 0 000 24.63q-10.36 8-20.73 16.08a63.33 63.33 0 01-5.5-40.9z"
                        ></path>
                        <path
                          fill="#587dbd"
                          d="M65.27 52.15h59.52a74.33 74.33 0 01-1.61 33.58 57.44 57.44 0 01-16 26.26c-6.69-5.22-13.41-10.4-20.1-15.62a29.72 29.72 0 0012.66-19.54H65.27c-.01-8.22 0-16.45 0-24.68z"
                        ></path>
                        <path
                          fill="#319f43"
                          d="M8.75 92.4q10.37-8 20.73-16.08A39.3 39.3 0 0044 95.74a37.16 37.16 0 0014.08 6.08 41.29 41.29 0 0015.1 0 36.16 36.16 0 0013.93-5.5c6.69 5.22 13.41 10.4 20.1 15.62a57.13 57.13 0 01-25.9 13.47 67.6 67.6 0 01-32.36-.35 63 63 0 01-23-11.59A63.73 63.73 0 018.75 92.4z"
                        ></path>
                      </svg>
                      <span class="ml-3 whitespace-nowrap">Google</span>
                    </div>
                    <span class="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">
                      Connect
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Auth;
