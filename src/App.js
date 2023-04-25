import React, { useState, useRef } from "react";
import "./App.css";
import Auth from "./components/Auth";

import Cookies from "universal-cookie";
import Chat from "./components/Chat";
const cookie = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookie.get("auth-token"));
  const [room, setRoom] = useState(null);

  const roomRef = useRef(null);

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
      </div>
    </React.Fragment>
  );
}

export default App;
