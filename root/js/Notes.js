alert(localStorage.getItem("UserId"));
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
            <div class="col-md-4">
            <div class="card marginTop25">
              <div class="card-body">
                <h5 class="card-title">${noteData[i].Title}</h5>
                <p class="card-text">${noteData[i].Description}</p>
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

document.querySelector('#formNote').addEventListener("submit", processCreateNoteForm);