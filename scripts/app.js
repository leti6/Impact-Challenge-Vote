
$(document).ready(initSlick);


function initSlick(){
    $('.autoplay').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 2500
      });
}

//  var myIndex = 0;
//  carousel();


// function carousel() {
//     var i;
//  var x = document.getElementsByClassName("mySlides");
//     for (i = 0; i < x.length; i++) {
//        x[i].style.display = "none";  
//      }
//      myIndex++;
//      if (myIndex > x.length) {myIndex = 1}    
//     x[myIndex-1].style.display = "block";  
//      setTimeout(carousel, 3000);    
//  }




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
        const CreaVoteButton = '<a class="btn btn-primary" href="http://getbootstrap.com/docs/4.0/examples/justified-nav/#" role="button">Vote here</a>'
        
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

  function handleProjects(data){
  
    const projects = data.val();
    console.log(projects);

  }

  function deleteTheProject(event) {
      console.log(event.target);
    let key = $(this).parent().prop("id");
    console.log(key);
    let ref = firebase.database().ref('/demo/projects/' + key).remove();
  }

