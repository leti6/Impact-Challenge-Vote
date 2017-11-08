$(document).ready(initSlick);


function initSlick(){
    $('.autoplay').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
      });
}
