import React, { useEffect, useState } from "react";
import "./App.css";

// type Note = {
//   noteKey: string;
//   noteText: string;
// };

function App() {
  const [notes, setNotes] = useState("");
  const [noteKey, setNoteKey] = useState("");

  useEffect(() => {
    //get note key
    chrome.runtime.sendMessage({ action: "getNoteKey" }, (response) => {
      // Handle the response from the background script
      if (response && response.noteKey) {
        setNoteKey(response.noteKey);
      }
    });
  }, []);
  useEffect(() => {
    console.log("note key in 2nd useeffect ", noteKey);

    chrome.storage.local.get([noteKey]).then((result) => {
      setNotes(result[noteKey]);
    });
  }, [noteKey]);
  return <div className="App">{notes}</div>;
}

export default App;
