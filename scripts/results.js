






function moyenneVotesProjet (project) {
  let sommeDifferentiation = 0;
  let sommeViability = 0;
  let sommeFeasability = 0;
  let sommeImpact = 0;
  let sommeOverall = 0;


  for(let key in project){
      sommeDifferentiation+=project[key].Differentiation;
      sommeViability+=project[key].Viability;
      sommeFeasability+=project[key].Feasability;
      sommeImpact+=project[key].Impact;
      sommeOverall+=project[key].Overall_Rating;
  }
  
  const length = Object.keys(project).length;

  let moyennes = 
  {
    moyennetDifferentiationTotal: (sommeDifferentiation/length).toFixed(2),
    moyennetViabilityTotal : (sommeViability/length).toFixed(2),
    moyennetFeasabilityTotal : (sommeFeasability/length).toFixed(2),
    moyennetImpactTotal : (sommeImpact/length).toFixed(2),
    moyenneOverallTotal : (sommeOverall/length).toFixed(2)
  }

  return moyennes;

}
let writting = false;
async function createTab (data){
    if(writting){
        return;
    }
    writting = true;
    const projects = data.val(); 

    const body = $('#tbody')
    body.html('');

    for(let projectKey in projects){
        const moyennes = moyenneVotesProjet(projects[projectKey]);
        const infoProject = await firebase.database().ref('/demo/projects/' + projectKey + '/title').once('value');
        const titre = infoProject.val();

            
            const newRow = $('<tr>');
            const tdTitle = $('<td>');
            const tdOverall = $('<td>');
            const tdDifferentiation = $('<td>');
            const tdViability = $('<td>');
            const tdFeasability = $('<td>');
            const tdImpact = $('<td>');
    
            tdTitle.text(titre)
            tdOverall.text(moyennes.moyenneOverallTotal)
            tdDifferentiation.text(moyennes.moyennetDifferentiationTotal)
            tdViability.text(moyennes.moyennetViabilityTotal)
            tdFeasability.text(moyennes.moyennetFeasabilityTotal)
            tdImpact.text(moyennes.moyennetImpactTotal)
    
            body.append(newRow)
            
            newRow.append(tdTitle, tdOverall, tdDifferentiation, tdViability, tdFeasability, tdImpact)

    }
    writting = false;
}

firebase.database().ref('/demo/resultats').on('value', createTab);
