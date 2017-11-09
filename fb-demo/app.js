/**
 * Exemple Encodage Et Lecture Projet
 */

// Exemple pour écrire à un chemin précis
//firebase.database().ref('/demo/information/title').set("Hello, this is a test title");












//firebase.database().ref('/demo/information/mytest').set("This is my first test");

// Créer des projets
const informationsProjet = {
  title: 'Projet n°4',
  description: 'This is also a test project',
  team: 'Laura, Léti'
}


// Lire les projets
function handleProjects(data){
  // On récupère la value de data
  const projects = data.val();
  console.log(projects);

  // On transforme l'objet data en tableau
  const projectsArray = Object.values(projects);

  // On sélectionne projectContainer
  const projectContainer = document.getElementById('projects-container');

  // Création du markup sur base de la liste de projets
  let resultat = '<ul>';
  for(let project of projectsArray){
    resultat += '<li>' + project.title + '</li>';
  }
  projectContainer.innerHTML = resultat;
}
// À chaque nouvelle valeur dans la datbase sur demo/porjects on appelle handleProjects//
//firebase.database().ref('/demo/projects').on('value', handleProjects);






// function getRandom5(){
//   return Math.floor(Math.random()  * 5);
// }

/**
 * Exemple Encodage Notes
 */
const resultat = {
  desirability: getRandom5(),
  viability: getRandom5(),
  feasability: getRandom5(),
  impact: getRandom5(),
  overall: 3.625
};

// Id de projet
const projectId = "-KyR1ISSR8osJhPNdsiJ";

// Ecriture sur un projet
// firebase.database().ref('/demo/resultats/' + projectId).push(resultat);

//firebase.database().ref('/demo/information/title' + projectId).push(resultat);



/**
 * Exemple moyenne
 */
function handleMoyenne(data){
  const value = data.val();
  const valeurs = Object.values(value);

  let resultat = 0;
  for(let valeur of valeurs){
    resultat += valeur.overall;
  }
  resultat = resultat / valeurs.length;
  
  console.log('Valeur moyenne pour ce projet', resultat);

  console.log(valeurs);
}
//firebase.database().ref('/demo/resultats/' + projectId).on('value', handleMoyenne);
