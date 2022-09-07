$(document).ready(function () {
  var headerMobileButton = $(".header__mobile__button");
  var headerMobileOverlay = $(".header__mobile__overlay");
  var headerMobileList = $(".header__mobile__list");
  var headerNavbarSpan = $(".header__navbar__span");
  var headerNavbarSpanList = $(".header__navbar__span__list");
  var headerMobileSpan = $(".header__mobile__span");
  var headerMobileSpanList = $(".header__mobile__span__list");
  var y = true;
  var x = true;

  headerNavbarSpan.on("click", function () {
    if (x) {
      $(this).html(
        `Liên Kết<i class="fas fa-chevron-up header__navbar__span__icon"></i>`
      );
      headerNavbarSpanList.fadeIn();
      x = false;
      return;
    }
    if (!x) {
      $(this).html(
        `Liên Kết<i class="fas fa-chevron-down header__navbar__span__icon"></i>`
      );
      headerNavbarSpanList.fadeOut();
      x = true;
      return;
    }
  });

  headerMobileSpan.on("click", function () {
    if (y) {
      $(this).html(
        `Liên Kết<i class="fas fa-chevron-up header__mobile__span__icon"></i>`
      );
      headerMobileSpanList.slideDown();
      y = false;
      return;
    }
    if (!y) {
      $(this).html(
        `Liên Kết<i class="fas fa-chevron-down header__mobile__span__icon"></i>`
      );
      headerMobileSpanList.slideUp();
      y = true;
      return;
    }
  });

  headerMobileButton.on("click", function () {
    headerMobileOverlay.fadeIn();
    headerMobileList.fadeIn();
  });

  headerMobileOverlay.on("click", function () {
    $(this).fadeOut();
    headerMobileList.fadeOut();
  });

  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 20,
    nav: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 2,
      },
    },
  });
});
