import React, { useEffect, useState } from "react";
import "./App.css";
import { Divider, List, ListItem, ListItemText } from "@mui/material";

// type Note = {
//   noteKey: string;
//   noteText: string;
// };

function App() {
  const [notes, setNotes] = useState([]);
  const [noteKey, setNoteKey] = useState("");

  useEffect(() => {
    //get note key
    chrome.runtime.sendMessage({ action: "getNoteKey" }, (response) => {
      // Handle the response from the background script
      if (response && response.noteKey) {
        console.log(response.noteKey);

        setNoteKey(response.noteKey);
      }
    });
  }, []);

  useEffect(() => {
    console.log(noteKey);

    chrome.storage.local.get([noteKey]).then((result) => {
      console.log(result[noteKey]);

      setNotes(result[noteKey]);
    });
  }, [noteKey]);

  return (
    <div className="App">
      <List sx={{ bgcolor: "background.paper" }}>
        {notes !== undefined ? (
          notes.map((note, index) => {
            return (
              <>
                <ListItem key={index}>
                  <ListItemText primary={note} />
                </ListItem>
                <Divider />
              </>
            );
          })
        ) : (
          <p>No notes on this page</p>
        )}
      </List>
    </div>
  );
}

export default App;
