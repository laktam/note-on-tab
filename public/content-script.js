//get notes from local storage
//create draggable notes on the web site
//fill them with the content from storage
//if there is no notes create an empty one

//2
// Create the outer container
var OuterDiv = document.createElement("div");
OuterDiv.id = "OuterDiv";
OuterDiv.style.width = "200px";
OuterDiv.style.height = "400px";
OuterDiv.style.backgroundColor = "lightblue";
OuterDiv.style.position = "absolute";
// document.body.appendChild(mydiv);

// Create the header div with id="mydivheader" inside the mydiv container
var mydivheader = document.createElement("div");
mydivheader.id = "mydivheader";
mydivheader.innerHTML = "Click here to move";
mydivheader.style.padding = "10px";
mydivheader.style.cursor = "move";
mydivheader.style.backgroundColor = "blue";
mydivheader.style.color = "white";
mydiv.appendChild(mydivheader);

// Create the content div with id="content" inside the mydiv container
var content = document.createElement("div");
content.id = "content";
mydiv.appendChild(content);
