//get notes from local storage
//create draggable notes on the web site
//fill them with the content from storage
//if there is no notes create an empty one

//2

document.addEventListener("keydown", function (event) {
  // Check for Ctrl + Shift + n
  if (event.ctrlKey && event.shiftKey && event.key === "n") {
    DraggableDiv = createDraggableDiv();
    document.appendChild(DraggableDiv);
  }
});

function createDraggableDiv() {
  // Create the outer container
  var OuterDiv = document.createElement("div");
  OuterDiv.id = "OuterDiv";
  OuterDiv.style.width = "200px";
  OuterDiv.style.height = "400px";
  OuterDiv.style.backgroundColor = "lightblue";
  OuterDiv.style.position = "absolute";
  // document.body.appendChild(mydiv);

  // Create the header div with id="DivHeader" inside the mydiv container
  var DivHeader = document.createElement("div");
  DivHeader.id = "DivHeader";
  DivHeader.innerHTML = "Click here to move";
  DivHeader.style.padding = "10px";
  DivHeader.style.cursor = "move";
  DivHeader.style.backgroundColor = "blue";
  DivHeader.style.color = "white";
  OuterDiv.appendChild(DivHeader);

  // Create the content div with id="content" inside the mydiv container
  var Content = document.createElement("div");
  Content.id = "content";
  OuterDiv.appendChild(Content);

  return OuterDiv;
}
