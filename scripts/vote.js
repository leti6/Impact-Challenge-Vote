
function handleChange(){
    const numberOfStars = $('input[type=radio]:checked').length;
    let progress = Math.floor(12.5 * numberOfStars);
    $('#progressbar').css('width', progress + "%");
}

$('input[type=radio]').on('change', handleChange);
