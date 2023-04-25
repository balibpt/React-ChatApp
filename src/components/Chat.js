import React, { useEffect, useState, useRef } from "react";
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

  const chatBoxRef = useRef(null); // create a reference to the chat box element

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

      // scroll to the bottom of the chat box element
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth",
      });
    });

    return () => unsubscribe();
  }, [room, messageRef]); // add room to the dependency array to re-run the effect when the room changes

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

      // clear the message input field
      setMessage("");

      // scroll to the bottom of the chat box element
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <React.Fragment>
      <div className="h-screen flex justify-center items-center">
        <div className="border rounded-xl shadow-md overflow-hidden">
          <div className="border-b text-center text-4xl bg-blue-300 px-64 py-6">
            Room Name: {room}
          </div>
          <div
            ref={chatBoxRef} // set the chat box element as the reference
            className="px-4 py-4 h-64 overflow-scroll"
          >
            {allMessages.map((message) => (
              <div key={message.id} className="mb-4">
                <h1 className="font-bold">
                  {message.user}:{" "}
                  <span className="text-gray-500 font-medium">
                    {message.text}
                  </span>{" "}
                </h1>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="border-t border-gray-600">
            <div className="w-full flex justify-between items-center h-14">
              <input
                type="text"
                placeholder="Enter Message"
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                value={message}
                className="flex-grow border-none mx-4 my-2 px-4 py-2 mr-2 focus:border-none focus:ring-0 focus:outline-none"
              />
              <div className="border-l h-full flex items-center justify-center hover:bg-blue-500">
                <button type="submit" className="px-4">
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Chat;
