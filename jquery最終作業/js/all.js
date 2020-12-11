$(document).ready(function(){
    $('.scroll_btn').click(function(){
        $('html,body').animate({
            scrollTop: 0,
        }, 300);
    });
    $('body').click(function(e){
        // console.log($(e.target).parent().parent('.nav')[0].className==="nav");
        
        if(e.target.nodeName==="A" && $(e.target).parent().parent('.nav')[0].className){
            e.preventDefault();
            $(e.target).parent().siblings().find('li').slideUp(100);
            $(e.target).siblings('ul').find('li').slideToggle(100);
        }
        else{
            $('.nav>li>ul>li').slideUp(100);
        }
    });
    
});

var mySwiper = new Swiper('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    effect: 'cube',
    grabCursor: true,
    // If we need pagination
    pagination: {
        // lazy: true,
        el: '.swiper-pagination',
        clickable: true,
        clickableClass: 'swiper-pagination-clickable',
        dynamicBullets: true,
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
    el: '.swiper-scrollbar',
    
    },
    keyboard: {
        enabled: true,
        onlyInViewport: false,
    },
    mousewheel: {
        invert: false,
    },
    autoplay: {
        delay: 5000,
    },
    cubeEffect: {
        slideShadows: false,
    },
    cubeEffect: {
        shadow: true,
        slideShadows: true,
        shadow: false,
    },
})

lightbox.option({
    'albumLabel': '',
    'resizeDuration': 100,
    'wrapAround': true,
    'positionFromTop': 450,
    'disableScrolling': true,
});