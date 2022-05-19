// alert(localStorage.getItem("UserId"));
let checkIfUserIsNotLoggedIn = localStorage.getItem("UserId") == null;
if (checkIfUserIsNotLoggedIn) {
    console.log("re direct back to login page");
    window.location.href = "Login.html";
}

window.onload = function () {
    let checkIfUserIsLoggedIn = localStorage.getItem("UserId") != null;
    if (checkIfUserIsLoggedIn) {
        getNoteData();
    }
}

const noteTitle = document.querySelector("#txtTitle");
const noteDescription = document.querySelector("#txtDescription");

const editTitle = document.querySelector("#txtEditTitle");
const editDescription = document.querySelector("#txtEditDescription");

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
            clearForm('#formNote');
            getNoteData();
        }
    });

    console.log("Processing Data");
}

function getNoteData() {
    var dataToServer = {
        UserId: localStorage.getItem("UserId"),
    };

    $.ajax({
        type: 'POST',
        url: '../php/GetNoteData.php',
        data: dataToServer,
        success: function (data, status) {
            console.log(status);
            var noteData = null;

            try {
                noteData = JSON.parse(data);
            } catch (error) {
                console.log("Card Data does not exist in system: " + error);
            }

            console.log(noteData)

            const notesSection = document.querySelector('#notesSection');
            notesSection.innerHTML = '';

            if (noteData != null) {
                for (let i = 0; i < noteData.length; i++) {
                    const template = document.createElement('template');
            template.innerHTML = `
            <div class="col-xl-4">
            <div class="card border-secondary marginTop25">
              <div class="card-body">
                <h5 class="card-title">${noteData[i].Title}</h5>
                <p class="card-text">${noteData[i].Description}</p>

                <!-- Button trigger modal -->
                <button type="button" onclick="editNoteData(${noteData[i].NoteId})" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editStaticBackdrop"><i class="fas fa-edit"></i></button>
              </div>
              </div>
            </div>
        `;

            let notesSectionChildren = notesSection.children;
            const rowElement = document.createElement('div');
            rowElement.className = 'row pb-5';

            //add first row
            if (notesSectionChildren.length === 0) {
                notesSection.appendChild(rowElement);
            }

            //loop through rows and check if each row has 3 cards
            for (let i = 0; i < notesSectionChildren.length; i++) {
            const row = notesSectionChildren[i];

            //populate row with a new card
            if (row.children.length < 3) {
                row.appendChild(template.content);
            }
            //all rows are full so create a new one
            else {
                notesSection.appendChild(rowElement);
            }
        }
       }
     }
    }
});

    console.log("Processing Data");
}

function editNoteData(noteId) {
    document.querySelector("#hiddenData").value = noteId;
  
    var dataToServer = {
      UserId: localStorage.getItem("UserId"),
      NoteId: noteId
    };
  
    $.ajax({
      type: 'POST',
      url: '../php/EditNoteData.php',
      data: dataToServer,
      success: function (data, status) {
        console.log(status);
        var noteData = null;
  
        try {
            noteData = JSON.parse(data);
        } catch (error) {
          console.log("Card Data does not exist in system: " + error);
        }
  
        console.log(noteData.Link)
  
        editTitle.value = noteData.Title
        editDescription.value = noteData.Description
      }
    });
  
    console.log("Processing Data");
  }

  function updateNoteData(e) {
    if (e.preventDefault) e.preventDefault();
  
    let noteId = document.querySelector("#hiddenData").value;
  
    var dataToServer = {
      UserId: localStorage.getItem("UserId"),
      NoteId: noteId,
      Title: editTitle.value,
      Description: editDescription.value
    };
  
    $.ajax({
      type: 'POST',
      url: '../php/UpdateNoteData.php',
      data: dataToServer,
      success: function (status) {
        console.log(status);
        $('#editStaticBackdrop').modal('hide');
        clearForm('#formEditNote');
        getNoteData();
      }
    });
  
    console.log("Updating note data");
  }

  function deleteNoteData(e) {
    if (e.preventDefault) e.preventDefault();
  
    let noteId = document.querySelector("#hiddenData").value;
  
    var dataToServer = {
      UserId: localStorage.getItem("UserId"),
      NoteId: noteId
    };
  
    $.ajax({
      type: 'POST',
      url: '../php/DeleteNoteData.php',
      data: dataToServer,
      success: function (status) {
        console.log(status);
        $('#editStaticBackdrop').modal('hide');
        getNoteData();
      }
    });
  
    console.log("Processing deletion of data");
  }

  function clearLocalStorage() {
    localStorage.clear();
  }

  function clearForm(element){
    // document.querySelector('#formEditNote').reset();
    document.querySelector(element).reset();
  }
  

document.querySelector('#formNote').addEventListener("submit", processCreateNoteForm);
document.querySelector('#formEditNote').addEventListener("submit", updateNoteData);
document.querySelector('#btnDeleteNote').addEventListener("click", deleteNoteData);
document.querySelector('#btnLogout').addEventListener("click", clearLocalStorage);
document.querySelector('#btnCloseModal').addEventListener("click", clearForm('#formEditNote'));