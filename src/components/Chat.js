import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";

function Chat(props) {
  const { room } = props;

  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  const messageRef = collection(db, "messages");

  useEffect(() => {
    let queryMessages = query(
      messageRef,
      where("room", "==", room),
      orderBy("createdAt", "asc")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setAllMessages(messages);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message === "") return;
    try {
      await addDoc(messageRef, {
        text: message,
        createdAt: serverTimestamp(),
        user: auth.currentUser.displayName,
        room,
      });
    } catch (error) {
      console.error(error);
    }

    setMessage("");
  };

  return (
    <React.Fragment>
      <div>
        <h1>Room: {room}</h1>
        <div>
          {allMessages.map((message) => (
            <div key={message.id}>
              <h1>
                <span>{message.user}: </span>
                {message.text}
              </h1>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Message"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            value={message}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </React.Fragment>
  );
}

export default Chat;
