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
          <div>
            <h1>Enter Room Name</h1>
            <label>Room Name:</label>
            <input type="text" ref={roomRef} />
            <button
              onClick={() => {
                setRoom(roomRef.current.value);
              }}
            >
              Enter Chat Room
            </button>
          </div>
        )}

        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </React.Fragment>
  );
}

export default App;
