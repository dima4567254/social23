$(function name(params) {

    $(document).ready(function () {
        $('input,textarea').focus(function(){
          $(this).data('placeholder',$(this).attr('placeholder'))
          $(this).attr('placeholder','');
        });
        $('input,textarea').blur(function(){
          $(this).attr('placeholder',$(this).data('placeholder'));
        });
        });



    /*	$(".menu a").on("click", function (event) {
    	    event.preventDefault();
    	    var id = $(this).attr('href'),
    	        top = $(id).offset().top;
    	    $('body,html').animate({
    	        scrollTop: top
    	    }, 1500);
    	});

        /*для закрыть меню*/
    /*
              $('.menu__btn').on('click', function () {
                  $('.menu__items').toggleClass('menu__items--active');
              });
              $('.menu__btn').on('click', function () {
                  $('.menu__btn').toggleClass('active');
              });
           
            $('.home__slider').slick({
                dots: true,
                arrows: false,
                 responsive: [


                     {
                         breakpoint: 1150,
                         settings: {
                             slidesToShow: 4,
                         }
                     },
                     {
                         breakpoint: 1000,
                         settings: {
                             slidesToShow: 3,
                         }
                     },
                     {
                         breakpoint: 620,
                         settings: {
                             slidesToShow: 2,
                             slidesToScroll: 2,
                         }
                     },
                 ]
            });
           
           
           */


});