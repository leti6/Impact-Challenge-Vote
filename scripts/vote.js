



function handleChange(){
    const numberOfStars = $('input[type=radio]:checked').length;
    numberOfStars/8
    //$('#progressbar').css('width', Math.floor(numberOfStars / 8) * 100 + "%")
}

$('input[type=radio]').on('change', handleChange);
