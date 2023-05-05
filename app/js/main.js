$(function name(params) {
    // для того чтобы плейсхолдер гас когда нажимаешь
    $(document).ready(function () {
        $('input,textarea').focus(function () {
            $(this).data('placeholder', $(this).attr('placeholder'));
            $(this).attr('placeholder', '');
        });
        $('input,textarea').blur(function () {
            $(this).attr('placeholder', $(this).data('placeholder'));
        });
    });

    // ------------------------------
    $('.menu__btn, .menu a').on('click', function () {
        $('.menu__btn,.menu__items').toggleClass('menu__items--active');
        // для крестика и для меню и что бы закрывалось меню после выбора сcылки
    });
    // $('.menu__btn, .menu a').on('click', function () {
    //     $('.menu__btn,.menu__items').toggleClass('menu__items--active');
    //     // для крестика и для меню и что бы закрывалось меню после выбора сcылки
    // });
});
// open modal
$(' .price__link--scout').click(function () {
    $('.modal--scout').show();
    $('.modal__inner').css('display', 'inline-block');
});
$('.price__link--leader').click(function () {
    $('.modal--leader').show();
    $('.modal__inner').css('display', 'inline-block');
});
$('.price__link--operator').click(function () {
    $('.modal--operator').show();
    $('.modal__inner').css('display', 'inline-block');
});

// close modal
$('.modal').click(function () {
    $(document).on('click', function (event) {
        var select = $('.modal__inner');
        if ($(event.target).closest(select).length)
            return;
        $('.modal, .modal__inner').hide();
        $(document).unbind('click');
        event.stopPropagation();
    });
});
// ---------------------------------------------
// скрипт который убирает полосу при скроле
$(function () {
    let header = $('.header');

    $(window).scroll(function () {
        if ($(this).scrollTop() > 690) {
            header.addClass('header-fixed');
        } else {
            header.removeClass('header-fixed');
        }
    });
});
// ---------------------------------------------
// для плавного скрола
$(".menu a").on("click", function (event) {
    event.preventDefault();
    var id = $(this).attr('href'),
        top = $(id).offset().top;
    $('body,html').animate({ scrollTop: top }, 1500);
});



// кнопка для адаптива
