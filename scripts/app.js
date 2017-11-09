
$(document).ready(initSlick);

// Get titles from the DOM
var titleMain  = $("#animatedHeading");
var titleSubs  = titleMain.find("slick-active");

if (titleMain.length) {

  titleMain.slick({
    autoplay: false,
    arrows: false,
    dots: false,
    slidesToShow: 3,
    centerPadding: "10px",
    draggable: false,
    infinite: true,
    pauseOnHover: false,
    swipe: false,
    touchMove: false,
    vertical: true,
    speed: 1000,
    autoplaySpeed: 2000,
    useTransform: true,
    cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
    adaptiveHeight: true,
  });

  // On init
  $(".slick-dupe").each(function(index, el) {
    $("#animatedHeading").slick('slickAdd', "<div>" + el.innerHTML + "</div>");
  });

  // Manually refresh positioning of slick
  titleMain.slick('slickPlay');
};


function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}

function initSlick(){
    $('.autoplay').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
      });
}

  const CreaInputTitle = $('#creation-input-title')
  const CreaInputDescription = $('#creation-input-description')
  const CreaInputTeam = $('#creation-input-team')
  
function CreateProject (event) {

    const newProject = {
        title: "",
        description: "",
        team: "",
    }

    event.preventDefault()
    newProject.title = CreaInputTitle.val()

    newProject.description = CreaInputDescription.val()

    newProject.team = CreaInputTeam.val()

    firebase.database().ref('/demo/projects').push(newProject);

    console.log(newProject)
}
  
$('#creation-form').on('submit', CreateProject)
  
const showProjects = $('#showtheProjects')

function showAllProjects (data) {
    const container = $('<div>')
    for(let key in data.val())
    {
        console.log("firebase data", data.val()[key].description);
        
        const div = $('<div>').addClass('box-project');
        const boxTitle = $('<h2>').addClass('box-title');
        const newPDescription =$('<p>').addClass('box-description');
        const newPTeam = $('<p>').addClass('box-team');
        const CreaVoteButton = '<a class="btn btn-primary" href="/vote.html?projectId=' + key + '" role="button">Vote here</a>'
        
        const XdeleteButton = $('<button>').addClass("XdeleteButton", "btn btn-secondary").prop("type","button").text("x");

        XdeleteButton.click(deleteTheProject);
      
        boxTitle.text(data.val()[key].title);
        
        newPDescription.text(data.val()[key].description);
        
        newPTeam.text(data.val()[key].team);
        
        container.append(div);

        div.prop("id", key);
        
        div.append(
            boxTitle,
            newPDescription,
            newPTeam,
            CreaVoteButton,
            XdeleteButton)
        
            
        console.log(div)
    }
    showProjects.html(container)
}

const newProject = firebase.database().ref('/demo/projects').on('value', showAllProjects)


  function deleteTheProject(event) {
      console.log(event.target);
    let key = $(this).parent().prop("id");
    console.log(key);
    let ref = firebase.database().ref('/demo/projects/' + key).remove();
  }

 

  function SaveVoteJury (event) {
    event.preventDefault()

    const projectId = getQueryVariable('projectId'); 
    console.log(projectId)   

    const resultatVoteJury = {
        Differentiation: "",
        Viability: "",
        Feasability: "",
        Impact: "",
        Overall_Rating: ""
    }

    const radioCentricity = $('[name=radioUserCentricity]:checked');
    const radioDifferentiation = $('[name=radioDifferentiation]:checked');
    const radioProfitability = $('[name=radioProfitability]:checked');
    const radioScalability = $('[name=radioScalability]:checked');
    const radioTechIntegration = $('[name=radioTechIntegration]:checked');
    const radioTechEvolution = $('[name=radioTechEvolution]:checked');
    const radioResource = $('[name=radioResource]:checked');
    const radioImpactPotential = $('[name=radioImpactPotential]:checked');

     let moyenneDesirability = (Number(radioCentricity.val()) + Number(radioDifferentiation.val()))/2
    let moyenneViability = (Number(radioProfitability.val()) + Number(radioScalability.val()))/2
    let moyenneFeasability = (Number(radioTechIntegration.val()) + Number(radioTechEvolution.val()))/2
    let moyenneImpact = (Number(radioResource.val()) + Number(radioImpactPotential.val()))/2
    let calculOverall = (moyenneDesirability + moyenneViability + moyenneFeasability + moyenneImpact)/2  

    resultatVoteJury.Differentiation = moyenneDesirability
    resultatVoteJury.Viability = moyenneViability
    resultatVoteJury.Feasability = moyenneFeasability
    resultatVoteJury.Impact = moyenneImpact
    resultatVoteJury.Overall_Rating = calculOverall


    console.log(resultatVoteJury)
    


    firebase.database().ref('/demo/resultats/' + projectId).push(resultatVoteJury)
  }

