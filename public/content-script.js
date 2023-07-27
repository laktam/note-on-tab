//get notes from local storage
//create draggable notes on the web site
//fill them with the content from storage
//if there is no notes create an empty one

//spawn left, right or center (default)

//get current page info
let site = location.hostname,
  title = document.title;
let noteKey = title + " " + "[" + site + "]";
noteKey = noteKey.replace(/ /g, "");
console.log("note key in content script : ", noteKey);

chrome.runtime.onMessage.addListener(function (message) {
  if (message.action === "add-note") {
    if (document.getElementById("OuterDiv-Note") === null) {
      console.log("Keyboard shortcut detected in content script!");
      Note = createOuterDiv();
      dragElement(Note);
      document.body.appendChild(Note);
      document.getElementById("textarea-note").focus();
    } else {
      document.getElementById("OuterDiv-Note").remove();
    }
  }
});

function createOuterDiv() {
  // Create the outer container
  let OuterDiv = document.createElement("div");
  OuterDiv.id = "OuterDiv-Note";
  // OuterDiv.style.width = "500px";
  OuterDiv.style.height = "80px";
  OuterDiv.style.position = "fixed";
  OuterDiv.style.bottom = "110px";
  OuterDiv.style.left = "50%";
  OuterDiv.style.transform = "translateX(-50%)";
  OuterDiv.style.backgroundColor = ""; //lightblue
  // OuterDiv.style.position = "absolute";
  OuterDiv.style.zIndex = 999;
  // document.body.appendChild(mydiv);

  // Create the header div with id="DivHeader" inside the mydiv container
  let DivHeader = document.createElement("div");
  DivHeader.id = "DivHeader";
  DivHeader.innerHTML = "Click here to move";
  DivHeader.style.padding = "10px";
  DivHeader.style.cursor = "move";
  OuterDiv.style.backgroundColor = "lightblue";
  // DivHeader.style.color = "white";
  DivHeader.style.zIndex = 1000;

  OuterDiv.appendChild(DivHeader);

  // Create the content div with id="content" inside the mydiv container
  let Content = document.createElement("div");
  Content.id = "content";
  //textarea
  let TextArea = document.createElement("textarea");
  TextArea.rows = 5;
  TextArea.cols = 60;
  TextArea.id = "textarea-note";
  TextArea.className = "note-textarea";
  TextArea.placeholder = "Type your note here...";

  //submit btn
  let Submit = document.createElement("input");
  Submit.type = "submit";
  Submit.value = "save";
  Submit.onclick = () => {
    //get website title and make it the key
    //store the note as the value
    let site = location.hostname,
      title = document.title;
    let noteKey = title + " " + "[" + site + "]";
    noteKey = noteKey.replace(/ /g, "");
    let noteText = document.getElementById("textarea-note").value;

    //get notes then append current note to the list
    let noteList = [];
    chrome.storage.local.get([noteKey]).then((result) => {
      noteList = result[noteKey];
      console.log("result", result);
      //if it doesn't exist init it
      console.log("note list before ", noteList);

      if (noteList === undefined) {
        //init localstorage
        chrome.storage.local.set({ [noteKey]: [] }).then(() => {
          console.log("init notelist on storage");
          noteList = [];
          noteList.push(noteText);
          chrome.storage.local.set({ [noteKey]: noteList }).then(() => {
            console.log("Note is set");
            console.log("note list after ", noteList);
          });
        });
      } else {
        //if it exist just update it
        noteList.push(noteText);
        chrome.storage.local.set({ [noteKey]: noteList }).then(() => {
          console.log("Note is set");
          console.log("note list after ", noteList);
        });
      }
    });

    document.getElementById("textarea-note").value = "";
  };

  //br
  let Br = document.createElement("br");

  Content.appendChild(TextArea);
  Content.appendChild(Br);
  Content.appendChild(Submit);
  OuterDiv.appendChild(Content);

  injectStyles();

  return OuterDiv;
}

///  functions to make the element draggable   ///////////   ////////////////////////////////
function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById("DivHeader")) {
    // if present, the header is where you move the DIV from:
    document.getElementById("DivHeader").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;

    // Check if the click happened on the textarea, and prevent dragging in that case
    if (e.target === document.getElementById("textarea-note")) {
      return;
    }

    e.preventDefault();

    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function injectStyles() {
  const style = document.createElement("style");
  style.textContent = `
    /* Note-like styling for the textarea
      width: 300px;
      height: 200px;
      resize: none;
       */
    .note-textarea {
      
      padding: 10px;
      border: 2px solid #ffcc66;
      background-color: #fff9e6;
      font-family: Arial, sans-serif;
      font-size: 14px;
      
      box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    }
  `;
  document.head.appendChild(style);
}
