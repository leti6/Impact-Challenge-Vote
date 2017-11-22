
  const CreaInputTitle = $('#creation-input-title')
  const CreaInputDescription = $('#creation-input-description')
  const CreaInputTeam = $('#creation-input-team')
  
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
    window.location.replace("../Projetcs-Global.html");
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
     ref = firebase.database().ref('/demo/resultats/' + key).remove();
  }

 

  