function moyenneVotesProjet (key) {
  let resultats = firebase.database().ref('/demo/resultats/'+key);
  let sommeDifferentiation = 0;
  let sommeViability = 0;
  let sommeFeasability = 0;
  let sommeImpact = 0;
  let sommeOverall = 0;

  for(let key in resultats){
      sommeDifferentiation+=resultats[key].Differentiation;
      sommeViability+=resultats[key].Viability;
      sommeFeasability+=resultats[key].Feasability;
      sommeImpact+=resultats[key].Impact;
      sommeOverall+=resultats[key].Overall_Rating;
  }
  let moyennes = 
  {
    moyennetDifferentiationTotal: sommeDifferentiation/resultats.length,
    moyennetViabilityTotal : sommeViability/resultats.length,
    moyennetFeasabilityTotal : sommeFeasability/resultats.length,
    moyennetImpactTotal : sommeImpact/resultats.length,
    moyenneOverallTotal : sommeOverall/resultats.length
  }

  return moyennes;

}
 createTab();
function createTab(){
    const body = $("#tbody");
    const projects = firebase.database().ref('/demo/projects');

    for(let key in projects){

        const newRow = $('<tr>');
        const tdTitle = $('<td>');
        const tdOverall = $('<td>');
        const tdDifferentiation = $('<td>');
        const tdViability = $('<td>');
        const tdFeasability = $('<td>');
        const tdImpact = $('<td>');

        let moyennes = moyenneVotesProjet(key)

        tdTitle.text(projects[key].title)
        tdOverall.text(moyennes.moyenneOverallTotal)
        tdDifferentiation.text(moyennes.moyennetDifferentiationTotal)
        tdViability.text(moyennes.moyennetViabilityTotal)
        tdFeasability.text(moyennes.moyennetFeasabilityTotal)
        tdImpact.text(moyennes.moyennetImpactTotal)

        body.append(newRow)
        
        newRow.append(tdTitle, tdOverall, tdDifferentiation, tdViability, tdFeasability, tdImpact)
    }
}

$('#result-btn').click(moyenneVotesProjet)

  $('#form-vote').on('submit', SaveVoteJury)

//   const resultatVoteJury = {
//     user_Centricity: "",
//     differentiation: "",
//     profitability: "",
//     scalability: "",
//     technology_Integration: "",
//     technology_evolution: "",
//     Resource_to_Impact: "",
//     Impact_potential: "",
//     Overall_Rating: ""
// }


// resultatVoteJury.user_Centricity = Number(radioCentricity.val())
// resultatVoteJury.differentiation = Number(radioDifferentiation.val())
// resultatVoteJury.profitability = Number(radioProfitability.val())
// resultatVoteJury.scalability = Number(radioScalability.val())
// resultatVoteJury.technology_Integration = Number(radioTechIntegration.val())
// resultatVoteJury.technology_evolution = Number(radioTechEvolution.val())
// resultatVoteJury.Resource_to_Impact = Number(radioResource.val())
// resultatVoteJury.Impact_potential = Number(radioImpactPotential.val())