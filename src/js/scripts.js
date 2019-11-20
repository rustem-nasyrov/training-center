'use strict';
$(function () {
    let $slider = $('.slider').slick({
        autoPlay: true,
        dots: false,
        prevArrow: $('.slider-btn-prev'),
        nextArrow: $('.slider-btn-next'),
    });
    $('.slider-paging__current').text($(
            '.slider-item:not(.slick-cloned)')
        .index());
    $('.slider-paging__total').text($(
        '.slider-item:not(.slick-cloned)').length);
    const pageCounterHandler = (event, slick,
        currentSlide, nextSlide) => {
        let i = (currentSlide ? currentSlide : 0) + 1;
        $('.slider-paging__current').text(i);
        $('.slider-paging__total').text(slick.slideCount);
    }
    $slider.on('init reInit afterChange', pageCounterHandler);
    $('.auth-btn').click(() => $('.auth-popup').toggleClass(
        'auth-popup--active'));
    $('.nav-btn').click(() => {
        $('.header-nav-container').toggleClass(
            'header-nav-container--active');
    });
    $(window).on('scroll', function () {
        let scroll = $(window).scrollTop();
        if (scroll > 50 && document.body.offsetHeight > 1200)
            $('.header').addClass('header--fixed');
        else
            $('.header').removeClass('header--fixed');

    });
    $('.form-item__input').on('focusin', function () {
        $(this).parent().addClass('form-item--active');
    }).on('focusout', function () {
        $(this).parent().removeClass('form-item--active');
    });
    // reviews slider
    $('.reviews-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 3,
        dots: true,
        arrows: false,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            },
        }, {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        }],
    });
    // psycho page slider
    if ($(document.body).width() > 1024) {
        $('.psycho-slider').slick({
            autoplay: true,
            delay: 3000,
            dots: false,
            slidesToShow: 1,
            arrows: true,
            prevArrow: $('.psycho-slider-controls__prev'),
            nextArrow: $('.psycho-slider-controls__next'),
        });
    }
});