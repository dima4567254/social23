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
});

/*открывать форму*/
const modalWindow = document.querySelector('.modal');
const modalWindow2 = document.querySelector('.modal--scout');
const modalWindow3 = document.querySelector('.modal--leader');

const buttonModal = document.querySelector('.price__link--operator');
const buttonModal2 = document.querySelector('.price__link--scout');
const buttonModal3 = document.querySelector('.price__link--leader');

/*addEventListenerпрослушиватель событий по нажатию левой кнопкой мышы*/
buttonModal.addEventListener('click', () => {
    modalWindow.classList.add('active-modal'); /*добовляем класс*/
});

buttonModal2.addEventListener('click', () => {
    modalWindow2.classList.add('active-modal'); /*добовляем класс*/
});

buttonModal3.addEventListener('click', () => {
    modalWindow3.classList.add('active-modal'); /*добовляем класс*/
});

/*закрытие окна*/
modalWindow.addEventListener('click', (e) => {
    const isModal = e.target.closest('.modal__inner'); /*если клик в любое место кроме .modal__inner то окно закрывается */
    if (!isModal) {
        modalWindow.classList.remove('active-modal');
    }
    /*добовляем класс*/
});

modalWindow2.addEventListener('click', (e) => {
    const isModal = e.target.closest('.modal__inner'); /*если клик в любое место кроме .modal__inner то окно закрывается */
    if (!isModal) {
        modalWindow2.classList.remove('active-modal');
    }
    /*добовляем класс*/
});

modalWindow3.addEventListener('click', (e) => {
    const isModal = e.target.closest('.modal__inner'); /*если клик в любое место кроме .modal__inner то окно закрывается */
    if (!isModal) {
        modalWindow3.classList.remove('active-modal');
    }
    /*добовляем класс*/
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
