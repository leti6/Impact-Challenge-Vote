function handleChange() {
  const numberOfStars = $("input[type=radio]:checked").length;
  let progress = Math.floor(12.5 * numberOfStars);
  $("#progressbar").css("width", progress + "%");
}

$("input[type=radio]").on("change", handleChange);

const projectDescription = $("#project-description");

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

function showProjectonVoteForm(data) {
  const container = $("<div>");
  console.log(data.val());
  //     console.log("firebase data", data.val()[key].description);

  const div = $("<div>").addClass("box-project");
  const boxTitle = $("<h2>").addClass("box-title");
  const newPDescription = $("<p>").addClass("box-description");
  const newPTeam = $("<p>").addClass("box-team");

  boxTitle.text(data.val().title);
  newPDescription.text(data.val().description);
  newPTeam.text(data.val().team);

  container.append(div);

  div.append(boxTitle, newPDescription, newPTeam);

  //     console.log(div)

  projectDescription.html(container);
}

firebase
  .database()
  .ref("/demo/projects/" + getQueryVariable("projectId"))
  .once("value")
  .then(showProjectonVoteForm);

function SaveVoteJury(event) {
  event.preventDefault();

  const projectId = getQueryVariable("projectId");
  //console.log(projectId)
  console.log("voting");

  const resultatVoteJury = {
    Differentiation: "",
    Viability: "",
    Feasability: "",
    Impact: "",
    Overall_Rating: "",
    name: localStorage.getItem("name")
  };

  const radioCentricity = $("[name=radioUserCentricity]:checked");
  const radioDifferentiation = $("[name=radioDifferentiation]:checked");
  const radioProfitability = $("[name=radioProfitability]:checked");
  const radioScalability = $("[name=radioScalability]:checked");
  const radioTechIntegration = $("[name=radioTechIntegration]:checked");
  const radioTechEvolution = $("[name=radioTechEvolution]:checked");
  const radioResource = $("[name=radioResource]:checked");
  const radioImpactPotential = $("[name=radioImpactPotential]:checked");

  let moyenneDesirability =
    Number(radioCentricity.val()) + Number(radioDifferentiation.val());
  let moyenneViability =
    Number(radioProfitability.val()) + Number(radioScalability.val());
  let moyenneFeasability =
    Number(radioTechIntegration.val()) + Number(radioTechEvolution.val());
  let moyenneImpact =
    Number(radioResource.val()) + Number(radioImpactPotential.val());
  let calculOverall =
    (moyenneDesirability +
      moyenneViability +
      moyenneFeasability +
      moyenneImpact) /
    4;

  resultatVoteJury.Differentiation = moyenneDesirability;
  resultatVoteJury.Viability = moyenneViability;
  resultatVoteJury.Feasability = moyenneFeasability;
  resultatVoteJury.Impact = moyenneImpact;
  resultatVoteJury.Overall_Rating = calculOverall;

  //console.log(resultatVoteJury)
  firebase
    .database()
    .ref("/demo/resultats/" + projectId + "/" + localStorage.getItem("name"))
    .set(resultatVoteJury);
  firebase
    .database()
    .ref("/demo/juges/" + localStorage.getItem("name") + "/" + projectId)
    .set(true);

  window.location.replace("../Projects_list.html");
}

$("#form-vote").on("submit", SaveVoteJury);
