(function ($)
  { "use strict"
  
/* 1. Preloder (готовый код, можно использовать в любом проекте) */
    $(window).on('load', function () {
      $('#preloader-active').delay(450).fadeOut('slow');
      $('body').delay(450).css({
        'overflow': 'visible'
      });
    });

/* 2. Sticky And Scroll UP */
    $(window).on('scroll', function () {
      var scroll = $(window).scrollTop();
      if (scroll < 400) {
        $(".header-sticky").removeClass("sticky-bar");
        $('#back-top').fadeOut(500);
      } else {
        $(".header-sticky").addClass("sticky-bar");
        $('#back-top').fadeIn(500);
      }
    });

  // Scroll Up
    $('#back-top a').on("click", function () {
      $('body,html').animate({
        scrollTop: 0
      }, 800);
      return false;
    });
  


})(jQuery);


//Slider
const mySwiper = new Swiper ('.swiper-container',{
  direction : 'horizontal',
  loop:true,
  stopOnLastSlide:false,
  autoplay:{
    delay:3000
  }
})

//Burger
$('#mobile-btn').on('click',function(){
  $('.main-menu').toggle();
})
$('#hide-menu').on('click',function(){
  $('.submenu').toggle();
})


// Modal Window

$('#btn-open').on('click', function (){
  $('.modals-wrapper').fadeIn();
});
$('.modal-window').on('click', function (){
  $('.modals-wrapper').fadeOut();
});
$('.overlay').on('click', function (){
  $('.modals-wrapper').fadeOut();
});
$('.form-book').on('click', function (e){
  e.stopPropagation();
});

//PARALAX

const scene = $('#scene').get(0);
const parallaxInstance = new Parallax(scene);

//TABS

$('.nav-item').on('click', function (){
  let currTab = $(this).index();

    $('.nav-item').removeClass('active');
    $(this).addClass('active');

    $('.tab-pane').removeClass('show active');
    $('.tab-pane').eq(currTab).addClass('show active');
});

//Validate
$.validator.addMethod("regex", function (value, element, regexp) {
  let regExsp = new RegExp(regexp);
  return regExsp.test(value);
}, "Please check your input."
);



$(document).ready(function () {
$('[data-submit]').on('click', function (e) {
  e.preventDefault();
  $(this).parent('form').submit();
})
$.validator.addMethod("regex", function (value, element, regexp) {
  let regExsp = new RegExp(regexp);
  return this.optional(element) || regExsp.test(value);
}, "Please check your input");



function valEl(el) {
  el.validate({
      rules: {
          phoneNumber: {
              required: true,
              digits: true,
              minlength: 10,
              maxlength: 11,
              regex: '[0-9]+'
          },
          firstName: {
              required: true,
              regex: '[A-Za-z]',
              minlength: 2,
              maxlength: 30
          },
          email: {
              required: true,
              email: true
          }
      },
      messages: {
        phoneNumber: {
              required: 'Поле обязательно для заполнения',
              regex: 'Телефон может содержать символы + - ()'
          },
          firstName: {
              required: 'Поле обязательно для заполнения',
              regex: 'Имя должно содержать заглавную букву'
          },
          email: {
              required: 'Поле обязательно для заполнения',
              email: 'Неверный формат E-mail'
          }
      },
      submitHandler: function (form) {
          $('#preloader-active').fadeIn();
          let $form = $(form);
          let $formId = $(form).attr('id');
          switch ($formId) {
              case 'form-cover':
                  $.ajax({
                      type: 'POST',
                      url: $form.attr('action'),
                      data: $form.serialize()
                  })
                      .always(function () {
                          console.log('Always');
                          setTimeout(function () {
                              $form.trigger('reset');
                              $('#preloader-active').fadeIn();
                          }, 1100);
                          setTimeout(function () {
                              $form.trigger('reset');
                              $('#preloader-active').fadeOut();
                          }, 1300);
                      });
                  break;
              case 'form-modal' :
                  $.ajax({
                      type: 'POST',
                      url: $form.attr('action'),
                      data: $form.serialize()
                  })
                      .done(function () {
                          console.log('Fail');
                      })
                      .always(function () {
                          console.log('Always');
                          setTimeout(function () {
                              $form.trigger('reset');
                              $('#preloader-active').fadeIn();
                          }, 1100);
                          setTimeout(function () {
                              $('#preloader-active').fadeOut();
                              $('#wrapper-modal').fadeOut();
                          }, 1300);
                      });
                  break;
          }
          return false;
      }
  });
}

$('.js-form').each(function () {
  valEl($(this));
});
});