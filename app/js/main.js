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

// ---------------------------------------------
// для плавного скрола
$(".menu a").on("click", function (event) {
    event.preventDefault();
    var id = $(this).attr('href'),
        top = $(id).offset().top;
    $('body,html').animate({ scrollTop: top }, 1500);
});



// // кнопка для адаптива

// const header = document.querySelector('.header');
// const first = document.querySelector('.first');
// const headerHeight = header.offsetHeight;
// const firstHeight = first.offsetHeight;
// let lastScrollTop = 0;

// window.addEventListener('scroll', () => {
//     let scrollDistance = window.scrollY;

//     // if (scrollDistance >= firstHeight + headerHeight) {
//     // 	header.classList.add('header--fixed');
//     // 	first.style.marginTop = `${headerHeight}px`;
//     // } else {
//     // 	header.classList.remove('header--fixed');
//     // 	first.style.marginTop = null;
//     // }

//     if (scrollDistance > lastScrollTop) {
//         header.classList.remove('header-fixed');
//         first.style.marginTop = null;
//     } else {
//         header.classList.add('header-fixed');
//         first.style.marginTop = `${headerHeight}px`;
//     }

//     if (scrollDistance === 0) {
//         header.classList.remove('header-fixed');
//         first.style.marginTop = null;
//     }

//     lastScrollTop = scrollDistance;
// });
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
const header = document.querySelector('header');

window.addEventListener('scroll', function () {
    const scrollY = window.scrollY;

    if (scrollY >= header.offsetHeight) {
        header.classList.add('header-fixed');
    } else {
        header.classList.remove('header-fixed');
    }
});
// Функция для фиксированной шапки при скролле

/** Функция для фиксированной шапки при скролле */
// headerFixed()
// let html = document.documentElement;


// function headerFixed() {
//     const headerStickyObserver = new IntersectionObserver(([entry]) => {
//         html.classList.toggle('header-fixed', !entry.isIntersecting);
//     });
//     let firstScreen = document.querySelector('[data-observ]');
//     if (firstScreen) {
//         headerStickyObserver.observe(firstScreen);
//     }
// }