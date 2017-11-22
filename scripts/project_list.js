let name = "";

const CreaInputTitle = $("#creation-input-title");
const CreaInputDescription = $("#creation-input-description");
const CreaInputTeam = $("#creation-input-team");

const nameForm = $("#name-form");
const nameParagraph = $("#name-paragraph");
const nameText = $("#name-text");
const nameInput = $("#name-input");
const saveBtn = $("#save-btn");
const resetBtn = $("#reset-name");

if (localStorage.getItem("name")) {
  name = localStorage.getItem("name");
  nameForm.hide();
  nameText.show();
  nameParagraph.text(name);
}

function resetName() {
  localStorage.removeItem("name");
  nameForm.show();
  nameText.hide();
  nameParagraph.text('');
}

resetBtn.click(resetName);  

function handleSaveName() {
  const value = nameInput.val();
  if (!value) {
    return;
  }
  nameForm.hide();
  nameText.show();
  nameParagraph.text(value);
  localStorage.setItem("name", value);
}

saveBtn.click(handleSaveName);

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (decodeURIComponent(pair[0]) == variable) {
      return decodeURIComponent(pair[1]);
    }
  }
  console.log("Query variable %s not found", variable);
}

function CreateProject(event) {
  const newProject = {
    title: "",
    description: "",
    team: ""
  };

  event.preventDefault();
  newProject.title = CreaInputTitle.val();

  newProject.description = CreaInputDescription.val();

  newProject.team = CreaInputTeam.val();

  firebase
    .database()
    .ref("/demo/projects")
    .push(newProject);

  console.log(newProject);
}

$("#creation-form").on("submit", CreateProject);

const showProjects = $("#showtheProjects");

function showAllProjects(data) {
  const container = $("<div>");
  for (let key in data.val()) {
    console.log("firebase data", data.val()[key].description);

    const div = $("<div>").addClass("box-project");
    const boxTitle = $("<h2>").addClass("box-title");
    const newPDescription = $("<p>").addClass("box-description");
    const newPTeam = $("<p>").addClass("box-team");
    const CreaVoteButton =
      '<a class="btn btn-primary" href="/vote.html?projectId=' +
      key +
      '" role="button">Vote here</a>';

    boxTitle.text(data.val()[key].title);

    newPDescription.text(data.val()[key].description);

    newPTeam.text(data.val()[key].team);

    container.append(div);

    div.prop("id", key);

    div.append(boxTitle, newPDescription, newPTeam, CreaVoteButton);

    console.log(div);
  }
  showProjects.html(container);
}

const newProject = firebase
  .database()
  .ref("/demo/projects")
  .on("value", showAllProjects);

function deleteTheProject(event) {
  console.log(event.target);
  let key = $(this)
    .parent()
    .prop("id");
  console.log(key);
  let ref = firebase
    .database()
    .ref("/demo/projects/" + key)
    .remove();
}
