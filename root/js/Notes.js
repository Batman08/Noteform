let checkIfUserIsNotLoggedIn = localStorage.getItem("UserId") == null;
if (checkIfUserIsNotLoggedIn) {
  console.log("re direct back to login page");
  window.location.href = "Login.html";
}

window.onload = function () {
  let checkIfUserIsLoggedIn = localStorage.getItem("UserId") != null;
  if (checkIfUserIsLoggedIn) {
    // getNoteData();
  }
}

const noteTitle = document.querySelector("#txtTitle");
const noteDescription = document.querySelector("#txtDescription");

function processCreateNoteForm(e) {
    if (e.preventDefault) e.preventDefault();
  
    var dataToServer = {
      UserId: localStorage.getItem("UserId"),
      Title: noteTitle.value,
      Description: noteDescription.value
    };
  
    $.ajax({
      type: 'POST',
      url: '../php/SaveNoteData.php',
      data: dataToServer,
      success: function (data, status) {
        console.log(status);
        // getCardData();
      }
    });
  
    console.log("Processing Data");
  }

  document.querySelector('#formNote').addEventListener("submit", processCreateNoteForm);