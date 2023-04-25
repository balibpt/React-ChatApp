import React, { useState, useRef } from "react";
import "./App.css";
import Auth from "./components/Auth";

import { auth } from "./firebase-config";
import { signOut } from "firebase/auth";

import Cookies from "universal-cookie";
import Chat from "./components/Chat";
const cookie = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookie.get("auth-token"));
  const [room, setRoom] = useState(null);

  const roomRef = useRef(null);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      cookie.remove("auth-token");
      setIsAuth(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (!isAuth) {
    return (
      <React.Fragment>
        <Auth setIsAuth={setIsAuth} />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <div>
        {room ? (
          <div>
            <Chat room={room} />
          </div>
        ) : (
          <div className=" flex flex-col justify-center items-center h-screen">
            <div class="w-full mx-auto max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
              <div class="space-y-6">
                <h5 class="text-xl font-medium text-gray-900 dark:text-white text-center">
                  Enter Room Name
                </h5>
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center"
                  >
                    Room Name
                  </label>
                  <input
                    type="text"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Enter Room Name"
                    ref={roomRef}
                    required
                  />
                </div>
                <button
                  type="submit"
                  class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={(e) => {
                    setRoom(roomRef.current.value);
                  }}
                >
                  Enter
                </button>
              </div>
            </div>
            <button
              className="mt-4 border py-1 px-10 text-center rounded-xl bg-gray-300 hover:bg-gray-500"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default App;
